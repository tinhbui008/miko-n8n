import { NextResponse } from 'next/server';

/**
 * In-memory rate limiter store
 * Format: { [key]: { count: number, resetTime: timestamp } }
 */
const rateLimitStore = new Map();

/**
 * Clean up expired entries periodically
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Clean up every minute

/**
 * Get client identifier from request
 */
function getClientIdentifier(request) {
  // Try multiple sources for client IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback to a default value (not ideal for production)
  return 'unknown';
}

/**
 * Rate limiter middleware factory
 * @param {Object} options - Rate limit options
 * @param {number} options.maxRequests - Maximum number of requests allowed
 * @param {number} options.windowMs - Time window in milliseconds
 * @param {string} options.message - Custom error message
 * @param {string} options.keyPrefix - Prefix for the rate limit key (to separate different endpoints)
 * @returns {Function} Middleware function
 */
export function createRateLimiter(options = {}) {
  const {
    maxRequests = 5,
    windowMs = 60000, // 1 minute default
    message = 'Too many requests, please try again later',
    keyPrefix = 'rl'
  } = options;

  return async function rateLimitMiddleware(request) {
    try {
      // Get client identifier
      const clientId = getClientIdentifier(request);
      const key = `${keyPrefix}:${clientId}`;

      const now = Date.now();
      const record = rateLimitStore.get(key);

      // If no record or expired, create new record
      if (!record || record.resetTime < now) {
        rateLimitStore.set(key, {
          count: 1,
          resetTime: now + windowMs
        });
        return null; // Allow request
      }

      // If within limit, increment counter
      if (record.count < maxRequests) {
        record.count++;
        return null; // Allow request
      }

      // Rate limit exceeded
      const retryAfter = Math.ceil((record.resetTime - now) / 1000); // seconds

      return NextResponse.json(
        {
          success: false,
          message,
          retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(record.resetTime).toISOString()
          }
        }
      );

    } catch (error) {
      console.error('Rate limit middleware error:', error);
      // On error, allow the request to proceed
      return null;
    }
  };
}

/**
 * Predefined rate limiters for common use cases
 */

// Strict rate limiter for authentication endpoints (5 requests per 5 minutes)
export const authRateLimiter = createRateLimiter({
  maxRequests: 5,
  windowMs: 5 * 60 * 1000, // 5 minutes
  message: 'Too many authentication attempts, please try again in 5 minutes',
  keyPrefix: 'auth'
});

// Login rate limiter (5 requests per 15 minutes)
export const loginRateLimiter = createRateLimiter({
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many login attempts, please try again in 15 minutes',
  keyPrefix: 'login'
});

// Refresh token rate limiter (10 requests per 1 minute)
export const refreshRateLimiter = createRateLimiter({
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute
  message: 'Too many token refresh attempts, please try again later',
  keyPrefix: 'refresh'
});

// Register rate limiter (3 requests per 10 minutes)
export const registerRateLimiter = createRateLimiter({
  maxRequests: 3,
  windowMs: 10 * 60 * 1000, // 10 minutes
  message: 'Too many registration attempts, please try again in 10 minutes',
  keyPrefix: 'register'
});

// General API rate limiter (100 requests per minute)
export const apiRateLimiter = createRateLimiter({
  maxRequests: 100,
  windowMs: 60 * 1000, // 1 minute
  message: 'Too many API requests, please slow down',
  keyPrefix: 'api'
});

/**
 * Helper function to get rate limit info for a client
 * @param {string} keyPrefix - Rate limit key prefix
 * @param {Request} request - The request object
 * @returns {Object} Rate limit info
 */
export function getRateLimitInfo(keyPrefix, request) {
  const clientId = getClientIdentifier(request);
  const key = `${keyPrefix}:${clientId}`;
  const record = rateLimitStore.get(key);

  if (!record || record.resetTime < Date.now()) {
    return {
      count: 0,
      resetTime: null,
      remaining: null
    };
  }

  return {
    count: record.count,
    resetTime: record.resetTime,
    remaining: record.resetTime - Date.now()
  };
}

/**
 * Clear rate limit for a specific client
 * @param {string} keyPrefix - Rate limit key prefix
 * @param {string} clientId - Client identifier
 */
export function clearRateLimit(keyPrefix, clientId) {
  const key = `${keyPrefix}:${clientId}`;
  rateLimitStore.delete(key);
}

/**
 * Clear all rate limits
 */
export function clearAllRateLimits() {
  rateLimitStore.clear();
}
