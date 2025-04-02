import { z } from 'zod'

export interface SampleSchema {
  // Sample Information
  id: string
  name: string
  clientId: string
  submissionDate: Date
  receivedBy: string
  
  // Material Properties
  fiberType: string
  fabricConstruction: string
  weightGSM: number
  color: string
  finishType: string
  composition: {
    cotton?: number
    polyester?: number
    wool?: number
    silk?: number
    other?: number
  }
  
  // Testing Information
  testStandards: string[]
  testParameters: Record<string, string | number>
  equipmentUsed: string
  testConditions: {
    temperature: number
    humidity: number
  }
  testDuration: number
  
  // Results
  results: Record<string, any>
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed'
  anomalies: string[]
  certification: {
    status: 'Pending' | 'Approved' | 'Rejected'
    certificateNumber?: string
  }
}

// Enum definitions
export const FiberTypes = ['Cotton', 'Polyester', 'Wool', 'Silk', 'Nylon', 'Blend'] as const
export const FabricConstructions = ['Woven', 'Knit', 'Non-woven'] as const
export const FinishTypes = ['None', 'Water repellent', 'Flame retardant', 'Anti-microbial'] as const
export const TestStandards = ['AATCC', 'ASTM', 'ISO', 'BS', 'EN'] as const

// Validation schema (using Zod)
export const sampleValidationSchema = z.object({
  name: z.string().min(1),
  clientId: z.string().min(1),
  submissionDate: z.date(),
  receivedBy: z.string().min(1),
  fiberType: z.enum(FiberTypes),
  fabricConstruction: z.enum(FabricConstructions),
  weightGSM: z.number().positive(),
  color: z.string().min(1),
  finishType: z.enum(FinishTypes),
  composition: z.object({
    cotton: z.number().min(0).max(100).optional(),
    polyester: z.number().min(0).max(100).optional(),
    wool: z.number().min(0).max(100).optional(),
    silk: z.number().min(0).max(100).optional(),
    other: z.number().min(0).max(100).optional(),
  }),
  testStandards: z.array(z.enum(TestStandards)).min(1),
  testParameters: z.record(z.union([z.string(), z.number()])),
  equipmentUsed: z.string().min(1),
  testConditions: z.object({
    temperature: z.number(),
    humidity: z.number(),
  }),
  testDuration: z.number().positive(),
  results: z.record(z.any()),
  status: z.enum(['Pending', 'In Progress', 'Completed', 'Failed']),
  anomalies: z.array(z.string()),
  certification: z.object({
    status: z.enum(['Pending', 'Approved', 'Rejected']),
    certificateNumber: z.string().optional(),
  }),
})
