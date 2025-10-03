# Quill Blog Platform - Setup Guide

## Quick Start

1. **Clone and Install**
   ```bash
   git clone https://github.com/t4zn/Quill.git
   cd Quill
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values (see below)
   ```

3. **Database Setup**
   ```bash
   npm run db:seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Required Environment Variables

### 🔴 Critical (App won't work without these)

1. **MONGODB_URI** - MongoDB connection string
   - **Recommended**: [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier available)
   - **Format**: `mongodb+srv://username:password@cluster.mongodb.net/quill_blog?retryWrites=true&w=majority`

2. **JWT_SECRET** - For secure authentication tokens
   - **Generate**: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

3. **GEMINI_API_KEY** - Google Gemini API for AI content generation
   - **Get it**: [Google AI Studio](https://aistudio.google.com/app/apikey)
   - **Free tier**: Available with generous limits

### 🟡 Optional (Enhances functionality)

4. **OAuth Providers** (for social login)
   - **Google**: `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
   - **GitHub**: `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`
   - **Setup**: See OAuth setup section below

5. **Google AdSense** (for monetization)
   - `GOOGLE_ADSENSE_CLIENT_ID` - Your AdSense publisher ID
   - **Setup**: [Google AdSense](https://www.google.com/adsense/)

## Database Setup Options

### Option 1: MongoDB Atlas (Recommended)
1. Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Get connection string and add to `MONGODB_URI`
5. Whitelist your IP address

### Option 2: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service: `mongod`
3. Set `MONGODB_URI=mongodb://localhost:27017/quill_blog`

## Google Gemini API Setup

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key to `GEMINI_API_KEY` in your `.env`

## OAuth Setup (Optional)

### Google OAuth
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Copy Client ID and Secret to your `.env`

### GitHub OAuth
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Set Authorization callback URL: `http://localhost:5000/api/auth/github/callback`
4. Copy Client ID and Secret to your `.env`

## Google AdSense Setup (Optional)

1. Apply for [Google AdSense](https://www.google.com/adsense/)
2. Get approved (may take time)
3. Get your Publisher ID (ca-pub-xxxxxxxxxx)
4. Add to `GOOGLE_ADSENSE_CLIENT_ID` in your `.env`
5. Create ad units in AdSense dashboard

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:seed` - Seed database with sample data
- `npm run check` - Type checking

## Project Structure

```
Quill/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   └── lib/         # Utilities and hooks
├── server/          # Express.js backend
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   ├── db.ts        # Database connection
│   └── storage.ts   # Data access layer
├── shared/          # Shared TypeScript types
└── .env            # Environment variables (create this)
```

## Features

- ✅ AI-powered blog content generation
- ✅ User authentication and registration
- ✅ Rich text editor for blog posts
- ✅ Responsive design with dark/light themes
- ✅ Blog discovery and reading interface
- ✅ Real-time content preview
- 🚧 Image upload and management
- 🚧 Social sharing features
- 🚧 Comment system

## Troubleshooting

### Port Issues
If you get `ENOTSUP` errors, the app will automatically try different ports. Default is 5000.

### Database Connection
- Ensure your `MONGODB_URI` is correct
- For MongoDB Atlas, whitelist your IP address
- Run `npm run db:seed` to create sample data

### AI Features Not Working
- Verify your `GEMINI_API_KEY` is valid
- Check API quotas in Google AI Studio
- Ensure you have internet connection

### Authentication Issues
- Verify your `JWT_SECRET` is set and long enough
- Check MongoDB connection and user creation

### Build Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version (requires Node 18+)

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production database
3. Set up proper domain and SSL
4. Use a process manager like PM2
5. Configure reverse proxy (nginx)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

- 📧 Issues: [GitHub Issues](https://github.com/t4zn/Quill/issues)
- 📖 Documentation: This README and inline code comments
- 💬 Discussions: [GitHub Discussions](https://github.com/t4zn/Quill/discussions)