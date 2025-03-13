import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { deleteBlogPostAsync, updateBlogPost } from '../../redux/blog/blogSlice'
import styled from 'styled-components'
import { BlogPost, getMembers, getUsers } from '../../data/data'
import { toast } from 'react-toastify'
//UTILS
import { getPostsByUserIdFromLocalStorage } from '../../utils/getPostsByUserIdFromLocalStorage'
//COMPONENTS
import LoadingSpinner from '../Ui/LoadingSpinner'
import DeleteButton from '../Ui/buttons/DeleteButton'
import PrimaryButton from '../Ui/buttons/PrimaryButton'

const BlogContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const BlogTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`

const BlogBody = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-top: 24px;
`

const BlogMeta = styled.p`
  font-size: 14px;
  color: #777;
  margin-top: 10px;
`

const InputField = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  margin-top: 5px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`

const BlogPostLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const storedPost = useSelector((state: RootState) =>
    state.blog.blogPosts.find((post) => post.id === id)
  )
  const navigate = useNavigate()

  const [blogPost, setBlogPost] = useState<any>(storedPost || null)
  const [author, setAuthor] = useState<{ first_name: string; last_name: string } | null>(null)
  const [loading, setLoading] = useState(!storedPost)
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState('')
  const [updatedBody, setUpdatedBody] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return

      let foundPost: BlogPost | undefined

      if (storedPost) {
        foundPost = storedPost
      } else {
        let userIdFromLocalStorage = localStorage.getItem('lastViewedUserId')
        let userId = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage, 10) : 0

        if (userId) {
          const storedPosts = getPostsByUserIdFromLocalStorage(userId)
          foundPost = storedPosts.find((post: BlogPost) => post.id === id)
        }

        if (!foundPost) {
          const posts = await getMembers()
          foundPost = posts.find((post) => post.id === id)

          if (foundPost) {
            const users = await getUsers()
            const authorData = users.find((user) => user.id === foundPost?.userId)
            if (authorData) {
              setAuthor({ first_name: authorData.first_name, last_name: authorData.last_name })
            }
          }
        }
      }

      if (foundPost) {
        setBlogPost(foundPost)
        setUpdatedTitle(foundPost.title)
        setUpdatedBody(foundPost.body)
      }

      setLoading(false)
    }

    fetchPost()
  }, [id, storedPost])

  const handleSave = async () => {
    if (!blogPost) return

    setSaving(true)
    try {
      const lastEdited = new Date().toISOString()

      const updatedPost = {
        ...blogPost,
        title: updatedTitle,
        body: updatedBody,
        lastEdited
      }

      dispatch(updateBlogPost(updatedPost))

      setBlogPost(updatedPost)
      setEditing(false)
      toast.success('Blog post successfully edited!')
    } catch (error) {
      console.error('Error saving blog post:', error)
    }
    setSaving(false)
  }

  const handleDeletePost = async () => {
    if (!blogPost) return

    setDeleting(true)

    try {
      if (!blogPost || !blogPost.userId) {
        console.error('No valid user ID!', blogPost)
        return
      }

      await dispatch(deleteBlogPostAsync({ userId: blogPost.userId, postId: blogPost.id })).unwrap()
      toast.success('Blog post successfully deleted!')
      navigate('/')
    } catch (error) {
      toast.error('Failed to delete blog post!')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (!blogPost) return <p>Blog post not found.</p>

  const formattedDate = new Date(blogPost.datePosted).toLocaleDateString('en-GB')
  const formattedEditedDate = blogPost.lastEdited
    ? new Date(blogPost.lastEdited).toLocaleString()
    : 'Never'

  return (
    <article>
      <BlogContainer>
        {editing ? (
          <InputField value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
        ) : (
          <BlogTitle>{updatedTitle ? updatedTitle : blogPost.title}</BlogTitle>
        )}

        <BlogMeta>
          <strong>Author:</strong> {author ? `${author.first_name} ${author.last_name}` : 'Unknown'}
        </BlogMeta>
        <BlogMeta>
          <strong>Published:</strong> {formattedDate}
        </BlogMeta>
        <BlogMeta>
          <strong>Last Edited:</strong> {formattedEditedDate}
        </BlogMeta>

        {editing ? (
          <InputField
            as="textarea"
            rows={5}
            value={updatedBody}
            onChange={(e) => setUpdatedBody(e.target.value)}
          />
        ) : (
          <BlogBody>{blogPost.body}</BlogBody>
        )}

        <ButtonContainer>
          {editing ? (
            <>
              <PrimaryButton onClick={handleSave} isLoading={saving}>
                Save
              </PrimaryButton>
              <PrimaryButton onClick={() => setEditing(false)} variant="danger">
                Cancel
              </PrimaryButton>
            </>
          ) : (
            <PrimaryButton onClick={() => setEditing(true)}>Edit</PrimaryButton>
          )}
          <PrimaryButton onClick={() => window.history.back()}>Go Back</PrimaryButton>
          <DeleteButton onClick={handleDeletePost} isLoading={deleting} />
        </ButtonContainer>
      </BlogContainer>
    </article>
  )
}

export default BlogPostLayout
