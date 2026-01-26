// // hubSlice.js

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const BASE_URL = import.meta.env.VITE_BACKEND_API;

// /* ===========================
//    1️⃣ CREATE HUB
// =========================== */
// export const createHub = createAsyncThunk(
//   "hub/createHub",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(`${BASE_URL}/hub/add`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       return data.hub;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// /* ===========================
//    2️⃣ GET ALL HUBS
// =========================== */
// export const fetchAllHubs = createAsyncThunk(
//   "hub/fetchAllHubs",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(`${BASE_URL}/hub/all`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// /* ===========================
//    3️⃣ GET HUBS BY DATACENTER
// =========================== */
// export const fetchHubsByDataCenter = createAsyncThunk(
//   "hub/fetchHubsByDataCenter",
//   async (dataCenterId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(
//         `${BASE_URL}/hub/dataCenter/${dataCenterId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           credentials: "include",
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// /* ===========================
//    4️⃣ GET SINGLE HUB
// =========================== */
// export const fetchSingleHub = createAsyncThunk(
//   "hub/fetchSingleHub",
//   async (hubId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(`${BASE_URL}/hub/single/${hubId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// /* ===========================
//    5️⃣ UPDATE HUB
// =========================== */
// export const updateHub = createAsyncThunk(
//   "hub/updateHub",
//   async ({ hubId, payload }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(`${BASE_URL}/hub/update/${hubId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       return data.hub;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// /* ===========================
//    6️⃣ DELETE HUB
// =========================== */
// export const deleteHub = createAsyncThunk(
//   "hub/deleteHub",
//   async (hubId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(`${BASE_URL}/hub/delete/${hubId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       return hubId;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// /* ===========================
//    HUB SLICE
// =========================== */
// const hubSlice = createSlice({
//   name: "hub",
//   initialState: {
//     hubs: [],
//     singleHub: null,

//     loading: {
//       fetch: false,
//       submit: false,
//       update: false,
//       delete: false,
//     },

//     error: {
//       fetch: null,
//       submit: null,
//       update: null,
//       delete: null,
//     },
//   },

//   reducers: {
//     clearSingleHub: (state) => {
//       state.singleHub = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder

//       /* ---------- CREATE ---------- */
//       .addCase(createHub.pending, (state) => {
//         state.loading.submit = true;
//         state.error.submit = null;
//       })
//       .addCase(createHub.fulfilled, (state, action) => {
//         state.loading.submit = false;
//         state.hubs.push(action.payload);
//       })
//       .addCase(createHub.rejected, (state, action) => {
//         state.loading.submit = false;
//         state.error.submit = action.payload;
//       })

//       /* ---------- FETCH ALL ---------- */
//       .addCase(fetchAllHubs.pending, (state) => {
//         state.loading.fetch = true;
//         state.error.fetch = null;
//       })
//       .addCase(fetchAllHubs.fulfilled, (state, action) => {
//         state.loading.fetch = false;
//         state.hubs = action.payload;
//       })
//       .addCase(fetchAllHubs.rejected, (state, action) => {
//         state.loading.fetch = false;
//         state.error.fetch = action.payload;
//       })

//       /* ---------- FETCH BY DATACENTER ---------- */
//       .addCase(fetchHubsByDataCenter.pending, (state) => {
//         state.loading.fetch = true;
//       })
//       .addCase(fetchHubsByDataCenter.fulfilled, (state, action) => {
//         state.loading.fetch = false;
//         state.hubs = action.payload;
//       })
//       .addCase(fetchHubsByDataCenter.rejected, (state, action) => {
//         state.loading.fetch = false;
//         state.error.fetch = action.payload;
//       })

//       /* ---------- FETCH SINGLE ---------- */
//       .addCase(fetchSingleHub.pending, (state) => {
//         state.loading.fetch = true;
//       })
//       .addCase(fetchSingleHub.fulfilled, (state, action) => {
//         state.loading.fetch = false;
//         state.singleHub = action.payload;
//       })
//       .addCase(fetchSingleHub.rejected, (state, action) => {
//         state.loading.fetch = false;
//         state.error.fetch = action.payload;
//       })

//       /* ---------- UPDATE ---------- */
//       .addCase(updateHub.pending, (state) => {
//         state.loading.update = true;
//         state.error.update = null;
//       })
//       .addCase(updateHub.fulfilled, (state, action) => {
//         state.loading.update = false;
//         state.hubs = state.hubs.map((hub) =>
//           hub._id === action.payload.id ? action.payload : hub
//         );
//       })
//       .addCase(updateHub.rejected, (state, action) => {
//         state.loading.update = false;
//         state.error.update = action.payload;
//       })

//       /* ---------- DELETE ---------- */
//       .addCase(deleteHub.pending, (state) => {
//         state.loading.delete = true;
//         state.error.delete = null;
//       })
//       .addCase(deleteHub.fulfilled, (state, action) => {
//         state.loading.delete = false;
//         state.hubs = state.hubs.filter(
//           (hub) => hub._id !== action.payload
//         );
//       })
//       .addCase(deleteHub.rejected, (state, action) => {
//         state.loading.delete = false;
//         state.error.delete = action.payload;
//       });
//   },
// });

// export const { clearSingleHub } = hubSlice.actions;
// export default hubSlice.reducer;














// Just Added FetchSensorsByHubID

// hubSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BACKEND_API;

/* ===========================
   1️⃣ CREATE HUB (unchanged)
=========================== */
export const createHub = createAsyncThunk(
  "hub/createHub",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/hub/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data.hub;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===========================
   2️⃣ GET ALL HUBS (unchanged)
=========================== */
export const fetchAllHubs = createAsyncThunk(
  "hub/fetchAllHubs",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/hub/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===========================
   3️⃣ GET HUBS BY DATACENTER (unchanged)
=========================== */
export const fetchHubsByDataCenter = createAsyncThunk(
  "hub/fetchHubsByDataCenter",
  async (dataCenterId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/hub/dataCenter/${dataCenterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===========================
   4️⃣ GET SINGLE HUB (unchanged)
=========================== */
export const fetchSingleHub = createAsyncThunk(
  "hub/fetchSingleHub",
  async (hubId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/hub/single/${hubId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===========================
   NEW: GET SENSORS BY HUB ID
   - Adjust the endpoint path if your HubController exposes a different route.
   - This thunk returns an array of sensors (each with _id and sensorName).
=========================== */
export const fetchSensorsByHub = createAsyncThunk(
  "hub/fetchSensorsByHub",
  async (hubId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      // <-- Choose the route that matches your backend. I used /hub/sensors/:hubId
      const res = await fetch(`${BASE_URL}/hub/sensors-by/${hubId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // If your API returns { sensors: [...] } return data.sensors, otherwise return data.
      return data.sensors ?? data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===========================
   5️⃣ UPDATE HUB (unchanged)
=========================== */
export const updateHub = createAsyncThunk(
  "hub/updateHub",
  async ({ hubId, payload }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/hub/update/${hubId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data.hub;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===========================
   6️⃣ DELETE HUB (unchanged)
=========================== */
export const deleteHub = createAsyncThunk(
  "hub/deleteHub",
  async (hubId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/hub/delete/${hubId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return hubId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===========================
   HUB SLICE (updated: sensors)
=========================== */
const hubSlice = createSlice({
  name: "hub",
  initialState: {
    hubs: [],
    singleHub: null,
    sensors: [], // <- sensors for selected hub

    loading: {
      fetch: false,
      submit: false,
      update: false,
      delete: false,
      sensors: false, // loading state for sensors
    },

    error: {
      fetch: null,
      submit: null,
      update: null,
      delete: null,
      sensors: null,
    },
  },

  reducers: {
    clearSingleHub: (state) => {
      state.singleHub = null;
    },
    clearHubSensors: (state) => {
      state.sensors = [];
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------- CREATE ---------- */
      .addCase(createHub.pending, (state) => {
        state.loading.submit = true;
        state.error.submit = null;
      })
      .addCase(createHub.fulfilled, (state, action) => {
        state.loading.submit = false;
        state.hubs.push(action.payload);
      })
      .addCase(createHub.rejected, (state, action) => {
        state.loading.submit = false;
        state.error.submit = action.payload;
      })

      /* ---------- FETCH ALL ---------- */
      .addCase(fetchAllHubs.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchAllHubs.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.hubs = action.payload;
      })
      .addCase(fetchAllHubs.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload;
      })

      /* ---------- FETCH BY DATACENTER ---------- */
      .addCase(fetchHubsByDataCenter.pending, (state) => {
        state.loading.fetch = true;
      })
      .addCase(fetchHubsByDataCenter.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.hubs = action.payload;
      })
      .addCase(fetchHubsByDataCenter.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload;
      })

      /* ---------- FETCH SINGLE ---------- */
      .addCase(fetchSingleHub.pending, (state) => {
        state.loading.fetch = true;
      })
      .addCase(fetchSingleHub.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.singleHub = action.payload;
      })
      .addCase(fetchSingleHub.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload;
      })

      /* ---------- FETCH SENSORS BY HUB (NEW) ---------- */
      .addCase(fetchSensorsByHub.pending, (state) => {
        state.loading.sensors = true;
        state.error.sensors = null;
      })
      .addCase(fetchSensorsByHub.fulfilled, (state, action) => {
        state.loading.sensors = false;
        state.sensors = action.payload || [];
      })
      .addCase(fetchSensorsByHub.rejected, (state, action) => {
        state.loading.sensors = false;
        state.error.sensors = action.payload;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateHub.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateHub.fulfilled, (state, action) => {
        state.loading.update = false;
        state.hubs = state.hubs.map((hub) =>
          // hub._id === action.payload.id ? action.payload : hub
          hub._id === (action.payload._id || action.payload.id)
        );
      })
      .addCase(updateHub.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteHub.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteHub.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.hubs = state.hubs.filter((hub) => hub._id !== action.payload);
      })
      .addCase(deleteHub.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.payload;
      });
  },
});

export const { clearSingleHub, clearHubSensors } = hubSlice.actions;

export default hubSlice.reducer;
