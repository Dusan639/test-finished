import React, { useState, useMemo } from 'react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { usersTableColumns } from './UsersTableColumns'
import styled from 'styled-components'
//UTILS
import { getPostsByUserId } from '../../utils/getPostsByUserId'
//COMPONENTS
import Pagination from '../Ui/Pagination'
import DeleteButton from '../Ui/buttons/DeleteButton'
import UserBlogPosts from './UserBlogPosts'
import { deleteBlogPostAsync } from '../../redux/blog/blogSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { AppDispatch } from '../../redux/store'
import { AnyAction } from '@reduxjs/toolkit'

interface User {
  id: number
  name: string
  email: string
  username: string
}

interface BlogPost {
  id: string
  title: string
  body: string
}

interface UsersTableProps {
  data: User[]
  onDelete: (id: number | string, name: string) => void
}

const TableContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`
const TableHolder = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHeader = styled.th`
  background-color: #f4f4f4;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`

const UsersTable: React.FC<UsersTableProps> = ({ data, onDelete }) => {
  const [pageIndex, setPageIndex] = useState(0)
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null)
  const [userPosts, setUserPosts] = useState<{ [key: number]: BlogPost[] }>({})
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null)
  const pageSize = 10

  const dispatch = useDispatch<AppDispatch>()

  const totalPages = Math.ceil(data.length / pageSize)
  const paginatedData = useMemo(() => {
    return data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
  }, [data, pageIndex, pageSize])

  const table = useReactTable({
    data: paginatedData,
    columns: usersTableColumns,
    getCoreRowModel: getCoreRowModel()
  })

  const toggleUserExpansion = async (userId: number) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null)
      return
    }

    setExpandedUserId(userId)

    if (!userPosts[userId]) {
      const posts = await getPostsByUserId(userId)
      setUserPosts((prev) => ({ ...prev, [userId]: posts }))
    }
  }

  const handleDelete = async (id: number, name: string) => {
    setDeletingUserId(id)

    await onDelete(id, name)

    setDeletingUserId(null)
  }

  const handleDeleteBlogPost = async (postId: string, userId: number, event: React.MouseEvent) => {
    event.stopPropagation()

    setDeletingUserId(parseInt(postId))

    try {
      await dispatch(deleteBlogPostAsync({ userId, postId }) as unknown as AnyAction).unwrap()

      setUserPosts((prevUserPosts) => ({
        ...prevUserPosts,
        [userId]: prevUserPosts[userId].filter((post) => post.id !== postId)
      }))

      toast.success('Blog post deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete blog post!')
    } finally {
      setDeletingUserId(null)
    }
  }

  return (
    <TableContainer>
      <p>Total Users: {data.length}</p>
      <p>Click on User's row to see blog posts.</p>
      <TableHolder>
        <StyledTable>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeader key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow onClick={() => toggleUserExpansion(row.original.id)}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DeleteButton
                      onClick={(event) => {
                        event.stopPropagation()
                        handleDelete(row.original.id, row.original.name)
                      }}
                      isLoading={deletingUserId === row.original.id}
                    />
                  </TableCell>
                </TableRow>
                {expandedUserId === row.original.id && (
                  <tr>
                    <UserBlogPosts
                      userId={row.original.id}
                      userPosts={userPosts}
                      deletingUserId={deletingUserId}
                      handleDeleteBlogPost={handleDeleteBlogPost}
                    />
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </StyledTable>
      </TableHolder>
      <Pagination totalPages={totalPages} pageIndex={pageIndex} setPageIndex={setPageIndex} />
    </TableContainer>
  )
}

export default UsersTable
