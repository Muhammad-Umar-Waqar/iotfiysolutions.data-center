// // src/slices/DataCenterSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// /*
//   Thunks
// */

// // fetch all data centers
// export const fetchAllDataCenters = createAsyncThunk(
//   "DataCenters/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return rejectWithValue("No authentication token found");

//       const res = await fetch(`${BASE}/data-center/all`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("DataSDS>", res);
//       const data = await res.json();

//       if (!res.ok) return rejectWithValue(data.message || "Failed to fetch data centers");
//       // backend returns array of datacenters
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// // create data center (expects name string)
// export const createDataCenter = createAsyncThunk(
//   "DataCenters/create",
//   async (name, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return rejectWithValue("No authentication token found");

//       const res = await fetch(`${BASE}/data-center/add`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         //   Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ name }),
//       });

//       const data = await res.json();
//       if (!res.ok) return rejectWithValue(data.message || "Failed to create data center");

//       // backend returns { message, organization } (organization = created datacenter)
//     //   return data.organization;
//       return data.datacenter;
//     } catch (err) {
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// // update data center
// export const updateDataCenter = createAsyncThunk(
//   "DataCenters/update",
//   async ({ id, name }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return rejectWithValue("No authentication token found");

//       const res = await fetch(`${BASE}/data-center/update/${id}`, {
//         method: "PUT",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ name }),
//       });

//       const data = await res.json();
//       if (!res.ok) return rejectWithValue(data.message || "Failed to update data center");
//       // backend returns { message, organization }
//       return data.datacenter;
//     } catch (err) {
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// // delete data center (returns id on success)
// export const deleteDataCenter = createAsyncThunk(
//   "DataCenters/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return rejectWithValue("No authentication token found");

//       const res = await fetch(`${BASE}/data-center/delete/${id}`, {
//         method: "DELETE",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       if (!res.ok) return rejectWithValue(data.message || "Failed to delete data center");
//       // return id for reducer convenience
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// // fetch datacenters by user (note: controller returns single populated organization under `organization`)
// export const fetchDataCentersByUser = createAsyncThunk(
//   "DataCenters/fetchByUser",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return rejectWithValue("No authentication token found");

//       const res = await fetch(`${BASE}/data-center/user/${userId}`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       console.log("data>>", data.dataCenters)
//       if (!res.ok) return rejectWithValue(data.message || "Failed to fetch data center for user");

//       // controller returns { message, organization } — convert to array for compatibility
//     //   return Array.isArray(data) ? data : data.organization ? [data.organization] : [];
//       return data.dataCenters ? data.dataCenters : [];
      
//     } catch (err) {
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// // fetch single data center by id
// export const fetchDataCenterById = createAsyncThunk(
//   "DataCenters/fetchById",
//   async (id, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return rejectWithValue("No authentication token found");

//       const res = await fetch(`${BASE}/data-center/single/${id}`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       if (!res.ok) return rejectWithValue(data.message || "Failed to fetch data center");

//       // controller returns { message, organization }
//       return data.datacenter || null;
//     } catch (err) {
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// /*
//   Slice
// */
// const DataCenterSlice = createSlice({
//   name: "DataCenter",
//   initialState: {
//     DataCenters: [],
//     // separate loading states so list fetching won't affect form submit button
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
//     setDataCenters(state, action) {
//       state.DataCenters = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // fetch all
//       .addCase(fetchAllDataCenters.pending, (state) => {
//         state.loading.fetch = true;
//         state.error.fetch = null;
//       })
//       .addCase(fetchAllDataCenters.fulfilled, (state, action) => {
//         state.loading.fetch = false;
//         state.DataCenters = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(fetchAllDataCenters.rejected, (state, action) => {
//         state.loading.fetch = false;
//         state.error.fetch = action.payload || action.error?.message || "Failed to fetch data centers";
//         state.DataCenters = [];
//       })

//       // create
//       .addCase(createDataCenter.pending, (state) => {
//         state.loading.submit = true;
//         state.error.submit = null;
//       })
//       .addCase(createDataCenter.fulfilled, (state, action) => {
//         state.loading.submit = false;
//         // push new datacenter at the top
//         state.DataCenters = [action.payload, ...state.DataCenters];
//       })
//       .addCase(createDataCenter.rejected, (state, action) => {
//         state.loading.submit = false;
//         state.error.submit = action.payload || action.error?.message || "Failed to create data center";
//       })

//       // update
//       .addCase(updateDataCenter.pending, (state) => {
//         state.loading.update = true;
//         state.error.update = null;
//       })
//       .addCase(updateDataCenter.fulfilled, (state, action) => {
//         state.loading.update = false;
//         const updated = action.payload;
//         if (updated && updated._id) {
//           state.DataCenters = state.DataCenters.map((d) =>
//             String(d._id) === String(updated._id) ? updated : d
//           );
//         }
//       })
//       .addCase(updateDataCenter.rejected, (state, action) => {
//         state.loading.update = false;
//         state.error.update = action.payload || action.error?.message || "Failed to update data center";
//       })

//       // delete
//       .addCase(deleteDataCenter.pending, (state) => {
//         state.loading.delete = true;
//         state.error.delete = null;
//       })
//       .addCase(deleteDataCenter.fulfilled, (state, action) => {
//         state.loading.delete = false;
//         const removedId = action.payload;
//         state.DataCenters = state.DataCenters.filter((d) => String(d._id) !== String(removedId));
//       })
//       .addCase(deleteDataCenter.rejected, (state, action) => {
//         state.loading.delete = false;
//         state.error.delete = action.payload || action.error?.message || "Failed to delete data center";
//       })

//       // fetch by user
//       .addCase(fetchDataCentersByUser.pending, (state) => {
//         state.loading.fetch = true;
//         state.error.fetch = null;
//       })
//       .addCase(fetchDataCentersByUser.fulfilled, (state, action) => {
//         state.loading.fetch = false;
//         state.DataCenters = Array.isArray(action.payload) ? action.payload : [];
//       })
      
//       .addCase(fetchDataCentersByUser.rejected, (state, action) => {
//         state.loading.fetch = false;
//         state.error.fetch = action.payload || action.error?.message || "Failed to fetch data centers for user";
//         state.DataCenters = [];
//       })

//       // fetch single by id -> store as single-item array for compatibility
//       .addCase(fetchDataCenterById.pending, (state) => {
//         state.loading.fetch = true;
//         state.error.fetch = null;
//       })
//       .addCase(fetchDataCenterById.fulfilled, (state, action) => {
//         state.loading.fetch = false;
//         state.DataCenters = action.payload ? [action.payload] : [];
//       })
//       .addCase(fetchDataCenterById.rejected, (state, action) => {
//         state.loading.fetch = false;
//         state.error.fetch = action.payload || action.error?.message || "Failed to fetch data center";
//         state.DataCenters = [];
//       });
//   },
// });

// export const { setDataCenters } = DataCenterSlice.actions;
// export default DataCenterSlice.reducer;




// // export const { setOrganizations } = OrganizationSlice.actions;
// // export default OrganizationSlice.reducer;







// src/slices/DataCenterSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

/*
  Thunks
*/

// fetch all data centers
export const fetchAllDataCenters = createAsyncThunk(
  "DataCenters/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/data-center/all`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("DataSDS>", res);
      const data = await res.json();

      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch data centers");
      // backend returns array of datacenters
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// create data center (expects name string)
export const createDataCenter = createAsyncThunk(
  "DataCenters/create",
  async (name, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/data-center/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to create data center");

      // backend returns { message, organization } (organization = created datacenter)
    //   return data.organization;
      return data.datacenter;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// update data center
export const updateDataCenter = createAsyncThunk(
  "DataCenters/update",
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/data-center/update/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to update data center");
      // backend returns { message, organization }
      return data.datacenter;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// delete data center (returns id on success)
export const deleteDataCenter = createAsyncThunk(
  "DataCenters/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/data-center/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to delete data center");
      // return id for reducer convenience
      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// fetch datacenters by user (note: controller returns single populated organization under `organization`)
export const fetchDataCentersByUser = createAsyncThunk(
  "DataCenters/fetchByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/data-center/user/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("data>>", data.dataCenters)
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch data center for user");

      // controller returns { message, organization } — convert to array for compatibility
    //   return Array.isArray(data) ? data : data.organization ? [data.organization] : [];
      return data.dataCenters ? data.dataCenters : [];
      
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// fetch single data center by id
export const fetchDataCenterById = createAsyncThunk(
  "DataCenters/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/data-center/single/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch data center");

      // controller returns { message, organization }
      return data.datacenter || null;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

/*
  Slice
*/
const DataCenterSlice = createSlice({
  name: "DataCenter",
  initialState: {
    DataCenters: [],
    // separate loading states so list fetching won't affect form submit button
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
    setDataCenters(state, action) {
      state.DataCenters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchAllDataCenters.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchAllDataCenters.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.DataCenters = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllDataCenters.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload || action.error?.message || "Failed to fetch data centers";
        state.DataCenters = [];
      })

      // create
      .addCase(createDataCenter.pending, (state) => {
        state.loading.submit = true;
        state.error.submit = null;
      })
      .addCase(createDataCenter.fulfilled, (state, action) => {
        state.loading.submit = false;
        // push new datacenter at the top
        state.DataCenters = [action.payload, ...state.DataCenters];
      })
      .addCase(createDataCenter.rejected, (state, action) => {
        state.loading.submit = false;
        state.error.submit = action.payload || action.error?.message || "Failed to create data center";
      })

      // update
      .addCase(updateDataCenter.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateDataCenter.fulfilled, (state, action) => {
        state.loading.update = false;
        const updated = action.payload;
        if (updated && updated._id) {
          state.DataCenters = state.DataCenters.map((d) =>
            String(d._id) === String(updated._id) ? updated : d
          );
        }
      })
      .addCase(updateDataCenter.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload || action.error?.message || "Failed to update data center";
      })

      // delete
      .addCase(deleteDataCenter.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteDataCenter.fulfilled, (state, action) => {
        state.loading.delete = false;
        const removedId = action.payload;
        state.DataCenters = state.DataCenters.filter((d) => String(d._id) !== String(removedId));
      })
      .addCase(deleteDataCenter.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.payload || action.error?.message || "Failed to delete data center";
      })

      // fetch by user
      .addCase(fetchDataCentersByUser.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchDataCentersByUser.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.DataCenters = Array.isArray(action.payload) ? action.payload : [];
      })
      
      .addCase(fetchDataCentersByUser.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload || action.error?.message || "Failed to fetch data centers for user";
        state.DataCenters = [];
      })

      // fetch single by id -> store as single-item array for compatibility
      .addCase(fetchDataCenterById.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchDataCenterById.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.DataCenters = action.payload ? [action.payload] : [];
      })
      .addCase(fetchDataCenterById.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload || action.error?.message || "Failed to fetch data center";
        state.DataCenters = [];
      });
  },
});

export const { setDataCenters } = DataCenterSlice.actions;
export default DataCenterSlice.reducer;


