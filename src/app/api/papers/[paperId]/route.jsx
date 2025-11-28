import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { paperId } = await params; 
    
    
    const response = await fetch(`https://nextjs-task-server.vercel.app/all-papers/${paperId}`, {
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
export async function DELETE(request, { params }) {
  try {
    const { paperId } = await params;
    
    console.log('Next.js API - Deleting paper ID:', paperId);

    if (!paperId) {
      return NextResponse.json(
        { error: 'Paper ID is required' },
        { status: 400 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://nextjs-task-server.vercel.app';
    const response = await fetch(`${backendUrl}/api/papers/${paperId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Next.js API - Backend response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const result = await response.json();
    console.log('Next.js API - Delete successful:', result);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Next.js API - Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete paper: ' + error.message 
      },
      { status: 500 }
    );
  }
}