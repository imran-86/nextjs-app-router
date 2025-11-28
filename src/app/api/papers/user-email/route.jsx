import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('userEmail');
    console.log("After request ", userEmail);
    
    if (!userEmail) {
      return NextResponse.json(
        { error: 'User email is required' },
        { status: 400 }
      );
    }
    const response = await fetch(`https://nextjs-task-server.vercel.app/user-email?userEmail=${encodeURIComponent(userEmail)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user papers');
    }

    const userPapers = await response.json();
    return NextResponse.json(userPapers);
  } catch (error) {
    console.error('Error fetching user papers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user papers' },
      { status: 500 }
    );
  }
}

