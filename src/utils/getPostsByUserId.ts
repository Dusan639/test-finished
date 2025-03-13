import { BlogPost, getMembers } from '../data/data'

export const getPostsByUserId = async (userId: number): Promise<BlogPost[]> => {
  const savedPosts = JSON.parse(localStorage.getItem(`userBlogs_${userId}`) || 'null')

  if (savedPosts) {
    return savedPosts
  }

  const allPosts = await getMembers()
  const userPosts = allPosts.filter((post: BlogPost) => post.userId === userId)

  localStorage.setItem(`userBlogs_${userId}`, JSON.stringify(userPosts))

  return userPosts
}
