import { ColumnDef } from '@tanstack/react-table'

interface User {
  id: number
  name: string
  email: string
  username: string
}

export const usersTableColumns: ColumnDef<User>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'username', header: 'Username' }
]
