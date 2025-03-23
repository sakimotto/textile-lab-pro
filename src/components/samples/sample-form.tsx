'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SampleFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  isLoading?: boolean
}

export function SampleForm({ onSubmit, onCancel, isLoading }: SampleFormProps) {
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    clientId: '',
    materialType: '',
    fabricConstruction: '',
    color: '',
    weight: '',
    width: '',
    requiredTests: [],
    specialInstructions: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, receivedDate: date })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Register New Sample</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientId">Client</Label>
              <Select
                value={formData.clientId}
                onValueChange={(value) => setFormData({ ...formData, clientId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">FashionCo Industries</SelectItem>
                  <SelectItem value="2">Textile Innovations Ltd</SelectItem>
                  <SelectItem value="3">EcoFabrics Co</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Received Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="materialType">Material Type</Label>
              <Select
                value={formData.materialType}
                onValueChange={(value) => setFormData({ ...formData, materialType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select material type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="polyester">Polyester</SelectItem>
                  <SelectItem value="silk">Silk</SelectItem>
                  <SelectItem value="wool">Wool</SelectItem>
                  <SelectItem value="blend">Blend</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fabricConstruction">Fabric Construction</Label>
              <Input
                id="fabricConstruction"
                value={formData.fabricConstruction}
                onChange={(e) => setFormData({ ...formData, fabricConstruction: e.target.value })}
                placeholder="e.g., Plain Weave, Twill, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="Enter color"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (g/m²)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="Enter fabric weight"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="width">Width (cm)</Label>
              <Input
                id="width"
                type="number"
                value={formData.width}
                onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                placeholder="Enter fabric width"
              />
            </div>

            <div className="space-y-2">
              <Label>Required Tests</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select tests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tensile">Tensile Strength</SelectItem>
                  <SelectItem value="tear">Tear Resistance</SelectItem>
                  <SelectItem value="abrasion">Abrasion Resistance</SelectItem>
                  <SelectItem value="colorfastness">Color Fastness</SelectItem>
                  <SelectItem value="dimensional">Dimensional Stability</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialInstructions">Special Instructions</Label>
            <Textarea
              id="specialInstructions"
              value={formData.specialInstructions}
              onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
              placeholder="Enter any special instructions or notes"
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register Sample
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
