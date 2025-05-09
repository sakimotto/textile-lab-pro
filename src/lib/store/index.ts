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
  testIds: string[]
  generatedDate: string
}

interface Equipment {
  isOperational: boolean
  lastCalibrated: string
}

interface Queue {
  count: number
  progress: number
  averageProcessingHours: number
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
  equipment: Equipment
  queue: Queue
  
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
      (set, get) => ({
        // Initial State
        theme: 'light',
        sidebarOpen: true,
        
        // Initialize with mock data for development
        clients: [
          { id: '1', name: 'DenimCo', contactPerson: 'John Doe', email: 'john@denimco.com', phone: '123-456-7890', activeTests: 2, status: 'Active' },
          { id: '2', name: 'TechWear', contactPerson: 'Jane Smith', email: 'jane@techwear.com', phone: '098-765-4321', activeTests: 3, status: 'Active' },
          { id: '3', name: 'SustainableFabrics', contactPerson: 'Emma Green', email: 'emma@sustainablefabrics.com', phone: '555-123-4567', activeTests: 1, status: 'Active' },
          { id: '4', name: 'SafetyFirst', contactPerson: 'Robert Shield', email: 'robert@safetyfirst.com', phone: '888-555-1212', activeTests: 1, status: 'Active' },
          { id: '5', name: 'FashionForward', contactPerson: 'Sophia Style', email: 'sophia@fashionforward.com', phone: '777-888-9999', activeTests: 1, status: 'Active' },
          { id: '6', name: 'LuxuryTextiles', contactPerson: 'Alexander Silk', email: 'alex@luxurytextiles.com', phone: '444-333-2222', activeTests: 1, status: 'Active' },
        ],
        samples: [
          {
            id: 'S001',
            name: 'Cotton Twill - Blue',
            clientName: 'DenimCo',
            type: 'Fabric',
            submissionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'In Testing'
          },
          {
            id: 'S002',
            name: 'Polyester Blend - Black',
            clientName: 'TechWear',
            type: 'Fabric',
            submissionDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Pending'
          },
          {
            id: 'S003',
            name: 'Linen - Natural',
            clientName: 'SustainableFabrics',
            type: 'Fabric',
            submissionDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Completed'
          },
          {
            id: 'S004',
            name: 'Nylon - Fire Retardant',
            clientName: 'SafetyFirst',
            type: 'Fabric',
            submissionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Failed'
          },
          {
            id: 'S005',
            name: 'Cotton Jersey - Striped',
            clientName: 'FashionForward',
            type: 'Fabric',
            submissionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'In Testing'
          },
          {
            id: 'S006',
            name: 'Silk - Printed',
            clientName: 'LuxuryTextiles',
            type: 'Fabric',
            submissionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Pending'
          }
        ],
        tests: [],
        reports: [
          {
            id: '1',
            name: 'Colorfastness Report',
            type: 'Colorfastness',
            status: 'Draft',
            testIds: ['1', '2'],
            generatedDate: new Date().toISOString()
          }
        ],
        equipment: {
          isOperational: true,
          lastCalibrated: new Date().toISOString()
        },
        queue: {
          count: 12,
          progress: 65,
          averageProcessingHours: 24
        },
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
          console.log('[DEBUG] Using mock test data');
          try {
            set((state) => ({ loading: { ...state.loading, tests: true } }));
            // Mock data that matches the Test interface
            const mockTests = [
              {
                id: '1',
                name: 'Colorfastness to Washing - ISO 105-C06',
                sampleId: 'S001',
                type: 'ColorFastness',
                status: 'In Progress',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                priority: 'High',
                notes: 'Testing color retention after 5 wash cycles'
              },
              {
                id: '2',
                name: 'Abrasion Resistance - ASTM D4966',
                sampleId: 'S002',
                type: 'Abrasion',
                status: 'Pending',
                dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
                priority: 'Normal',
                notes: 'Martindale method for abrasion resistance'
              },
              {
                id: '3',
                name: 'Tensile Strength - ISO 13934-1',
                sampleId: 'S003',
                type: 'Tensile',
                status: 'Completed',
                dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                priority: 'Normal',
                notes: 'Strip method for maximum force determination'
              },
              {
                id: '4',
                name: 'Flammability Test - 16 CFR 1610',
                sampleId: 'S004',
                type: 'Flammability',
                status: 'Failed',
                dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                priority: 'Urgent',
                notes: 'Standard test method for flammability of clothing textiles'
              },
              {
                id: '5',
                name: 'Dimensional Stability - ISO 5077',
                sampleId: 'S005',
                type: 'Dimensional',
                status: 'In Progress',
                dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
                priority: 'High',
                notes: 'Testing for shrinkage after washing and drying'
              },
              {
                id: '6',
                name: 'Color Fastness to Light - ISO 105-B02',
                sampleId: 'S006',
                type: 'ColorFastness',
                status: 'Pending',
                dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
                priority: 'Normal',
                notes: 'Xenon arc fading lamp test'
              }
            ];
            set({
              tests: mockTests,
              loading: { ...get().loading, tests: false },
              error: { ...get().error, tests: null }
            });
            console.log('[DEBUG] Mock tests loaded:', mockTests);
          } catch (error) {
            set({
              error: { ...get().error, tests: 'Failed to load tests' },
              loading: { ...get().loading, tests: false }
            });
            console.error('[ERROR] Failed to load tests:', error);
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
          console.log('[DEBUG] Using mock report data');
          try {
            set({ loading: { ...get().loading, reports: true } });
            const mockReports = [
              {
                id: '1',
                name: 'Quarterly Analysis Q1',
                type: 'Quarterly',
                status: 'Final',
                testIds: ['1', '2'],
                generatedDate: new Date().toISOString()
              },
              {
                id: '2',
                name: 'Compliance Report',
                type: 'Compliance',
                status: 'Draft',
                testIds: ['1'],
                generatedDate: new Date().toISOString()
              }
            ];
            set({
              reports: mockReports,
              loading: { ...get().loading, reports: false },
              error: { ...get().error, reports: null }
            });
            console.log('[DEBUG] Mock reports loaded:', mockReports);
          } catch (error) {
            set({
              error: { ...get().error, reports: 'Failed to load reports' },
              loading: { ...get().loading, reports: false }
            });
            console.error('[ERROR] Failed to load reports:', error);
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
