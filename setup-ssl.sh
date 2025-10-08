#!/bin/bash

DOMAIN="autoworkflow.mikotech.vn"
EMAIL="buitrungtinh130296@gmail.com"

echo "Setting up SSL for $DOMAIN..."

# Create directories
mkdir -p certbot/conf certbot/www

# Get SSL certificate
docker-compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  --staging \
  -d $DOMAIN

echo "SSL certificate obtained. Use --staging flag for testing."
echo "For production SSL, remove --staging flag and run again."
