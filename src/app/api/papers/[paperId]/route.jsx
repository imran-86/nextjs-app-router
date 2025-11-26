import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { paperId } = await params; 
    
    
    const response = await fetch(`http://localhost:4000/all-papers/${paperId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const paperData = await response.json();
    return NextResponse.json(paperData);
  } catch (error) {
    console.error('Error fetching paper details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch paper details' },
      { status: 500 }
    );
  }
}