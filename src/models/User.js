import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập tên'],
    trim: true,
    maxlength: [50, 'Tên không được quá 50 ký tự']
  },
  email: {
    type: String,
    required: [true, 'Vui lòng nhập email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Vui lòng nhập email hợp lệ'
    ]
  },
  phoneNumbers: {
    type: [String],
    default: []
  },
  password: {
    type: String,
    required: [true, 'Vui lòng nhập mật khẩu'],
    minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: null
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    default: null
  },
  passwordResetToken: {
    type: String,
    default: null
  },
  passwordResetExpires: {
    type: Date,
    default: null
  },
  lastLoginAt: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Middleware để hash password trước khi save
UserSchema.pre('save', async function (next) {
  // Chỉ hash password nếu password được thay đổi
  if (!this.isModified('password')) return next();

  try {
    // Hash password với cost factor 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method để so sánh password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // So sánh password với hash trong database
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Method để tạo JWT payload
UserSchema.methods.toJWT = function () {
  return {
    id: this._id.toString(), // Convert ObjectId to string
    name: this.name,
    email: this.email,
    role: this.role,
    avatar: this.avatar,
    isEmailVerified: this.isEmailVerified
  };
};

// Method để cập nhật last login
UserSchema.methods.updateLastLogin = function () {
  this.lastLoginAt = new Date();
  return this.save({ validateBeforeSave: false });
};

// Static method để tìm user theo email
UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method để tìm user theo email và include password
UserSchema.statics.findByEmailWithPassword = function (email) {
  return this.findOne({ email: email.toLowerCase() }).select('+password');
};

// Index cho performance
UserSchema.index({ email: 1 });
UserSchema.index({ createdAt: -1 });

// Prevent re-compilation in development
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;