// src/slices/UserSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
const token = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token()}`,
});

/* ================= AUTH FLOW ================= */

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      localStorage.setItem("token", data.token);
      return data.user;
    } catch {
      return rejectWithValue("Login failed");
    }
  }
);

export const verifyMe = createAsyncThunk("auth/verify", async () => {
  const res = await fetch(`${BASE}/auth/verify`, {
    headers: headers(),
    credentials: "include",
  });
  return res.json();
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await fetch(`${BASE}/auth/logout`, {
    headers: headers(),
    credentials: "include",
  });
  localStorage.removeItem("token");
});

/* ================= USER CREATION ================= */

export const createUser = createAsyncThunk(
  "users/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE}/auth/register`, {
        method: "POST",
        headers: headers(),
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return data.user;
    } catch {
      return rejectWithValue("Create failed");
    }
  }
);

/* ================= USER FETCHING ================= */

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE}/users/all`, {
        headers: headers(),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      console.log("res>from:user>", res);
      return data;
    } catch {
      return rejectWithValue("Fetch failed");
    }
  }
);

export const fetchUsersByCreator = createAsyncThunk(
  "users/fetchByCreator",
  async (creatorId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE}/users/${creatorId}`, {
        headers: headers(),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return data.users;
    } catch {
      return rejectWithValue("Fetch failed");
    }
  }
);

/* ================= USER ACTIONS ================= */

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, payload }, { rejectWithValue }) => {
     console.log("FormData>", payload)
    const res = await fetch(`${BASE}/users/update/${id}`, {
      method: "PUT",
      headers: headers(),
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return rejectWithValue(data.message);
    console.log("data>>>", data)
    return data.user;
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    const res = await fetch(`${BASE}/users/delete/${id}`, {
      method: "DELETE",
      headers: headers(),
      credentials: "include",
    });
    if (!res.ok) return rejectWithValue("Delete failed");
    return id;
  }
);

export const updateUserStatus = createAsyncThunk(
  "users/status",
  async ({ id, isActive, suspensionReason }, { rejectWithValue }) => {
    const res = await fetch(`${BASE}/users/update-status/${id}`, {
      method: "PUT",
      headers: headers(),
      credentials: "include",
      body: JSON.stringify({ isActive, suspensionReason }),
    });
    const data = await res.json();
    if (!res.ok) return rejectWithValue(data.message);
    return data.user;
  }
);

/* ================= SLICE ================= */

const UserSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    Users: [],
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(loginUser.fulfilled, (s, a) => { s.currentUser = a.payload; })
      .addCase(verifyMe.fulfilled, (s, a) => { s.currentUser = a.payload.user; })
      .addCase(logoutUser.fulfilled, (s) => { s.currentUser = null; s.list = []; })

      .addCase(fetchAllUsers.fulfilled, (s, a) => { s.list = a.payload; })
      .addCase(fetchUsersByCreator.fulfilled, (s, a) => { s.list = a.payload; })

      .addCase(createUser.fulfilled, (s, a) => { s.list.unshift(a.payload); })

      .addCase(updateUser.fulfilled, (s, a) => {
        s.list = s.list.map(u => u._id === a.payload._id ? a.payload : u);
      })

      .addCase(deleteUser.fulfilled, (s, a) => {
        s.list = s.list.filter(u => u._id !== a.payload);
      })

      .addCase(updateUserStatus.fulfilled, (s, a) => {
        s.list = s.list.map(u => u._id === a.payload._id ? a.payload : u);
      });
  },
});

export default UserSlice.reducer;
