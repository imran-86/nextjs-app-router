
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    
    const response = await fetch('https://nextjs-task-server.vercel.app/featured-papers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
     
    });

    if (!response.ok) {
      throw new Error('Failed to fetch featured papers');
    }

    const featuredPapers = await response.json();
    return NextResponse.json(featuredPapers);
  } catch (error) {
    console.error('Error fetching featured papers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured papers' },
      { status: 500 }
    );
  }
}