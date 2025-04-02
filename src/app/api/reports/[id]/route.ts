import { NextResponse } from 'next/server'

// Mock data store - shared with the main reports route
declare const reports: any[]

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const report = reports.find(r => r.id === params.id)
  if (!report) {
    return new NextResponse('Report not found', { status: 404 })
  }
  return NextResponse.json({ data: report })
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const reportIndex = reports.findIndex(r => r.id === params.id)
  if (reportIndex === -1) {
    return new NextResponse('Report not found', { status: 404 })
  }

  const updatedReport = await req.json()
  reports[reportIndex] = {
    ...reports[reportIndex],
    ...updatedReport,
    id: params.id
  }

  return NextResponse.json({ data: reports[reportIndex] })
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const reportIndex = reports.findIndex(r => r.id === params.id)
  if (reportIndex === -1) {
    return new NextResponse('Report not found', { status: 404 })
  }

  reports.splice(reportIndex, 1)
  return new NextResponse(null, { status: 204 })
}
