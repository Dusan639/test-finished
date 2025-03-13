import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteBlogPost, addBlogPost, editBlogPost, BlogPost } from '../../data/data'
import { RootState } from '../store'
import { addBlogPostToLocalStorage } from '../../utils/addPostToLocalStorage'
import { deleteBlogPostFromLocalStorage } from '../../utils/deletePostFromLocalStorage'
import { editBlogPostInLocalStorage } from '../../utils/editPostInLocalStorage'

export const addBlogPostAsync = createAsyncThunk(
  'blog/addBlogPost',
  async (newPost: Omit<BlogPost, 'id'>, { rejectWithValue }) => {
    try {
      const newPostWithId = await addBlogPost({
        id: crypto.randomUUID(),
        ...newPost
      })

      addBlogPostToLocalStorage(newPostWithId.userId, newPostWithId)

      return newPostWithId
    } catch (error) {
      return rejectWithValue('Failed to add blog post')
    }
  }
)

export const deleteBlogPostAsync = createAsyncThunk(
  'blog/deleteBlogPost',
  async ({ userId, postId }: { userId: number; postId: string }) => {
    await deleteBlogPost(postId)

    deleteBlogPostFromLocalStorage(userId, postId)

    return { userId, postId }
  }
)

export const updateBlogPost = createAsyncThunk(
  'blog/updateBlogPost',
  async (updatedPost: BlogPost) => {
    const response = await editBlogPost(updatedPost.id, updatedPost)

    editBlogPostInLocalStorage(updatedPost.userId, updatedPost)

    return response
  }
)

export interface BlogState {
  blogPosts: BlogPost[]
}

const initialState: BlogState = {
  blogPosts: []
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBlogPostAsync.fulfilled, (state, action: PayloadAction<BlogPost>) => {
        state.blogPosts.unshift(action.payload)
      })
      .addCase(
        deleteBlogPostAsync.fulfilled,
        (state, action: PayloadAction<{ userId: number; postId: string }>) => {
          state.blogPosts = state.blogPosts.filter((post) => post.id !== action.payload.postId)
        }
      )
      .addCase(updateBlogPost.fulfilled, (state, action: PayloadAction<BlogPost>) => {
        const index = state.blogPosts.findIndex((post) => post.id === action.payload.id)
        if (index !== -1) {
          state.blogPosts[index] = action.payload
        }
      })
  }
})

export default blogSlice.reducer
export const selectBlogPosts = (state: RootState) => state.blog.blogPosts
