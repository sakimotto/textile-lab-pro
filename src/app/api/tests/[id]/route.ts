import { NextResponse } from 'next/server'

// Mock data store - shared with the main tests route
declare const tests: any[]

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const test = tests.find(t => t.id === params.id)
  if (!test) {
    return new NextResponse('Test not found', { status: 404 })
  }
  return NextResponse.json({ data: test })
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const testIndex = tests.findIndex(t => t.id === params.id)
  if (testIndex === -1) {
    return new NextResponse('Test not found', { status: 404 })
  }

  const updatedTest = await req.json()
  tests[testIndex] = {
    ...tests[testIndex],
    ...updatedTest,
    id: params.id
  }

  return NextResponse.json({ data: tests[testIndex] })
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const testIndex = tests.findIndex(t => t.id === params.id)
  if (testIndex === -1) {
    return new NextResponse('Test not found', { status: 404 })
  }

  tests.splice(testIndex, 1)
  return new NextResponse(null, { status: 204 })
}
