import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request) {
  try {
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

    // Generate JWT token
    const token = generateToken(user.toJWT());

    // Update last login
    await user.updateLastLogin();

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Đăng nhập thành công',
      token,
      user: user.toJWT()
    }, { status: 200 });

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