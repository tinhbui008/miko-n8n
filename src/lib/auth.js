import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

// Tạo JWT token
export function generateToken(payload) {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'miko-n8n',
      audience: 'miko-n8n-users'
    });
  } catch (error) {
    throw new Error('Token generation failed');
  }
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'miko-n8n',
      audience: 'miko-n8n-users'
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else {
      throw new Error('Token verification failed');
    }
  }
}

// Decode token without verification (for debugging)
export function decodeToken(token) {
  try {
    return jwt.decode(token);
  } catch (error) {
    throw new Error('Token decode failed');
  }
}

// Extract token from Authorization header
export function extractTokenFromHeader(authHeader) {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}

// Generate refresh token (longer expiry)
export function generateRefreshToken(payload) {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: '30d', // Refresh token có thời hạn 30 ngày
      issuer: 'miko-n8n',
      audience: 'miko-n8n-refresh'
    });
  } catch (error) {
    throw new Error('Refresh token generation failed');
  }
}

// Verify refresh token
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