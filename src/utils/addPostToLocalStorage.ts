export const addBlogPostToLocalStorage = (userId: number, newPost: any) => {
  const storageKey = `userBlogs_${userId}`
  const userPosts = JSON.parse(localStorage.getItem(storageKey) || '[]')

  userPosts.unshift(newPost)

  localStorage.setItem(storageKey, JSON.stringify(userPosts))
}
