import { z } from 'zod'

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent'
export type TaskStatus = 'Todo' | 'In Progress' | 'Completed' | 'Blocked'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
  assignedTo?: string
  relatedSampleId?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export const taskFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  status: z.enum(['Todo', 'In Progress', 'Completed', 'Blocked']),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']),
  dueDate: z.string().optional(),
  assignedTo: z.string().optional(),
  relatedSampleId: z.string().optional(),
  tags: z.array(z.string())
})

export type TaskFormValues = z.infer<typeof taskFormSchema>

// Export constants for reuse throughout the application
export const TASK_PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High', 'Urgent']
export const TASK_STATUSES: TaskStatus[] = ['Todo', 'In Progress', 'Completed', 'Blocked']
