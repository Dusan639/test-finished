import React from 'react'
import { ToastContainer } from 'react-toastify'
//COMPONENTS
import BlogPostLayout from '../components/Blog/BlogPostLayout'

const BlogPage = () => {
  return (
    <>
      <main className="wrapper">
        <section id="blog-post">
          <BlogPostLayout />
        </section>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default BlogPage
