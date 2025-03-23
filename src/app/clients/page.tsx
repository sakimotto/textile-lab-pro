'use client'

import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Client {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  activeTests: number
  status: 'Active' | 'Inactive'
}

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Company Name',
  },
  {
    accessorKey: 'contactPerson',
    header: 'Contact Person',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'activeTests',
    header: 'Active Tests',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {status}
        </span>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Client</DropdownMenuItem>
            <DropdownMenuItem>View Tests</DropdownMenuItem>
            <DropdownMenuItem>View Reports</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const data: Client[] = [
  {
    id: '1',
    name: 'FashionCo Industries',
    contactPerson: 'John Smith',
    email: 'john.smith@fashionco.com',
    phone: '+1 234-567-8901',
    activeTests: 3,
    status: 'Active',
  },
  {
    id: '2',
    name: 'Textile Innovations Ltd',
    contactPerson: 'Sarah Johnson',
    email: 'sarah.j@textileinnovations.com',
    phone: '+1 234-567-8902',
    activeTests: 1,
    status: 'Active',
  },
  {
    id: '3',
    name: 'EcoFabrics Co',
    contactPerson: 'Michael Brown',
    email: 'm.brown@ecofabrics.com',
    phone: '+1 234-567-8903',
    activeTests: 0,
    status: 'Inactive',
  },
  {
    id: '4',
    name: 'SportsTex International',
    contactPerson: 'Emma Wilson',
    email: 'emma.w@sportstex.com',
    phone: '+1 234-567-8904',
    activeTests: 2,
    status: 'Active',
  },
]

export default function ClientsPage() {
  const [clients] = useState<Client[]>(data)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{clients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {clients.filter((c) => c.status === 'Active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Active Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {clients.reduce((sum, client) => sum + client.activeTests, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={clients} searchColumn="name" />
        </CardContent>
      </Card>
    </div>
  )
}
