import { NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/tokenService';

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { refreshToken } = body;

    // Validation
    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'Refresh token is required'
        },
        { status: 400 }
      );
    }

    // Refresh access token
    const { accessToken, expiresIn } = await refreshAccessToken(refreshToken);

    // Return new access token
    return NextResponse.json({
      success: true,
      message: 'Token refreshed successfully',
      accessToken,
      expiresIn
    }, { status: 200 });

  } catch (error) {
    console.error('Token refresh error:', error);

    // Handle specific error messages
    if (error.message.includes('expired')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Refresh token expired. Please login again.'
        },
        { status: 401 }
      );
    }

    if (error.message.includes('Invalid') || error.message.includes('revoked')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid or revoked refresh token. Please login again.'
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to refresh token'
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
