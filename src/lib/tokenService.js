import jwt from 'jsonwebtoken';
import Token from '@/models/Token';
import connectDB from '@/lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRES = process.env.JWT_EXPIRES_IN || '7d';
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || '30d';

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

/**
 * Parse expiry string (e.g., '7d', '24h') to milliseconds
 */
function parseExpiry(expiryString) {
  const regex = /^(\d+)([dhms])$/;
  const match = expiryString.match(regex);

  if (!match) {
    throw new Error(`Invalid expiry format: ${expiryString}`);
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000
  };

  return value * multipliers[unit];
}

/**
 * Generate access token (JWT)
 */
export function generateAccessToken(payload) {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES,
      issuer: 'miko-n8n',
      audience: 'miko-n8n-users'
    });
  } catch (error) {
    throw new Error('Access token generation failed');
  }
}

/**
 * Generate refresh token (JWT)
 */
export function generateRefreshToken(payload) {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES,
      issuer: 'miko-n8n',
      audience: 'miko-n8n-refresh'
    });
  } catch (error) {
    throw new Error('Refresh token generation failed');
  }
}

/**
 * Verify access token
 */
export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'miko-n8n',
      audience: 'miko-n8n-users'
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Access token expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid access token');
    } else {
      throw new Error('Access token verification failed');
    }
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'miko-n8n',
      audience: 'miko-n8n-refresh'
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Refresh token expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid refresh token');
    } else {
      throw new Error('Refresh token verification failed');
    }
  }
}

/**
 * Generate both access and refresh tokens
 */
export async function generateTokenPair(user, deviceInfo = {}) {
  try {
    await connectDB();

    const payload = user.toJWT ? user.toJWT() : user;

    // Generate tokens
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Calculate expiry dates
    const refreshExpiresAt = new Date(Date.now() + parseExpiry(REFRESH_TOKEN_EXPIRES));

    // Store refresh token in database
    await Token.createToken(
      payload.id,
      refreshToken,
      'refresh',
      refreshExpiresAt,
      deviceInfo
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: ACCESS_TOKEN_EXPIRES
    };
  } catch (error) {
    console.error('Token pair generation failed:', error);
    throw error;
  }
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(refreshToken) {
  try {
    await connectDB();

    // Verify refresh token JWT
    const decoded = verifyRefreshToken(refreshToken);

    // Check if token exists in database and is valid
    const tokenDoc = await Token.findValidToken(refreshToken);

    if (!tokenDoc) {
      throw new Error('Invalid or revoked refresh token');
    }

    // Get user from token
    const user = tokenDoc.userId;

    if (!user) {
      throw new Error('User not found');
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user.toJWT());

    return {
      accessToken: newAccessToken,
      expiresIn: ACCESS_TOKEN_EXPIRES
    };
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
}

/**
 * Revoke a specific token
 */
export async function revokeToken(token, reason = 'User logout') {
  try {
    await connectDB();
    return await Token.revokeToken(token, reason);
  } catch (error) {
    console.error('Token revocation failed:', error);
    throw error;
  }
}

/**
 * Revoke all tokens for a user
 */
export async function revokeAllUserTokens(userId, reason = 'Logout from all devices') {
  try {
    await connectDB();
    return await Token.revokeAllUserTokens(userId, reason);
  } catch (error) {
    console.error('User tokens revocation failed:', error);
    throw error;
  }
}

/**
 * Validate token (check if not revoked)
 */
export async function validateToken(token) {
  try {
    await connectDB();

    const tokenDoc = await Token.findValidToken(token);

    return {
      valid: !!tokenDoc,
      token: tokenDoc
    };
  } catch (error) {
    console.error('Token validation failed:', error);
    return {
      valid: false,
      token: null
    };
  }
}

/**
 * Get all active tokens for a user
 */
export async function getUserTokens(userId) {
  try {
    await connectDB();

    return await Token.find({
      userId,
      isRevoked: false,
      expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 });
  } catch (error) {
    console.error('Get user tokens failed:', error);
    throw error;
  }
}

/**
 * Clean up expired and old revoked tokens
 */
export async function cleanupTokens() {
  try {
    await connectDB();
    return await Token.cleanupExpiredTokens();
  } catch (error) {
    console.error('Token cleanup failed:', error);
    throw error;
  }
}

/**
 * Extract device info from request
 */
export function extractDeviceInfo(request) {
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const ip = request.headers.get('x-forwarded-for') ||
             request.headers.get('x-real-ip') ||
             'Unknown';

  // Simple device detection
  let device = 'Desktop';
  if (/mobile/i.test(userAgent)) {
    device = 'Mobile';
  } else if (/tablet/i.test(userAgent)) {
    device = 'Tablet';
  }

  return {
    userAgent,
    ip,
    device
  };
}
