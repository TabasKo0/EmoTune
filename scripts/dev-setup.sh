#!/bin/bash

# EmoTune Development Setup Script
echo "🎵 EmoTune Development Setup"
echo "============================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Copying from .env.example..."
    cp .env.example .env.local
    echo "📝 Please edit .env.local with your API keys:"
    echo "   - SPOTIFY_CLIENT_ID"
    echo "   - SPOTIFY_CLIENT_SECRET" 
    echo "   - GOOGLE_API_KEY"
    echo "   - NEXTAUTH_SECRET"
else
    echo "✅ .env.local exists"
fi

# Check if database exists
if [ ! -f playlists.db ]; then
    echo "🗄️  Database will be created on first run"
else
    echo "✅ Database exists"
fi

echo ""
echo "🚀 Setup complete! Next steps:"
echo "1. Edit .env.local with your API credentials"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000"
echo ""
echo "📚 For detailed setup instructions, see SETUP.md"