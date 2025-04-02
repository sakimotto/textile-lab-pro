import { NextResponse } from 'next/server'

let samples = [
  {
    id: '1',
    name: 'Cotton Sample #1',
    clientName: 'Textile Corp',
    type: 'Cotton',
    submissionDate: '2025-04-01',
    status: 'Pending',
  },
  {
    id: '2',
    name: 'Polyester Sample #1',
    clientName: 'Fashion Inc',
    type: 'Polyester',
    submissionDate: '2025-04-01',
    status: 'In Progress',
  },
]

export async function GET() {
  return NextResponse.json(samples)
}

export async function POST(request: Request) {
  const data = await request.json()
  const newSample = {
    id: (samples.length + 1).toString(),
    ...data,
  }
  samples.push(newSample)
  return NextResponse.json(newSample)
}

export async function PUT(request: Request) {
  const data = await request.json()
  const index = samples.findIndex(sample => sample.id === data.id)
  if (index === -1) {
    return NextResponse.json({ error: 'Sample not found' }, { status: 404 })
  }
  samples[index] = { ...samples[index], ...data }
  return NextResponse.json(samples[index])
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'Sample ID is required' }, { status: 400 })
  }
  const index = samples.findIndex(sample => sample.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Sample not found' }, { status: 404 })
  }
  samples = samples.filter(sample => sample.id !== id)
  return NextResponse.json({ success: true })
}
