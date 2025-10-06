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

    // Get refresh token from cookies or request body
    let refreshToken = request.cookies.get('refreshToken')?.value;

    // Parse request body
    let allDevices = false;
    try {
      const body = await request.json();
      refreshToken = refreshToken || body.refreshToken;
      allDevices = body.allDevices || false;
    } catch (e) {
      // Body is empty or invalid, continue with cookie values
    }

    if (allDevices) {
      // Logout from all devices
      await revokeAllUserTokens(request.user._id, 'User logged out from all devices');
    } else {
      // Logout from current device only
      if (refreshToken) {
        await revokeToken(refreshToken, 'User logout');
      }
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: allDevices ? 'Logged out from all devices successfully' : 'Logged out successfully'
    }, { status: 200 });

    // Clear cookies
    response.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/'
    });

    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/'
    });

    return response;

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
