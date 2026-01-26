// src/slices/rackSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

/* ------------------------------------ */
/*               Thunks                 */
/* ------------------------------------ */

// fetch all racks
export const fetchAllRacks = createAsyncThunk(
  "racks/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack/all`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch racks");

      return data.racks || [];
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// fetch single rack by id
export const fetchRackById = createAsyncThunk(
  "racks/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack/single/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch rack");

      return data.rack || null;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// create rack
export const createRack = createAsyncThunk(
  "racks/create",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to create rack");

      return data.rack;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// update rack
export const updateRack = createAsyncThunk(
  "racks/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack/update/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to update rack");

      return data.rack;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// delete rack
export const deleteRack = createAsyncThunk(
  "racks/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to delete rack");

      return id; // return deleted id for reducer
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// fetch racks by cluster id
export const fetchRacksByClusterId = createAsyncThunk(
  "racks/fetchByClusterId",
  async (clusterId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack/by-cluster/${clusterId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok)
        return rejectWithValue(
          data.message || "Failed to fetch racks by cluster"
        );

      return data.racks || [];
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// fetch racks by data center id
export const fetchRacksByDataCenterId = createAsyncThunk(
  "racks/fetchByDataCenterId",
  async (dataCenterId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack/by-datacenter/${dataCenterId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok)
        return rejectWithValue(
          data.message || "Failed to fetch racks by data center"
        );

      return data.racks || [];
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);


/* ------------------------------------ */
/*               Slice                  */
/* ------------------------------------ */

const rackSlice = createSlice({
  name: "rack",
  initialState: {
    racks: [],
    selectedRack: null,
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
    setRacks(state, action) {
      state.racks = action.payload;
    },
      clearSelectedRack(state) {
    state.selectedRack = null;
  },
  clearRacks(state) {
  state.racks = [];
  state.selectedRack = null;
}

  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchAllRacks.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchAllRacks.fulfilled, (state, action) => {
        state.loading.fetch = false;
        // state.racks = Array.isArray(action.payload) ? action.payload : [];
        // merge-friendly update (for fetch by dataCenter or by cluster)
const incoming = Array.isArray(action.payload) ? action.payload : [];
// create a map of existing racks by _id
const existingById = new Map(state.racks.map(r => [String(r._id), r]));

// produce merged array keeping stable objects when unchanged
const merged = incoming.map(r => {
  const id = String(r._id);
  const prev = existingById.get(id);
  if (!prev) return r; // new item
  // shallow field merge - keep prev reference when nothing changed
  // compare important fields (or you can do shallow compare of keys)
  const changed = Object.keys(r).some(k => {
    // treat undefined same as missing
    return String(prev[k]) !== String(r[k]);
  });
  return changed ? { ...prev, ...r } : prev;
});

state.racks = merged;

      })
      .addCase(fetchAllRacks.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload || action.error?.message || "Failed to fetch racks";
        state.racks = [];
      })

      // fetch single
      .addCase(fetchRackById.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      // .addCase(fetchRackById.fulfilled, (state, action) => {
      //   state.loading.fetch = false;
      //   if (action.payload) {
      //     // store as array for compatibility
      //     state.racks = [action.payload];
      //   }
      // })

      .addCase(fetchRackById.fulfilled, (state, action) => {
          state.loading.fetch = false;
          state.selectedRack = action.payload; // ✅ store separately
        })

      .addCase(fetchRackById.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload || action.error?.message || "Failed to fetch rack";
      })

      // create
      .addCase(createRack.pending, (state) => {
        state.loading.submit = true;
        state.error.submit = null;
      })
      .addCase(createRack.fulfilled, (state, action) => {
        state.loading.submit = false;
        state.error.submit = null;
        state.racks = [action.payload, ...state.racks];
      })
      .addCase(createRack.rejected, (state, action) => {
        state.loading.submit = false;
        state.error.submit = action.payload || action.error?.message || "Failed to create rack";
      })

      // update
      .addCase(updateRack.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateRack.fulfilled, (state, action) => {
        state.loading.update = false;
        const updated = action.payload;
        if (updated && updated._id) {
          state.racks = state.racks.map((r) =>
            String(r._id) === String(updated._id) ? updated : r
          );
        }
      })
      .addCase(updateRack.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload || action.error?.message || "Failed to update rack";
      })

      // delete
      .addCase(deleteRack.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteRack.fulfilled, (state, action) => {
        state.loading.delete = false;
        const removedId = action.payload;
        state.racks = state.racks.filter((r) => String(r._id) !== String(removedId));
      })
      .addCase(deleteRack.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.payload || action.error?.message || "Failed to delete rack";
      })
      // fetch by cluster
    .addCase(fetchRacksByClusterId.pending, (state) => {
      state.loading.fetch = true;
      state.error.fetch = null;
    })
    .addCase(fetchRacksByClusterId.fulfilled, (state, action) => {
      state.loading.fetch = false;
      // state.racks = Array.isArray(action.payload) ? action.payload : [];
      // merge-friendly update (for fetch by dataCenter or by cluster)
const incoming = Array.isArray(action.payload) ? action.payload : [];
// create a map of existing racks by _id
const existingById = new Map(state.racks.map(r => [String(r._id), r]));

// produce merged array keeping stable objects when unchanged
const merged = incoming.map(r => {
  const id = String(r._id);
  const prev = existingById.get(id);
  if (!prev) return r; // new item
  // shallow field merge - keep prev reference when nothing changed
  // compare important fields (or you can do shallow compare of keys)
  const changed = Object.keys(r).some(k => {
    // treat undefined same as missing
    return String(prev[k]) !== String(r[k]);
  });
  return changed ? { ...prev, ...r } : prev;
});

state.racks = merged;

    })
    .addCase(fetchRacksByClusterId.rejected, (state, action) => {
      state.loading.fetch = false;
      state.error.fetch =
        action.payload || action.error?.message || "Failed to fetch racks by cluster";
    })

    // fetch by data center
    .addCase(fetchRacksByDataCenterId.pending, (state) => {
      state.loading.fetch = true;
      state.error.fetch = null;
    })
    .addCase(fetchRacksByDataCenterId.fulfilled, (state, action) => {
      state.loading.fetch = false;
      // state.racks = Array.isArray(action.payload) ? action.payload : [];
      // merge-friendly update (for fetch by dataCenter or by cluster)
const incoming = Array.isArray(action.payload) ? action.payload : [];
// create a map of existing racks by _id
const existingById = new Map(state.racks.map(r => [String(r._id), r]));

// produce merged array keeping stable objects when unchanged
const merged = incoming.map(r => {
  const id = String(r._id);
  const prev = existingById.get(id);
  if (!prev) return r; // new item
  // shallow field merge - keep prev reference when nothing changed
  // compare important fields (or you can do shallow compare of keys)
  const changed = Object.keys(r).some(k => {
    // treat undefined same as missing
    return String(prev[k]) !== String(r[k]);
  });
  return changed ? { ...prev, ...r } : prev;
});

state.racks = merged;

    })
    .addCase(fetchRacksByDataCenterId.rejected, (state, action) => {
      state.loading.fetch = false;
      state.error.fetch =
        action.payload ||
        action.error?.message ||
        "Failed to fetch racks by data center";
    });

      
  },
});

export const { setRacks, clearRacks, clearSelectedRack } = rackSlice.actions;
export default rackSlice.reducer;
