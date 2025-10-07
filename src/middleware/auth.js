import { NextResponse } from 'next/server';
import { extractTokenFromHeader } from '@/lib/auth';
import { verifyAccessToken, validateToken } from '@/lib/tokenService';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// Auth middleware để bảo vệ API routes
export async function authMiddleware(request) {
  try {
    // Try to get token from cookies first (recommended)
    let token = request.cookies.get('accessToken')?.value;

    // Fallback to Authorization header (for backward compatibility or external API calls)
    if (!token) {
      const authHeader = request.headers.get('authorization');
      token = extractTokenFromHeader(authHeader);
    }

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Access token is required'
        },
        { status: 401 }
      );
    }

    // Verify access token JWT signature
    const decoded = verifyAccessToken(token);

    // Connect to database
    await connectDB();

    // Check if token exists in database and is not revoked
    const { valid, token: tokenDoc } = await validateToken(token);

    if (!valid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token has been revoked or is invalid'
        },
        { status: 401 }
      );
    }

    // Find user by ID from token
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found'
        },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: 'Account is deactivated'
        },
        { status: 401 }
      );
    }

    // Add user info to request
    request.user = user;
    request.tokenDoc = tokenDoc; // Also add token document for reference

    return null;

  } catch (error) {
    if (error.message === 'Access token expired') {
      return NextResponse.json(
        {
          success: false,
          message: 'Token expired'
        },
        { status: 401 }
      );
    }

    if (error.message === 'Invalid access token') {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid token'
        },
        { status: 401 }
      );
    }

    console.error('Auth middleware error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Authentication failed'
      },
      { status: 401 }
    );
  }
}

// Role-based middleware
export function requireRole(allowedRoles = []) {
  return async function roleMiddleware(request) {
    // First run auth middleware
    const authResult = await authMiddleware(request);
    if (authResult) {
      return authResult; // Return error response from auth middleware
    }

    // Check if user has required role
    const userRole = request.user.role;
    if (!allowedRoles.includes(userRole)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Insufficient permissions'
        },
        { status: 403 }
      );
    }

    return null; // Success
  };
}

// Admin only middleware
export const requireAdmin = requireRole(['admin']);

// User or Admin middleware
export const requireUserOrAdmin = requireRole(['user', 'admin']);