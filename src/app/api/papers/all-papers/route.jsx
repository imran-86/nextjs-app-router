
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    
    const response = await fetch('https://nextjs-task-server.vercel.app/all-papers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
     
    });

    if (!response.ok) {
      throw new Error('Failed to fetch  papers');
    }

    const papers = await response.json();
    return NextResponse.json(papers);
  } catch (error) {
    console.error('Error fetching  papers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch  papers' },
      { status: 500 }
    );
  }
}