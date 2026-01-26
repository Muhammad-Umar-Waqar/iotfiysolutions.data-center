// ackitSlice.js

// src/slices/ackitSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

/* Thunks */
export const fetchAllAckits = createAsyncThunk(
  "ackit/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/ackit/all`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch ackits");

      // controller returns { message, total, data: ackits }
      return data.data ?? data.ackits ?? [];
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

export const fetchAckitById = createAsyncThunk(
  "ackit/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");
      const res = await fetch(`${BASE}/ackit/single/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch ackit");
      return data.data ?? data.ackit ?? null;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

export const createAckit = createAsyncThunk(
  "ackit/create",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/ackit/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to create ackit");

      return data.data ?? data.ackit ?? data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

export const updateAckit = createAsyncThunk(
  "ackit/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/ackit/update/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to update ackit");

      return data.data ?? data.ackit ?? data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

export const deleteAckit = createAsyncThunk(
  "ackit/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/ackit/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to delete ackit");

      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);


export const fetchAckitsByDataCenter = createAsyncThunk(
  "ackit/fetchByDataCenter",
  async (dataCenterId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/ackit/datacenter/${dataCenterId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch ackits");

      return data.data ?? data.ackits ?? [];
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

/* Slice */
const ackitSlice = createSlice({
  name: "ackit",
  initialState: {
    ackits: [],
    loading: {
      fetch: false,
      submit: false,
      update: false,
      delete: false,
    },
    error: {
      fetch: null,
      submit: null,
      update: null,
      delete: null,
    },
  },
  reducers: {
    setAckits(state, action) {
      state.ackits = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchAllAckits.pending, (s) => {
        s.loading.fetch = true;
        s.error.fetch = null;
      })
      .addCase(fetchAllAckits.fulfilled, (s, a) => {
        s.loading.fetch = false;
        s.ackits = Array.isArray(a.payload) ? a.payload : [];
      })
      .addCase(fetchAllAckits.rejected, (s, a) => {
        s.loading.fetch = false;
        s.error.fetch = a.payload || a.error?.message || "Failed to fetch ackits";
        s.ackits = [];
      })

      // fetch single
      .addCase(fetchAckitById.pending, (s) => {
        s.loading.fetch = true;
        s.error.fetch = null;
      })
      .addCase(fetchAckitById.fulfilled, (s, a) => {
        s.loading.fetch = false;
        if (a.payload) s.ackits = [a.payload];
      })
      .addCase(fetchAckitById.rejected, (s, a) => {
        s.loading.fetch = false;
        s.error.fetch = a.payload || a.error?.message || "Failed to fetch ackit";
      })

      // create
      .addCase(createAckit.pending, (s) => {
        s.loading.submit = true;
        s.error.submit = null;
      })
      .addCase(createAckit.fulfilled, (s, a) => {
        s.loading.submit = false;
        s.ackits = [a.payload, ...s.ackits];
      })
      .addCase(createAckit.rejected, (s, a) => {
        s.loading.submit = false;
        s.error.submit = a.payload || a.error?.message || "Failed to create ackit";
      })

      // update
      .addCase(updateAckit.pending, (s) => {
        s.loading.update = true;
        s.error.update = null;
      })
      .addCase(updateAckit.fulfilled, (s, a) => {
        s.loading.update = false;
        const updated = a.payload;
        if (updated && updated._id) {
          s.ackits = s.ackits.map((x) => (String(x._id) === String(updated._id) ? updated : x));
        }
      })
      .addCase(updateAckit.rejected, (s, a) => {
        s.loading.update = false;
        s.error.update = a.payload || a.error?.message || "Failed to update ackit";
      })

      // delete
      .addCase(deleteAckit.pending, (s) => {
        s.loading.delete = true;
        s.error.delete = null;
      })
      .addCase(deleteAckit.fulfilled, (s, a) => {
        s.loading.delete = false;
        s.ackits = s.ackits.filter((x) => String(x._id) !== String(a.payload));
      })
      .addCase(deleteAckit.rejected, (s, a) => {
        s.loading.delete = false;
        s.error.delete = a.payload || a.error?.message || "Failed to delete ackit";
      })
      .addCase(fetchAckitsByDataCenter.pending, (s) => {
        s.loading.fetch = true;
        s.error.fetch = null;
      })
      .addCase(fetchAckitsByDataCenter.fulfilled, (s, a) => {
        s.loading.fetch = false;
        s.ackits = Array.isArray(a.payload) ? a.payload : [];
      })
      .addCase(fetchAckitsByDataCenter.rejected, (s, a) => {
        s.loading.fetch = false;
        s.error.fetch =
          a.payload || a.error?.message || "Failed to fetch ackits by data center";
        s.ackits = [];
      })

  },
});

export const { setAckits } = ackitSlice.actions;
export default ackitSlice.reducer;
