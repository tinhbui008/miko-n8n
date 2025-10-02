import { NextResponse } from 'next/server';
import { extractTokenFromHeader } from '@/lib/auth';
import { verifyAccessToken } from '@/lib/tokenService';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// Auth middleware để bảo vệ API routes
export async function authMiddleware(request) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Access token is required'
        },
        { status: 401 }
      );
    }

    // Verify access token
    const decoded = verifyAccessToken(token);

    // Connect to database
    await connectDB();

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

    return null; // Success, continue to next middleware/handler

  } catch (error) {
    console.error('Auth middleware error:', error);

    if (error.message === 'Token expired') {
      return NextResponse.json(
        {
          success: false,
          message: 'Token expired'
        },
        { status: 401 }
      );
    }

    if (error.message === 'Invalid token') {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid token'
        },
        { status: 401 }
      );
    }

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