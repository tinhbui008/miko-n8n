import { NextResponse } from 'next/server';
import { revokeToken, revokeAllUserTokens } from '@/lib/tokenService';
import { authMiddleware } from '@/middleware/auth';

export async function POST(request) {
  try {
    // Authenticate user
    const authResult = await authMiddleware(request);
    if (authResult) {
      return authResult; // Return error response from middleware
    }

    // Parse request body
    const body = await request.json();
    const { refreshToken, allDevices } = body;

    if (allDevices) {
      // Logout from all devices
      await revokeAllUserTokens(request.user._id, 'User logged out from all devices');

      return NextResponse.json({
        success: true,
        message: 'Logged out from all devices successfully'
      }, { status: 200 });
    } else {
      // Logout from current device only
      if (!refreshToken) {
        return NextResponse.json(
          {
            success: false,
            message: 'Refresh token is required'
          },
          { status: 400 }
        );
      }

      await revokeToken(refreshToken, 'User logout');

      return NextResponse.json({
        success: true,
        message: 'Logged out successfully'
      }, { status: 200 });
    }

  } catch (error) {
    console.error('Logout error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to logout'
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
