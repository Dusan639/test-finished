import React from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
//COMPONENTS
import AddBlogPostForm from '../components/Blog/AddBlogPostForm'

const AddBlogPostPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()

  if (!userId) {
    return <p>Error: User ID is missing!</p>
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <AddBlogPostForm userId={Number(userId)} />
    </>
  )
}

export default AddBlogPostPage
