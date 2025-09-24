import { NextResponse } from "next/server";

export async function GET(req) {
  const accessToken = req.cookies.get("spotify_access_token")?.value||undefined;

  if (!accessToken) {
    return NextResponse.json({ error: "No access token found" }, { status: 401 });
  }
  return NextResponse.json({ accessToken });
}