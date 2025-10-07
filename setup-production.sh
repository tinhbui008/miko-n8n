#!/bin/bash

# Script tạo file .env.production cho deployment
# Chạy: bash setup-production.sh

echo "=========================================="
echo "  Setup Production Environment Variables"
echo "=========================================="
echo ""

# Tạo file .env.production
cat > .env.production << 'EOF'
# Production Environment Variables
# QUAN TRỌNG: Thay đổi TẤT CẢ các giá trị bí mật!

# MongoDB Configuration
MONGO_USERNAME=admin
MONGO_PASSWORD=CHANGE_THIS_STRONG_PASSWORD
MONGO_DATABASE=miko-n8n
MONGODB_URI=mongodb://admin:CHANGE_THIS_STRONG_PASSWORD@mongodb:27017/miko-n8n?authSource=admin

# JWT Configuration
JWT_SECRET=CHANGE_THIS_TO_RANDOM_64_CHARS
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_EXPIRES=30d

# NextAuth Configuration
NEXTAUTH_SECRET=CHANGE_THIS_TO_RANDOM_32_CHARS
NEXTAUTH_URL=http://localhost:8888

# Email Configuration (SMTP)
SMTP_HOST=mail92115.maychuemail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mikon8n@mikotech.vn
SMTP_PASSWORD=L36239rJLe
SMTP_FROM_NAME=Miko N8N
SMTP_FROM_EMAIL=mikon8n@mikotech.vn

# Node Environment
NODE_ENV=production
EOF

echo "✅ File .env.production đã được tạo!"
echo ""

# Generate JWT_SECRET
echo "🔑 Đang tạo JWT_SECRET..."
if command -v node &> /dev/null; then
    JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
    sed -i "s|JWT_SECRET=CHANGE_THIS_TO_RANDOM_64_CHARS|JWT_SECRET=$JWT_SECRET|g" .env.production
    echo "   JWT_SECRET: $JWT_SECRET"
else
    JWT_SECRET=$(openssl rand -hex 64)
    sed -i "s|JWT_SECRET=CHANGE_THIS_TO_RANDOM_64_CHARS|JWT_SECRET=$JWT_SECRET|g" .env.production
    echo "   JWT_SECRET: $JWT_SECRET"
fi

# Generate NEXTAUTH_SECRET
echo "🔑 Đang tạo NEXTAUTH_SECRET..."
NEXTAUTH_SECRET=$(openssl rand -base64 32)
sed -i "s|NEXTAUTH_SECRET=CHANGE_THIS_TO_RANDOM_32_CHARS|NEXTAUTH_SECRET=$NEXTAUTH_SECRET|g" .env.production
echo "   NEXTAUTH_SECRET: $NEXTAUTH_SECRET"

# Generate MongoDB Password
echo "🔑 Đang tạo MONGO_PASSWORD..."
MONGO_PASSWORD=$(openssl rand -base64 24 | tr -d "=+/" | cut -c1-24)
sed -i "s|MONGO_PASSWORD=CHANGE_THIS_STRONG_PASSWORD|MONGO_PASSWORD=$MONGO_PASSWORD|g" .env.production
sed -i "s|mongodb://admin:CHANGE_THIS_STRONG_PASSWORD@|mongodb://admin:$MONGO_PASSWORD@|g" .env.production
echo "   MONGO_PASSWORD: $MONGO_PASSWORD"

echo ""
echo "=========================================="
echo "✨ Setup hoàn tất!"
echo "=========================================="
echo ""
echo "⚠️  CÒN CẦN CHỈNH SỬA:"
echo "   1. NEXTAUTH_URL=http://localhost:8888"
echo "      → Đổi thành domain thực: https://your-domain.com"
echo ""
echo "📝 Để chỉnh sửa:"
echo "   nano .env.production"
echo ""
echo "🚀 Để deploy:"
echo "   docker-compose up -d --build"
echo ""
