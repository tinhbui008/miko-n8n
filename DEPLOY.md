# Hướng Dẫn Deploy Production

## 📋 Checklist Trước Khi Deploy

### 1. Cấu Hình Biến Môi Trường

Chỉnh sửa file `.env.production` với các giá trị thực:

```bash
# MongoDB - Thay đổi password mạnh
MONGO_USERNAME=admin
MONGO_PASSWORD=<password-mongodb-mạnh-của-bạn>
MONGO_DATABASE=miko-n8n
MONGODB_URI=mongodb://admin:<password>@mongodb:27017/miko-n8n?authSource=admin

# JWT - Tạo secret key mới (ít nhất 64 ký tự ngẫu nhiên)
JWT_SECRET=<tạo-chuỗi-ngẫu-nhiên-dài-64-ký-tự>

# NextAuth - Tạo secret key mới (ít nhất 32 ký tự)
NEXTAUTH_SECRET=<tạo-chuỗi-ngẫu-nhiên-32-ký-tự>
NEXTAUTH_URL=https://your-domain.com

# Email - Giữ nguyên hoặc thay đổi
SMTP_HOST=mail92115.maychuemail.com
SMTP_USER=mikon8n@mikotech.vn
SMTP_PASSWORD=<your-smtp-password>
```

### 2. Tạo Secret Keys An Toàn

**Cách tạo JWT_SECRET (64 ký tự):**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Cách tạo NEXTAUTH_SECRET (32 ký tự):**
```bash
openssl rand -base64 32
```

### 3. Cấu Hình Domain

Trong file `.env.production`, đổi:
```bash
NEXTAUTH_URL=https://your-actual-domain.com
```

### 4. Cấu Hình MongoDB Password

Trong file `.env.production`, đổi:
```bash
MONGO_PASSWORD=<password-mạnh-của-bạn>
```

## 🚀 Deploy với Docker Compose

### Bước 1: Build và Khởi Chạy

```bash
# Build và start containers
docker-compose up -d --build

# Xem logs
docker-compose logs -f

# Kiểm tra status
docker-compose ps
```

### Bước 2: Kiểm Tra Ứng Dụng

- Mở browser: `http://your-domain:8888`
- Kiểm tra MongoDB: `docker exec -it miko-mongodb mongosh -u admin -p <password>`

### Bước 3: Cấu Hình Nginx/Reverse Proxy (Khuyến nghị)

**Nginx config mẫu:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8888;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔒 Bảo Mật

### Checklist Bảo Mật:
- ✅ Đã đổi tất cả passwords mặc định
- ✅ Đã tạo JWT_SECRET và NEXTAUTH_SECRET mới
- ✅ HTTPS được enable (qua Nginx hoặc Cloudflare)
- ✅ MongoDB không expose port ra ngoài (xóa ports: 27017:27017 trong docker-compose)
- ✅ Firewall chỉ allow ports cần thiết

### Ẩn MongoDB Port:
Trong `docker-compose.yml`, xóa hoặc comment dòng này:
```yaml
# ports:
#   - "27017:27017"  # Không expose MongoDB ra ngoài
```

## 📊 Monitoring & Logs

```bash
# Xem logs realtime
docker-compose logs -f app

# Xem logs MongoDB
docker-compose logs -f mongodb

# Kiểm tra resource usage
docker stats
```

## 🔄 Update & Rollback

### Update Code:
```bash
git pull origin master
docker-compose down
docker-compose up -d --build
```

### Rollback:
```bash
git checkout <previous-commit>
docker-compose down
docker-compose up -d --build
```

## 🛑 Dừng Ứng Dụng

```bash
# Dừng containers
docker-compose down

# Dừng và xóa volumes (XÓA DATABASE!)
docker-compose down -v
```

## ⚠️ Lưu Ý Quan Trọng

1. **Backup Database thường xuyên:**
   ```bash
   docker exec miko-mongodb mongodump --out /backup
   ```

2. **Không commit file .env.production vào Git** (đã có trong .gitignore)

3. **SSL/TLS:** Nên dùng Nginx + Let's Encrypt để có HTTPS

4. **Resource Limits:** Thêm limits vào docker-compose nếu cần:
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '2'
         memory: 2G
   ```

## 🆘 Troubleshooting

### Lỗi: Cannot connect to MongoDB
- Kiểm tra MongoDB đã chạy: `docker-compose ps`
- Kiểm tra password trong MONGODB_URI khớp với MONGO_PASSWORD

### Lỗi: NextAuth callback error
- Kiểm tra NEXTAUTH_URL khớp với domain thực
- Kiểm tra NEXTAUTH_SECRET đã được set

### App không start
- Xem logs: `docker-compose logs app`
- Kiểm tra tất cả biến môi trường trong .env.production đã được set

---

**Liên hệ hỗ trợ:** mikon8n@mikotech.vn
