export const editBlogPostInLocalStorage = (userId: number, updatedPost: any) => {
  const storageKey = `userBlogs_${userId}`
  const userPosts = JSON.parse(localStorage.getItem(storageKey) || '[]')

  const updatedPosts = userPosts.map((post: any) =>
    post.id === updatedPost.id ? updatedPost : post
  )

  localStorage.setItem(storageKey, JSON.stringify(updatedPosts))
}
