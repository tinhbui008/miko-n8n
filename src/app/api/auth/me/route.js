import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/auth';

export async function GET(request) {
  const authResult = await authMiddleware(request);
  if (authResult) {
    return authResult;
  }

  try {
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