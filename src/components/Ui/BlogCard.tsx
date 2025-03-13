import React from 'react'
import styled from 'styled-components'
import { truncateText } from '../../utils/truncateText'
import { useNavigate } from 'react-router-dom'

const BlogCardContainer = styled.div`
  display: block;
  min-width: calc(33.333% - 10px);
  flex: 1;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: black;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`

const BlogTitle = styled.h5`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`

const BlogBody = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #555;
`

interface BlogCardProps {
  id: string
  userId: number
  title: string
  body: string
  children: React.ReactNode
}

const BlogCard: React.FC<BlogCardProps> = ({ id, userId, title, body, children }) => {
  const navigate = useNavigate()

  const handleNavigation = () => {
    localStorage.setItem('lastViewedUserId', userId.toString())
    navigate(`/blog/${id}`)
  }

  return (
    <BlogCardContainer onClick={handleNavigation}>
      <BlogTitle>{truncateText(title, 20)}</BlogTitle>
      <BlogBody>{truncateText(body, 20)}</BlogBody>
      {children}
    </BlogCardContainer>
  )
}

export default BlogCard
