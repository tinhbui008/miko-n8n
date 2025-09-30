import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/auth';

// Get current user info
export async function GET(request) {
  // Run auth middleware
  const authResult = await authMiddleware(request);
  if (authResult) {
    return authResult; // Return error response from middleware
  }

  try {
    // Return user info (user was added to request by middleware)
    return NextResponse.json({
      success: true,
      user: request.user.toJWT()
    });

  } catch (error) {
    console.error('Get user info error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get user information'
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

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}