import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import authAPI from '../api/authAPI'
import { RootState, AppThunk } from '../store'

const accessToken = localStorage.getItem('access_token')
const user = JSON.parse(localStorage.getItem('user') || '{}')

export type User = {
  UserToken: {
    user_token: string
  }
}

export interface AuthState {
  isLoggedIn: boolean
  accessToken: string
  user: User | null
}

const initialState: AuthState =
  Object.keys(user).length && accessToken
    ? {
        isLoggedIn: true,
        accessToken: accessToken,
        user: user,
      }
    : {
        isLoggedIn: false,
        accessToken: '',
        user: null,
      }

export const login = createAsyncThunk(
  'auth/login',
  async (login: { username: string; password: string }, thunkAPI) => {
    if (!localStorage.getItem('access_token')) {
      await authAPI.fetchAuthorization()
    }
    const response = await authAPI.loginUser(
      login.username,
      login.password,
      localStorage.getItem('access_token') || ''
    )
    return {
      accessToken: localStorage.getItem('access_token') || '',
      user: response.data,
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
        localStorage.setItem('access_token', action.payload.accessToken)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        state.accessToken = action.payload.accessToken
        state.isLoggedIn = true
        state.user = action.payload.user
      }
    )
  },
})

export const { logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
