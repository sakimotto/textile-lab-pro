import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

// Mock data store
let tests = [
  {
    id: '1',
    name: 'Tensile Strength Test',
    sampleId: 'SAMPLE-001',
    type: 'Tensile',
    status: 'In Progress',
    dueDate: '2025-04-15',
    priority: 'High',
    notes: 'Testing tensile strength of cotton sample'
  },
  {
    id: '2',
    name: 'Color Fastness Test',
    sampleId: 'SAMPLE-002',
    type: 'ColorFastness',
    status: 'Pending',
    dueDate: '2025-04-20',
    priority: 'Normal',
    notes: 'Testing color fastness to washing'
  }
]

export async function GET() {
  return NextResponse.json({ data: tests })
}

export async function POST(req: Request) {
  const test = await req.json()
  const newTest = {
    ...test,
    id: uuidv4()
  }
  tests.push(newTest)
  return NextResponse.json({ data: newTest })
}
