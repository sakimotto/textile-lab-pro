'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Activity, Beaker, Clock, FileText, ClipboardList, Briefcase, CalendarIcon, Printer } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface Event {
  client: string
  test: string
  date: Date
}

const INITIAL_EVENTS: Event[] = [
  { client: 'FashionCo', test: 'Durability Test', date: new Date() },
  { client: 'SportswearInc', test: 'Color Fastness', date: new Date(Date.now() + 86400000) },
  { client: 'TextilePro', test: 'Abrasion Test', date: new Date(Date.now() + 172800000) }
]

export function LandingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [jobsInWork, setJobsInWork] = useState<Event[]>(INITIAL_EVENTS.slice(0, 2))
  const [latestRequests, setLatestRequests] = useState<Event[]>(INITIAL_EVENTS)
  const allEvents = [...jobsInWork, ...latestRequests]

  const handleNewRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newRequest: Event = {
      client: formData.get('client') as string,
      test: formData.get('test') as string,
      date: new Date(formData.get('date') as string)
    }
    setLatestRequests(prev => [...prev, newRequest])
    e.currentTarget.reset()
  }

  const printForm = () => {
    window.print()
  }

  return (
    <div className="grid gap-6">
      <section className="text-center max-w-3xl mx-auto print:hidden">
        <h1 className="text-4xl font-bold mb-4">Advanced Textile Testing Laboratory</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Comprehensive physical testing services for all your textile quality assurance needs
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 print:hidden">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Physical Testing</h3>
                <p className="text-sm text-muted-foreground">
                  Tensile strength, tear resistance, abrasion testing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Beaker className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Chemical Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Fiber composition, pH testing, color fastness
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Quick Turnaround</h3>
                <p className="text-sm text-muted-foreground">
                  Fast and reliable testing results
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6 print:hidden">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Testing Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Tests Completed</span>
                <span className="font-semibold">1,042</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: "95%" }} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Processing Time</span>
                <span className="font-semibold">24h</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: "85%" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Latest Reports</h3>
            <div className="space-y-4">
              {[
                "Tensile Strength Analysis - Cotton Blend",
                "Fabric Weight Test - Polyester",
                "Colorfastness Evaluation - Denim",
                "Fiber Composition Analysis - Mixed Fabric"
              ].map((report, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{report}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6 print:hidden">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Latest Requests
            </h3>
            <div className="space-y-4">
              {latestRequests.map((request, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{request.client}</p>
                    <p className="text-sm text-muted-foreground">{request.test}</p>
                  </div>
                  <Badge variant="outline">
                    {format(request.date, 'MMM dd')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Jobs in Work
            </h3>
            <div className="space-y-4">
              {jobsInWork.map((job, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{job.client}</p>
                    <p className="text-sm text-muted-foreground">{job.test}</p>
                  </div>
                  <Badge variant="secondary">
                    {format(job.date, 'MMM dd')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 print:hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Testing Schedule
            </h3>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                event: (date) => allEvents.some(event => 
                  event.date.getDate() === date.getDate() &&
                  event.date.getMonth() === date.getMonth() &&
                  event.date.getFullYear() === date.getFullYear()
                )
              }}
              modifiersStyles={{
                event: { 
                  fontWeight: 'bold',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  borderRadius: '50%'
                }
              }}
            />
            <div className="flex-1">
              <h4 className="font-semibold mb-2">
                {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
              </h4>
              <div className="space-y-2">
                {allEvents
                  .filter(event => 
                    date &&
                    event.date.getDate() === date.getDate() &&
                    event.date.getMonth() === date.getMonth() &&
                    event.date.getFullYear() === date.getFullYear()
                  )
                  .map((event, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{event.client}</p>
                        <p className="text-sm text-muted-foreground">{event.test}</p>
                      </div>
                      <Badge variant={jobsInWork.includes(event) ? "secondary" : "outline"}>
                        {jobsInWork.includes(event) ? "In Progress" : "Scheduled"}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            New Test Request Form
          </h3>
          <form onSubmit={handleNewRequest} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client Name</Label>
                <Input id="client" name="client" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Requested Date</Label>
                <Input id="date" name="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="test">Test Type</Label>
                <Select name="test" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="durability">Durability Test</SelectItem>
                    <SelectItem value="moisture">Moisture Wicking Analysis</SelectItem>
                    <SelectItem value="colorfastness">Colorfastness Test</SelectItem>
                    <SelectItem value="abrasion">Abrasion Resistance</SelectItem>
                    <SelectItem value="environmental">Environmental Impact Assessment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sample">Sample Description</Label>
                <Input id="sample" name="sample" required />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button type="submit">Submit Request</Button>
              <Button type="button" variant="outline" onClick={printForm}>
                <Printer className="mr-2 h-4 w-4" />
                Print Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6 print:hidden">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">References</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <p className="text-sm">
                ASTM International. (2021). Standard Test Methods for Textile Testing.
                <a href="https://www.astm.org/Standards/textile-standards.html" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  ASTM Textile Standards
                </a>
              </p>
            </li>
            <li>
              <p className="text-sm">
                International Organization for Standardization. (2020). Textiles — Tests for colour fastness.
                <a href="https://www.iso.org/standard/72439.html" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  ISO 105-A01:2010
                </a>
              </p>
            </li>
            <li>
              <p className="text-sm">
                American Association of Textile Chemists and Colorists. (2022). AATCC Test Methods.
                <a href="https://www.aatcc.org/test-methods/" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  AATCC Test Methods
                </a>
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
