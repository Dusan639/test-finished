import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, deleteUserAsync } from '../../redux/user/userSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// COMPONENTS
import UsersTable from './UsersTable'
import LoadingSpinner from '../Ui/LoadingSpinner'

const TableLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.user.userList)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers() as any)
    }
    setLoading(false)
  }, [dispatch, users])

  const handleDelete = async (id: number | string, name: string) => {
    try {
      await dispatch(deleteUserAsync(id as number)).unwrap()
      toast.success(`User ${name} has been deleted successfully!`)
    } catch (error) {
      toast.error('Failed to delete user!')
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    username: user.first_name.toLowerCase()
  }))

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <UsersTable data={formattedUsers} onDelete={handleDelete} />
    </>
  )
}

export default TableLayout
