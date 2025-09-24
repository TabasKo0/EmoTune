import { NextResponse } from 'next/server';

export async function POST(req) {
  const { message } = await req.json();
  const apiKey = process.env.GOOGLE_API_KEY;
  const prompt = `Create a spotify playlist based on the following message(may be mood, activity, request, or image) ${message} Return the playlist in only the following json format (no other suggestions , talking or anything, just the json):{playlistName:string,description:string,songs:{{title:string,artist:string,url:string},...}}`;
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey;

  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return NextResponse.json({ reply: data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.' });
  } catch (error) {
    return NextResponse.json({ reply: 'Error fetching Gemini response.' });
  }
} 