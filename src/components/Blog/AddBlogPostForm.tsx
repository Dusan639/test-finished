import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { addBlogPostAsync } from '../../redux/blog/blogSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
//COMPONENTS
import PrimaryButton from '../Ui/buttons/PrimaryButton'

const FormContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
`

const ButtonContainer = styled.div`
  margin-top: 16px;
`

const Button = styled.button`
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;

  &:hover {
    background: #0056b3;
  }
`

interface AddBlogPostFormProps {
  userId: number
}

const AddBlogPostForm: React.FC<AddBlogPostFormProps> = ({ userId }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) {
      toast.error('Title and body are required!')
      return
    }

    setLoading(true)

    try {
      await dispatch(
        addBlogPostAsync({
          userId,
          title,
          body,
          datePosted: new Date().toISOString()
        })
      ).unwrap()

      toast.success('Blog post added successfully!')
      navigate(-1)
    } catch (error) {
      toast.error('Failed to add blog post.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormContainer>
      <h2>Add New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="Post Content"
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Post'}
        </Button>
      </form>
      <ButtonContainer>
        <PrimaryButton onClick={() => window.history.back()}>Go Back</PrimaryButton>
      </ButtonContainer>
    </FormContainer>
  )
}

export default AddBlogPostForm
