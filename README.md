# 🎵 EmoTune

**AI-Powered Spotify Playlist Generator Based on Your Mood**

EmoTune is a Next.js web application that creates personalized Spotify playlists using artificial intelligence. Simply describe your mood, activity, or what you're feeling, and EmoTune will generate a curated playlist tailored to your emotions.

<img width="1919" height="1079" alt="Screenshot 2025-09-25 231800" src="https://github.com/user-attachments/assets/ade019cc-b413-4d1c-9350-849791c439d2" />

## ✨ Features


### 🎯 **Mood-Based Playlist Generation**
- Enter any mood, activity, or feeling (e.g., "feeling nostalgic", "workout energy", "rainy day vibes")
- AI-powered playlist creation using Google Gemini API
- Automatic Spotify playlist creation in your account

<img width="1919" height="1079" alt="Screenshot 2025-09-25 232708" src="https://github.com/user-attachments/assets/29480bbc-43f9-41df-b43f-66d1fd042836" />


### 🔐 **Spotify Integration** 
- Secure OAuth authentication with Spotify
- Direct playlist creation in your Spotify account
- Access to your Spotify profile and listening history

<img width="1900" height="1079" alt="Screenshot 2025-09-25 233129" src="https://github.com/user-attachments/assets/3dbbd27e-ac5f-4b41-8103-04c17aa510e5" />


### 📱 **Responsive Design**
- Mobile-friendly interface
- Clean, modern UI with dark/light theme support
- Seamless experience across all devices

### 📚 **Playlist History**
- Track all your generated playlists
- SQLite database for playlist storage
- View detailed playlist information and tracks

![Dashboard View](https://github.com/user-attachments/assets/678e4792-861d-4578-b6cc-46326fb0a8f8)

## 🚀 Technology Stack

- **Frontend**: Next.js 15.5.4, React 19, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: SQLite3
- **AI**: Google Gemini API
- **Authentication**: Spotify OAuth
- **Styling**: Tailwind CSS with custom theming
- **Icons & UI**: Custom SVG icons, React Loading Indicators

## 📋 Prerequisites

Before running EmoTune, ensure you have:

1. **Node.js** (version 18 or higher)
2. **npm**, **yarn**, **pnpm**, or **bun** package manager
3. **Spotify Developer Account** - [Create one here](https://developer.spotify.com/)
4. **Google AI API Key** - [Get one here](https://makersuite.google.com/app/apikey)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/TabasKo0/EmoTune.git
cd EmoTune
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# Spotify API Configuration
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback

# Google Gemini AI API
GOOGLE_API_KEY=your_google_ai_api_key

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 4. Spotify App Configuration
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add `http://localhost:3000/api/auth/callback` to Redirect URIs
4. Copy Client ID and Client Secret to your `.env.local`

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎯 Usage

1. **Sign In**: Click "Login" and authenticate with your Spotify account
2. **Generate Playlist**: Enter your mood or activity in the input field
3. **Get Your Playlist**: AI will create a personalized playlist and add it to your Spotify
4. **Enjoy**: Listen to your mood-based playlist on Spotify!

## 🏗️ Project Structure

```
EmoTune/
├── src/
│   └── app/
│       ├── api/                 # API Routes
│       │   ├── auth/           # Spotify OAuth
│       │   ├── createPlaylist/ # Playlist creation
│       │   ├── geminiPlaylist/ # AI playlist generation
│       │   ├── getToken/       # Token management
│       │   └── playlistHistory/# Playlist storage
│       ├── dashboard/          # Dashboard page
│       ├── profile/            # User profile
│       ├── signin/             # Sign-in page
│       ├── db/                 # Database utilities
│       ├── layout.js           # Root layout
│       ├── page.js             # Home page
│       └── globals.css         # Global styles
├── public/                     # Static assets
├── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signin` - Initiate Spotify OAuth
- `GET /api/auth/callback` - Handle OAuth callback
- `GET /api/auth/check` - Check authentication status
- `POST /api/auth/logout` - Logout user

### Playlist Management
- `POST /api/geminiPlaylist` - Generate playlist with AI
- `POST /api/createPlaylist` - Create playlist on Spotify
- `GET /api/playlistHistory` - Retrieve playlist history
- `POST /api/playlistHistory` - Save playlist to history

### Utilities
- `GET /api/getToken` - Get user access token

## 🎨 Theming

EmoTune supports automatic dark/light theme switching based on system preferences:

- **Light Theme**: Clean white background with gray accents
- **Dark Theme**: Purple gradient background (#733893) with yellow-green text (#e6e8a3)

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Update Spotify redirect URI to your production URL
5. Deploy!

### Other Platforms

EmoTune can be deployed on any platform that supports Node.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### Common Issues

**Spotify Authentication Not Working**
- Verify redirect URI matches exactly in Spotify app settings
- Check CLIENT_ID and CLIENT_SECRET are correct

**AI Playlist Generation Failing**
- Ensure GOOGLE_API_KEY is valid and has quota remaining
- Check network connectivity to Google AI services

**Database Errors**
- Verify SQLite3 is properly installed
- Check file permissions for database creation

## 📧 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the troubleshooting section

---

**Made with ❤️ and 🎵 by TabasKo0**
