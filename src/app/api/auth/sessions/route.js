import { NextResponse } from 'next/server';
import { getUserTokens, revokeToken } from '@/lib/tokenService';
import { authMiddleware } from '@/middleware/auth';

// Get all active sessions for current user
export async function GET(request) {
  try {
    // Authenticate user
    const authResult = await authMiddleware(request);
    if (authResult) {
      return authResult; // Return error response from middleware
    }

    // Get user's active tokens
    const tokens = await getUserTokens(request.user._id);

    // Format response with useful info
    const sessions = tokens.map(token => ({
      id: token._id,
      device: token.deviceInfo?.device || 'Unknown',
      userAgent: token.deviceInfo?.userAgent || 'Unknown',
      ip: token.deviceInfo?.ip || 'Unknown',
      createdAt: token.createdAt,
      expiresAt: token.expiresAt,
      isCurrentSession: false // We could add logic to detect current session
    }));

    return NextResponse.json({
      success: true,
      sessions,
      total: sessions.length
    }, { status: 200 });

  } catch (error) {
    console.error('Get sessions error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get sessions'
      },
      { status: 500 }
    );
  }
}

// Revoke a specific session333
export async function DELETE(request) {
  try {
    // Authenticate user
    const authResult = await authMiddleware(request);
    if (authResult) {
      return authResult; // Return error response from middleware
    }

    // Parse request body
    const body = await request.json();
    const { sessionId, refreshToken } = body;

    if (!sessionId && !refreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'Session ID or refresh token is required'
        },
        { status: 400 }
      );
    }

    // If sessionId provided, find token by ID and revoke
    if (sessionId) {
      const tokens = await getUserTokens(request.user._id);
      const tokenToRevoke = tokens.find(t => t._id.toString() === sessionId);

      if (!tokenToRevoke) {
        return NextResponse.json(
          {
            success: false,
            message: 'Session not found'
          },
          { status: 404 }
        );
      }

      await revokeToken(tokenToRevoke.token, 'User revoked session');
    } else if (refreshToken) {
      // Revoke by refresh token directly
      await revokeToken(refreshToken, 'User revoked session');
    }

    return NextResponse.json({
      success: true,
      message: 'Session revoked successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Revoke session error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to revoke session'
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function POST() {
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
