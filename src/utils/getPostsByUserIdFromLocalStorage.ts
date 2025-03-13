export const getPostsByUserIdFromLocalStorage = (userId: number) => {
  const storageKey = `userBlogs_${userId}`
  const storedPosts = localStorage.getItem(storageKey)

  if (storedPosts) {
    return JSON.parse(storedPosts)
  }
  console.log(userId)
  return []
}
