import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  token: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  type: {
    type: String,
    enum: ['refresh', 'access'],
    default: 'refresh',
    required: true
  },
  isRevoked: {
    type: Boolean,
    default: false,
    index: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000 // Auto-delete after 30 days
  },
  deviceInfo: {
    userAgent: String,
    ip: String,
    device: String
  },
  revokedAt: {
    type: Date
  },
  revokedReason: {
    type: String
  }
}, {
  timestamps: true
});

// Index for cleaning up expired tokens
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Static method to create token
tokenSchema.statics.createToken = async function(userId, token, type, expiresAt, deviceInfo = {}) {
  return await this.create({
    userId,
    token,
    type,
    expiresAt,
    deviceInfo
  });
};

// Static method to find valid token
tokenSchema.statics.findValidToken = async function(token) {
  return await this.findOne({
    token,
    isRevoked: false,
    expiresAt: { $gt: new Date() }
  }).populate('userId');
};

// Static method to revoke token
tokenSchema.statics.revokeToken = async function(token, reason = 'User logout') {
  return await this.findOneAndUpdate(
    { token },
    {
      isRevoked: true,
      revokedAt: new Date(),
      revokedReason: reason
    },
    { new: true }
  );
};

// Static method to revoke all user tokens
tokenSchema.statics.revokeAllUserTokens = async function(userId, reason = 'Revoke all sessions') {
  return await this.updateMany(
    { userId, isRevoked: false },
    {
      isRevoked: true,
      revokedAt: new Date(),
      revokedReason: reason
    }
  );
};

// Static method to clean up expired tokens
tokenSchema.statics.cleanupExpiredTokens = async function() {
  return await this.deleteMany({
    $or: [
      { expiresAt: { $lt: new Date() } },
      { isRevoked: true, revokedAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } // Revoked > 7 days ago
    ]
  });
};

// Instance method to check if token is valid
tokenSchema.methods.isValid = function() {
  return !this.isRevoked && this.expiresAt > new Date();
};

// Instance method to revoke this token
tokenSchema.methods.revoke = async function(reason = 'Token revoked') {
  this.isRevoked = true;
  this.revokedAt = new Date();
  this.revokedReason = reason;
  return await this.save();
};

export default mongoose.models.Token || mongoose.model('Token', tokenSchema);
