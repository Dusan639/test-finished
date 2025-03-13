import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
//COMPONENTS
import BlogCard from '../Ui/BlogCard'
import LoadingSpinner from '../Ui/LoadingSpinner'
import DeleteButton from '../Ui/buttons/DeleteButton'
import PrimaryButton from '../Ui/buttons/PrimaryButton'

const BlogPostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  background: #f9f9f9;
`

const BlogPostsHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 15px;
`

interface BlogPost {
  id: string
  title: string
  body: string
}

interface UserBlogPostsProps {
  userId: number
  userPosts: { [key: number]: BlogPost[] }
  deletingUserId: number | null
  handleDeleteBlogPost: (postId: string, userId: number, event: React.MouseEvent) => void
}

const UserBlogPosts: React.FC<UserBlogPostsProps> = ({
  userId,
  userPosts,
  deletingUserId,
  handleDeleteBlogPost
}) => {
  const navigate = useNavigate()

  return (
    <td colSpan={4}>
      <BlogPostsHeadingContainer>
        <h4>Blog Posts</h4>
        <PrimaryButton onClick={() => navigate(`/add-blog/${userId}`)}>
          Add new blog post
        </PrimaryButton>
      </BlogPostsHeadingContainer>
      <BlogPostsContainer>
        {userPosts[userId] ? (
          userPosts[userId].length > 0 ? (
            <BlogPostsContainer>
              {userPosts[userId].map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  userId={userId}
                >
                  <DeleteButton
                    onClick={(event) => handleDeleteBlogPost(post.id, userId, event)}
                    isLoading={deletingUserId === parseInt(post.id)}
                  />
                </BlogCard>
              ))}
            </BlogPostsContainer>
          ) : (
            <p>No blog posts available.</p>
          )
        ) : (
          <LoadingSpinner />
        )}
      </BlogPostsContainer>
    </td>
  )
}

export default UserBlogPosts
