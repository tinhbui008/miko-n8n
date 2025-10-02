import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateTokenPair, extractDeviceInfo } from '@/lib/tokenService';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request) {
  try {
    // Connect to database
    await connectDB();

    // Parse request body
    const body = await request.json();
    const { name, email, phoneNumbers, password, confirmPassword } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Vui lòng điền đầy đủ thông tin'
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: 'Mật khẩu xác nhận không khớp'
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: 'Mật khẩu phải có ít nhất 6 ký tự'
        },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email đã được sử dụng'
        },
        { status: 409 }
      );
    }

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phoneNumbers,
      password
    });

    await user.save();

    // Extract device info
    const deviceInfo = extractDeviceInfo(request);

    // Generate access token and refresh token
    const { accessToken, refreshToken, expiresIn } = await generateTokenPair(user, deviceInfo);

    // Update last login
    await user.updateLastLogin();

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Đăng ký thành công',
      accessToken,
      refreshToken,
      expiresIn,
      user: user.toJWT()
    }, { status: 201 });

  } catch (error) {
    console.error('Register error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        {
          success: false,
          message: messages[0] || 'Dữ liệu không hợp lệ'
        },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email đã được sử dụng'
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Có lỗi xảy ra trong quá trình đăng ký'
      },
      { status: 500 }
    );
  }
}

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