# EmoTune Setup Guide

This guide provides detailed instructions for setting up EmoTune in different environments.

## Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm/bun
- Spotify Developer Account
- Google AI API access

## Quick Setup

### 1. Environment Variables

Copy the example environment file:
```bash
cp .env.example .env.local
```

Fill in your credentials:

#### Spotify API Setup
1. Visit [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create an app"
3. Fill in app details:
   - App name: "EmoTune" (or your choice)
   - App description: "AI-powered playlist generator"
   - Redirect URI: `http://localhost:3000/api/auth/callback`
4. Copy Client ID and Client Secret to `.env.local`

#### Google AI API Setup
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Get your API key
3. Add to `.env.local` as `GOOGLE_API_KEY`

#### NextAuth Secret
Generate a random secret:
```bash
openssl rand -base64 32
```
Add to `.env.local` as `NEXTAUTH_SECRET`

### 2. Install and Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000`

## Production Deployment

### Vercel (Recommended)

1. **Prepare Repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy

3. **Update Spotify Settings**
   - Go to Spotify Developer Dashboard
   - Update Redirect URI to: `https://your-domain.vercel.app/api/auth/callback`

### Other Platforms

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Netlify
```bash
# Build the app
npm run build

# Deploy to Netlify
# Upload the .next folder or connect your Git repository
```

## Development Setup

### Database
EmoTune uses SQLite for playlist history:
- Database file: `playlists.db` (auto-created)
- Schema: Playlists table with id, name, description, url, created_at

### Project Structure
```
src/app/
├── api/              # API routes
│   ├── auth/         # Spotify OAuth
│   ├── createPlaylist/
│   ├── geminiPlaylist/
│   └── playlistHistory/
├── dashboard/        # Main app interface
├── profile/          # User profile page
├── signin/           # Authentication page
└── db/              # Database utilities
```

### API Flow
1. User signs in with Spotify OAuth
2. User enters mood/activity
3. Gemini AI generates playlist structure
4. Spotify API creates actual playlist
5. Playlist saved to local database

## Troubleshooting

### Common Issues

**"Module not found" errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Database permissions**
```bash
chmod 666 playlists.db
```

**Spotify authentication fails**
- Check redirect URI exactly matches
- Verify CLIENT_ID and CLIENT_SECRET
- Ensure Spotify app is not in development mode restrictions

**AI generation fails**
- Verify Google AI API key is valid
- Check API quota limits
- Test with simple prompts first

### Development Tips

**Hot Reload Issues**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

**Debug Mode**
Add to `.env.local`:
```env
NODE_ENV=development
DEBUG=1
```

**Testing OAuth Locally**
Use ngrok for HTTPS testing:
```bash
npx ngrok http 3000
# Update Spotify redirect URI to ngrok URL
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `SPOTIFY_CLIENT_ID` | Yes | Spotify app client ID |
| `SPOTIFY_CLIENT_SECRET` | Yes | Spotify app client secret |
| `SPOTIFY_REDIRECT_URI` | Yes | OAuth callback URL |
| `GOOGLE_API_KEY` | Yes | Google AI API key |
| `NEXTAUTH_URL` | Yes | App base URL |
| `NEXTAUTH_SECRET` | Yes | JWT signing secret |

## Support

If you encounter issues:
1. Check this setup guide
2. Review error messages carefully
3. Check browser console for client-side errors
4. Verify all environment variables are set
5. Open an issue on GitHub with details

Happy coding! 🎵