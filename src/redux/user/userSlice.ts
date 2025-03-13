import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUsers, deleteUser, User } from '../../data/data'
import { RootState } from '../store'

const loadUsersFromLocalStorage = (): UserState => {
  const savedUsers = localStorage.getItem('users')
  return savedUsers ? JSON.parse(savedUsers) : { userList: [] }
}

const saveUsersToLocalStorage = (users: UserState) => {
  localStorage.setItem('users', JSON.stringify(users))
}

export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async () => {
  return getUsers()
})

export const deleteUserAsync = createAsyncThunk('users/deleteUser', async (userId: number) => {
  await deleteUser(userId)
  return userId
})

export interface UserState {
  userList: User[]
}

const initialState: UserState = loadUsersFromLocalStorage()

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.userList = payload
        saveUsersToLocalStorage(state)
      })
      .addCase(deleteUserAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.userList = state.userList.filter((user) => user.id !== action.payload)
        saveUsersToLocalStorage(state)
      })
  }
})

export default userSlice.reducer
export const selectUsers = (state: RootState) => state.user.userList
