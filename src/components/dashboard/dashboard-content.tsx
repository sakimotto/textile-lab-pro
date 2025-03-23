'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Activity, Beaker, Clock, FileText } from 'lucide-react'
import { FeatureCard } from './feature-card'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TestRequest {
  client: string
  test: string
  date: Date
}

const INITIAL_REQUESTS: TestRequest[] = [
  { client: 'DenimCo', test: 'Colorfastness Test', date: new Date() },
  { client: 'TechWear', test: 'Abrasion Resistance', date: new Date() },
  { client: 'SustainableFabrics', test: 'Environmental Impact Assessment', date: new Date() }
]

export function DashboardContent() {
  const [latestRequests] = useState<TestRequest[]>(INITIAL_REQUESTS)
  const [jobsInWork] = useState<TestRequest[]>(INITIAL_REQUESTS.slice(0, 2))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Advanced Textile Testing Laboratory</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive physical testing services for all your textile quality assurance needs
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={Activity}
          title="Physical Testing"
          description="Tensile strength, tear resistance, abrasion testing"
        />
        <FeatureCard
          icon={Beaker}
          title="Chemical Analysis"
          description="Fiber composition, pH testing, color fastness"
        />
        <FeatureCard
          icon={Clock}
          title="Quick Turnaround"
          description="Fast and reliable testing results"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Testing Statistics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Tests Completed</span>
                  <span className="font-semibold">1,042</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '95%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Average Processing Time</span>
                  <span className="font-semibold">24h</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '85%' }} />
                </div>
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

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Latest Requests</h3>
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
            <h3 className="text-lg font-semibold mb-4">Jobs in Work</h3>
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
    </div>
  )
}
