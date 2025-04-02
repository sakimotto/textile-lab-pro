import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { clientsApi, samplesApi, testsApi, reportsApi } from '../api'

interface Client {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  activeTests: number
  status: 'Active' | 'Inactive'
}

interface Sample {
  id: string
  name: string
  clientName: string
  type: string
  submissionDate: string
  status: string
}

interface Test {
  id: string
  name: string
  sampleId: string
  type: string
  status: string
  dueDate: string
  priority: string
  notes: string
}

interface Report {
  id: string
  name: string
  type: string
  status: string
}

interface AppState {
  // UI State
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  
  // Data
  clients: Client[]
  samples: Sample[]
  tests: Test[]
  reports: Report[]
  
  // Loading States
  loading: {
    clients: boolean
    samples: boolean
    tests: boolean
    reports: boolean
  }
  
  // Error States
  error: {
    samples: string | null
    clients: string | null
    tests: string | null
    reports: string | null
  }
  
  // Actions
  setTheme: (theme: 'light' | 'dark') => void
  setSidebarOpen: (open: boolean) => void
  
  // Client Actions
  fetchClients: () => Promise<void>
  addClient: (client: Omit<Client, 'id'>) => Promise<void>
  updateClient: (id: string, client: Partial<Client>) => Promise<void>
  deleteClient: (id: string) => Promise<void>
  
  // Sample Actions
  fetchSamples: () => Promise<void>
  addSample: (sample: Omit<Sample, 'id'>) => Promise<void>
  updateSample: (id: string, sample: Partial<Sample>) => Promise<void>
  deleteSample: (id: string) => Promise<void>
  
  // Test Actions
  fetchTests: () => Promise<void>
  addTest: (test: Omit<Test, 'id'>) => Promise<void>
  updateTest: (id: string, test: Partial<Test>) => Promise<void>
  deleteTest: (id: string) => Promise<void>
  
  // Report Actions
  fetchReports: () => Promise<void>
  addReport: (report: Omit<Report, 'id'>) => Promise<void>
  updateReport: (id: string, report: Partial<Report>) => Promise<void>
  deleteReport: (id: string) => Promise<void>
}

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Initial State
        theme: 'light',
        sidebarOpen: true,
        clients: [],
        samples: [],
        tests: [],
        reports: [],
        loading: {
          clients: false,
          samples: false,
          tests: false,
          reports: false,
        },
        error: {
          samples: null,
          clients: null,
          tests: null,
          reports: null,
        },
        
        // UI Actions
        setTheme: (theme) => set({ theme }),
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        
        // Client Actions
        fetchClients: async () => {
          try {
            set((state) => ({ loading: { ...state.loading, clients: true } }))
            const response = await clientsApi.getAll()
            set({ clients: response.data })
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, clients: error.message } }))
            console.error('Error fetching clients:', error)
          } finally {
            set((state) => ({ loading: { ...state.loading, clients: false } }))
          }
        },
        addClient: async (client) => {
          try {
            const response = await clientsApi.create(client)
            set((state) => ({ clients: [...state.clients, response.data] }))
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, clients: error.message } }))
            console.error('Error adding client:', error)
          }
        },
        updateClient: async (id, client) => {
          try {
            const response = await clientsApi.update(id, client)
            set((state) => ({
              clients: state.clients.map((c) => (c.id === id ? response.data : c)),
            }))
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, clients: error.message } }))
            console.error('Error updating client:', error)
          }
        },
        deleteClient: async (id) => {
          try {
            await clientsApi.delete(id)
            set((state) => ({
              clients: state.clients.filter((c) => c.id !== id),
            }))
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, clients: error.message } }))
            console.error('Error deleting client:', error)
          }
        },
        
        // Sample Actions
        fetchSamples: async () => {
          try {
            set((state) => ({ loading: { ...state.loading, samples: true } }))
            const response = await samplesApi.getAll()
            set({ samples: response.data })
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, samples: error.message } }))
            console.error('Error fetching samples:', error)
          } finally {
            set((state) => ({ loading: { ...state.loading, samples: false } }))
          }
        },
        addSample: async (sample) => {
          try {
            set((state) => ({ loading: { ...state.loading, samples: true } }))
            const response = await samplesApi.create(sample)
            set((state) => ({ samples: [...state.samples, response.data] }))
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, samples: error.message } }))
            console.error('Error adding sample:', error)
          } finally {
            set((state) => ({ loading: { ...state.loading, samples: false } }))
          }
        },
        updateSample: async (id, sample) => {
          try {
            set((state) => ({ loading: { ...state.loading, samples: true } }))
            const response = await samplesApi.update(id, sample)
            set((state) => ({
              samples: state.samples.map((s) => (s.id === id ? response.data : s)),
            }))
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, samples: error.message } }))
            console.error('Error updating sample:', error)
          } finally {
            set((state) => ({ loading: { ...state.loading, samples: false } }))
          }
        },
        deleteSample: async (id) => {
          try {
            set((state) => ({ loading: { ...state.loading, samples: true } }))
            await samplesApi.delete(id)
            set((state) => ({
              samples: state.samples.filter((s) => s.id !== id),
            }))
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, samples: error.message } }))
            console.error('Error deleting sample:', error)
          } finally {
            set((state) => ({ loading: { ...state.loading, samples: false } }))
          }
        },
        
        // Test Actions
        fetchTests: async () => {
          try {
            set((state) => ({ loading: { ...state.loading, tests: true } }))
            const response = await testsApi.getAll()
            set({ tests: response.data })
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, tests: error.message } }))
            console.error('Error fetching tests:', error)
          } finally {
            set((state) => ({ loading: { ...state.loading, tests: false } }))
          }
        },
        addTest: async (test) => {
          try {
            set((state) => ({ loading: { ...state.loading, tests: true } }))
            const response = await testsApi.create(test)
            set((state) => ({ tests: [...state.tests, response.data] }))
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, tests: error.message } }))
            console.error('Error adding test:', error)
          } finally {
            set((state) => ({ loading: { ...state.loading, tests: false } }))
          }
        },
        updateTest: async (id, test) => {
          try {
            set((state) => ({ loading: { ...state.loading, tests: true } }))
            const response = await testsApi.update(id, test)
            set((state) => ({
              tests: state.tests.map((t) => (t.id === id ? response.data : t)),
            }))
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, tests: error.message } }))
            console.error('Error updating test:', error)
          } finally {
            set((state) => ({ loading: { ...state.loading, tests: false } }))
          }
        },
        deleteTest: async (id) => {
          try {
            set((state) => ({ loading: { ...state.loading, tests: true } }))
            await testsApi.delete(id)
            set((state) => ({
              tests: state.tests.filter((t) => t.id !== id),
            }))
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, tests: error.message } }))
            console.error('Error deleting test:', error)
          } finally {
            set((state) => ({ loading: { ...state.loading, tests: false } }))
          }
        },
        
        // Report Actions
        fetchReports: async () => {
          try {
            set((state) => ({ loading: { ...state.loading, reports: true } }))
            const response = await reportsApi.getAll()
            set({ reports: response.data })
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, reports: error.message } }))
            console.error('Error fetching reports:', error)
          } finally {
            set((state) => ({ loading: { ...state.loading, reports: false } }))
          }
        },
        addReport: async (report) => {
          try {
            set((state) => ({ loading: { ...state.loading, reports: true } }))
            const response = await reportsApi.create(report)
            set((state) => ({ reports: [...state.reports, response.data] }))
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, reports: error.message } }))
            console.error('Error adding report:', error)
          } finally {
            set((state) => ({ loading: { ...state.loading, reports: false } }))
          }
        },
        updateReport: async (id, report) => {
          try {
            set((state) => ({ loading: { ...state.loading, reports: true } }))
            const response = await reportsApi.update(id, report)
            set((state) => ({
              reports: state.reports.map((r) => (r.id === id ? response.data : r)),
            }))
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, reports: error.message } }))
            console.error('Error updating report:', error)
          } finally {
            set((state) => ({ loading: { ...state.loading, reports: false } }))
          }
        },
        deleteReport: async (id) => {
          try {
            set((state) => ({ loading: { ...state.loading, reports: true } }))
            await reportsApi.delete(id)
            set((state) => ({
              reports: state.reports.filter((r) => r.id !== id),
            }))
          } catch (err) {
            const error = err as Error
            set((state) => ({ error: { ...state.error, reports: error.message } }))
            console.error('Error deleting report:', error)
          } finally {
            set((state) => ({ loading: { ...state.loading, reports: false } }))
          }
        },
      }),
      {
        name: 'textile-lab-store',
      }
    )
  )
)
