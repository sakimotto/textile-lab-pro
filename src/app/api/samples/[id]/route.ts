import { NextResponse } from 'next/server'
import { samples } from '../route'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const sample = samples.find(s => s.id === params.id)
  if (!sample) {
    return NextResponse.json({ error: 'Sample not found' }, { status: 404 })
  }
  return NextResponse.json(sample)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json()
  const index = samples.findIndex(s => s.id === params.id)
  if (index === -1) {
    return NextResponse.json({ error: 'Sample not found' }, { status: 404 })
  }
  samples[index] = { ...samples[index], ...data }
  return NextResponse.json(samples[index])
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = samples.findIndex(s => s.id === params.id)
  if (index === -1) {
    return NextResponse.json({ error: 'Sample not found' }, { status: 404 })
  }
  samples.splice(index, 1)
  return NextResponse.json({ success: true })
}
