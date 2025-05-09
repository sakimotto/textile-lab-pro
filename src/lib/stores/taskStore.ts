import { create } from 'zustand'
import { Task, TaskFormValues, TaskPriority, TaskStatus } from '../schemas/task'
import { v4 as uuidv4 } from 'uuid'

// Type for the store state
interface TaskState {
  tasks: Task[]
  loading: boolean
  error: string | null
  
  // Actions
  fetchTasks: () => Promise<void>
  addTask: (task: TaskFormValues) => Promise<void>
  updateTask: (id: string, task: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  getTaskById: (id: string) => Task | undefined
  getTasksByStatus: (status: TaskStatus) => Task[]
  getTasksByPriority: (priority: TaskPriority) => Task[]
  getTaskStats: () => { [key in TaskStatus]: number }
}

// Mock tasks data for development
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review tensile strength test results',
    description: 'Verify the test results for sample #TL-2023-45 and prepare report',
    status: 'Todo',
    priority: 'High',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    assignedTo: 'test-user-id',
    relatedSampleId: 'TL-2023-45',
    tags: ['report', 'tensile test'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Calibrate testing equipment',
    description: 'Monthly calibration of tensile testing machine',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    assignedTo: 'test-user-id',
    tags: ['maintenance', 'equipment'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Update test procedure documentation',
    description: 'Add new wash fastness test procedure to documentation',
    status: 'Completed',
    priority: 'Medium',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    assignedTo: 'test-user-id',
    tags: ['documentation', 'procedures'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Client meeting - ABC Textiles',
    description: 'Discuss test results and upcoming requirements',
    status: 'Todo',
    priority: 'Urgent',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    assignedTo: 'test-user-id',
    tags: ['client', 'meeting'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Order new testing chemicals',
    description: 'Restock chemicals for color fastness testing',
    status: 'Blocked',
    priority: 'High',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    assignedTo: 'test-user-id',
    tags: ['supplies', 'purchase'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// Create the Zustand store
export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  
  // Fetch all tasks (simulate API call)
  fetchTasks: async () => {
    set({ loading: true, error: null })
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ tasks: mockTasks, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch tasks', loading: false })
      console.error('Error fetching tasks:', error)
    }
  },
  
  // Add a new task
  addTask: async (taskData: TaskFormValues) => {
    set({ loading: true, error: null })
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newTask: Task = {
        id: uuidv4(),
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      set(state => ({ 
        tasks: [...state.tasks, newTask],
        loading: false
      }))
    } catch (error) {
      set({ error: 'Failed to add task', loading: false })
      console.error('Error adding task:', error)
    }
  },
  
  // Update an existing task
  updateTask: async (id: string, taskUpdate: Partial<Task>) => {
    set({ loading: true, error: null })
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      set(state => ({
        tasks: state.tasks.map(task => 
          task.id === id ? { 
            ...task, 
            ...taskUpdate, 
            updatedAt: new Date().toISOString() 
          } : task
        ),
        loading: false
      }))
    } catch (error) {
      set({ error: 'Failed to update task', loading: false })
      console.error('Error updating task:', error)
    }
  },
  
  // Delete a task
  deleteTask: async (id: string) => {
    set({ loading: true, error: null })
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id),
        loading: false
      }))
    } catch (error) {
      set({ error: 'Failed to delete task', loading: false })
      console.error('Error deleting task:', error)
    }
  },
  
  // Get a task by ID
  getTaskById: (id: string) => {
    return get().tasks.find(task => task.id === id)
  },
  
  // Get tasks by status
  getTasksByStatus: (status: TaskStatus) => {
    return get().tasks.filter(task => task.status === status)
  },
  
  // Get tasks by priority
  getTasksByPriority: (priority: TaskPriority) => {
    return get().tasks.filter(task => task.priority === priority)
  },
  
  // Get task statistics by status
  getTaskStats: () => {
    const stats = {
      'Todo': 0,
      'In Progress': 0,
      'Completed': 0,
      'Blocked': 0
    }
    
    get().tasks.forEach(task => {
      stats[task.status]++
    })
    
    return stats
  }
}))
