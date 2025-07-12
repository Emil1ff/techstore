import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { AuthState, User } from "@/types"

const API_URL = "https://673a25baa3a36b5a62f0de6a.mockapi.io/Popular-Games"

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch(API_URL)
    const users = await response.json()
    const user = users.find((u: User) => u.email === email && u.password === password)

    if (!user) {
      throw new Error("Invalid credentials")
    }

    return user
  },
)

export const registerUser = createAsyncThunk("auth/register", async (userData: Omit<User, "id">) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...userData,
      wishlist: [],
      cart: [],
    }),
  })

  if (!response.ok) {
    throw new Error("Registration failed")
  }

  return await response.json()
})

export const updateUser = createAsyncThunk("auth/update", async (userData: Partial<User> & { id: string }) => {
  const response = await fetch(`${API_URL}/${userData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error("Update failed")
  }

  return await response.json()
})

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
    clearError: (state) => {
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
