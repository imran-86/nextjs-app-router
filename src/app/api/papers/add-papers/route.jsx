
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const paperData = await request.json()
    const response = await fetch('http://localhost:4000/add-papers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paperData)
    })

    if (!response.ok) {
      throw new Error('Backend submission failed')
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error submitting paper:', error)
    return NextResponse.json(
      { error: 'Failed to submit research paper' },
      { status: 500 }
    )
  }
}