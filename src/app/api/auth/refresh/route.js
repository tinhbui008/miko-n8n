import { NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/tokenService';
import { refreshRateLimiter } from '@/middleware/rateLimit';

export async function POST(request) {
  try {
    // Apply rate limiting
    const rateLimitResult = await refreshRateLimiter(request);
    if (rateLimitResult) {
      return rateLimitResult; // Return rate limit error response
    }

    // Try to get refresh token from cookies first (recommended)
    let refreshToken = request.cookies.get('refreshToken')?.value;

    // Fallback to request body (for backward compatibility)
    if (!refreshToken) {
      try {
        const body = await request.json();
        refreshToken = body.refreshToken;
      } catch (e) {
        // Body is empty or invalid
      }
    }

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

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Token refreshed successfully',
      expiresIn
    }, { status: 200 });

    // Set new access token in HttpOnly cookie (consistent with login flow)
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Token refresh error:', error);

    // Handle specific error messages
    if (error.message.includes('expired')) {
      // Clear cookies on expired token
      const response = NextResponse.json(
        {
          success: false,
          message: 'Refresh token expired. Please login again.'
        },
        { status: 401 }
      );

      response.cookies.set('accessToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
      });

      response.cookies.set('refreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
      });

      return response;
    }

    if (error.message.includes('Invalid') || error.message.includes('revoked')) {
      // Clear cookies on invalid token
      const response = NextResponse.json(
        {
          success: false,
          message: 'Invalid or revoked refresh token. Please login again.'
        },
        { status: 401 }
      );

      response.cookies.set('accessToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
      });

      response.cookies.set('refreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
      });

      return response;
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
