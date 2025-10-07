import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateTokenPair, extractDeviceInfo } from '@/lib/tokenService';
import { loginRateLimiter } from '@/middleware/rateLimit';

export async function POST(request) {
  try {
    // Apply rate limiting
    const rateLimitResult = await loginRateLimiter(request);
    if (rateLimitResult) {
      return rateLimitResult; // Return rate limit error response
    }

    // Connect to database
    await connectDB();

    // Parse request body
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Vui lòng nhập email và mật khẩu'
        },
        { status: 400 }
      );
    }

    // Find user by email and include password
    const user = await User.findByEmailWithPassword(email);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email hoặc mật khẩu không đúng'
        },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: 'Tài khoản đã bị vô hiệu hóa'
        },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email hoặc mật khẩu không đúng'
        },
        { status: 401 }
      );
    }

    // Extract device info
    const deviceInfo = extractDeviceInfo(request);

    // Generate access token and refresh token
    const { accessToken, refreshToken, expiresIn } = await generateTokenPair(user, deviceInfo);

    // Update last login
    await user.updateLastLogin();

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Đăng nhập thành công',
      user: user.toJWT()
    }, { status: 200 });

    // Set HttpOnly cookies for tokens
    // Access Token (7 days)
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only HTTPS in production
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/'
    });

    // Refresh Token (30 days)
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Có lỗi xảy ra trong quá trình đăng nhập'
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