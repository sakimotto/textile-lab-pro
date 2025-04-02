import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

// Mock data store
let reports = [
  {
    id: '1',
    title: 'Tensile Strength Analysis Report',
    type: 'Physical Testing',
    status: 'Completed',
    createdAt: '2025-04-01',
    createdBy: 'John Doe',
    lastModified: '2025-04-01',
  },
  {
    id: '2',
    title: 'Color Fastness Test Report',
    type: 'Chemical Analysis',
    status: 'In Progress',
    createdAt: '2025-04-01',
    createdBy: 'Jane Smith',
    lastModified: '2025-04-01',
  }
]

export async function GET() {
  return NextResponse.json({ data: reports })
}

export async function POST(req: Request) {
  const report = await req.json()
  const newReport = {
    ...report,
    id: uuidv4()
  }
  reports.push(newReport)
  return NextResponse.json({ data: newReport })
}
