export const deleteBlogPostFromLocalStorage = (userId: number, postId: string) => {
  const storageKey = `userBlogs_${userId}`

  if (!localStorage.getItem(storageKey)) {
    console.warn(`No blog posts found for user ${userId} in localStorage`)
    return
  }

  const userPosts = JSON.parse(localStorage.getItem(storageKey) || '[]')

  console.log('Before Deletion - userPosts:', userPosts)

  const updatedPosts = userPosts.filter((post: any) => post.id !== postId)

  console.log('After Deletion - updatedPosts:', updatedPosts)

  localStorage.setItem(storageKey, JSON.stringify(updatedPosts))
}
