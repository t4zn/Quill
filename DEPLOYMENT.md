# Deployment Guide for blogs.taizun.site

## Prerequisites

1. **MongoDB Atlas Account** - Set up your database
2. **Google Gemini API Key** - For AI content generation
3. **Domain Access** - blogs.taizun.site configured
4. **Server/VPS** - For hosting the application

## Environment Setup

Create `.env` file with these essential variables:

```bash
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quill_blog?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_super_long_random_jwt_secret_here

# AI Generation
GEMINI_API_KEY=your_gemini_api_key_here
```

## MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create new cluster (free tier works)
3. Create database user with read/write permissions
4. Whitelist your server IP address
5. Get connection string and update `MONGODB_URI`

## Google Gemini API Setup

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create new API key
3. Copy to `GEMINI_API_KEY` in your `.env`

## Deployment Steps

### 1. Clone and Setup
```bash
git clone https://github.com/t4zn/Quill.git
cd Quill
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env
# Edit .env with your actual values
```

### 3. Database Seeding
```bash
npm run db:seed
```

### 4. Build Application
```bash
npm run build
```

### 5. Start Production Server
```bash
npm start
```

## Domain Configuration

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name blogs.taizun.site;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL Certificate (Let's Encrypt)
```bash
sudo certbot --nginx -d blogs.taizun.site
```

## Process Management (PM2)

### Install PM2
```bash
npm install -g pm2
```

### Start Application
```bash
pm2 start npm --name "quill-blog" -- start
pm2 save
pm2 startup
```

### Monitor Application
```bash
pm2 status
pm2 logs quill-blog
pm2 restart quill-blog
```

## Security Checklist

- [ ] Strong JWT secret (64+ characters)
- [ ] MongoDB Atlas IP whitelist configured
- [ ] SSL certificate installed
- [ ] Firewall configured (only ports 80, 443, 22)
- [ ] Regular backups scheduled
- [ ] Environment variables secured

## Monitoring

### Health Check
```bash
curl https://blogs.taizun.site/api/health
```

### Database Connection
Check MongoDB Atlas dashboard for connection status

### AI Service
Test content generation through the app interface

## Troubleshooting

### Common Issues

1. **Port 5000 in use**
   - Change PORT in .env file
   - Update nginx configuration

2. **MongoDB connection failed**
   - Check connection string format
   - Verify IP whitelist in Atlas
   - Ensure database user permissions

3. **AI generation not working**
   - Verify GEMINI_API_KEY is valid
   - Check API quotas in Google AI Studio

4. **SSL certificate issues**
   - Ensure domain points to server IP
   - Run certbot renewal: `sudo certbot renew`

## Backup Strategy

### Database Backup
```bash
# MongoDB Atlas provides automatic backups
# Or use mongodump for manual backups
mongodump --uri="your_mongodb_uri" --out=./backup
```

### Application Backup
```bash
# Backup entire application directory
tar -czf quill-backup-$(date +%Y%m%d).tar.gz /path/to/Quill
```

## Updates

### Update Application
```bash
git pull origin main
npm install
npm run build
pm2 restart quill-blog
```

### Update Dependencies
```bash
npm update
npm audit fix
```