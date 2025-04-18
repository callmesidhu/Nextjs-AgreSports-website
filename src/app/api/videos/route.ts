// filepath: c:\Users\A lan John Chacko\Desktop\projects\devou-projects\agresports\src\app\api\videos\route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://www.youtube.com/feeds/videos.xml?channel_id=UCN21HFg49RRN1tJSAD3Qtuw'
    );
    const text = await response.text();
    return new NextResponse(text, {
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}