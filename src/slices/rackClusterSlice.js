import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

/* ===================== THUNKS ===================== */

// FETCH ALL RACK CLUSTERS
export const fetchAllRackClusters = createAsyncThunk(
  "rackCluster/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack-cluster/all`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(
          data.message || "Failed to fetch rack clusters"
        );
      }

      return data.clusters || [];
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// FETCH SINGLE RACK CLUSTER
export const fetchRackClusterById = createAsyncThunk(
  "rackCluster/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack-cluster/single/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(
          data.message || "Failed to fetch rack cluster"
        );
      }

      return data.data || null;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// CREATE RACK CLUSTER
export const createRackCluster = createAsyncThunk(
  "rackCluster/create",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack-cluster/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(
          data.message || "Failed to create rack cluster"
        );
      }

      return data.data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// UPDATE RACK CLUSTER
export const updateRackCluster = createAsyncThunk(
  "rackCluster/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack-cluster/update/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(
          data.message || "Failed to update rack cluster"
        );
      }

      return data.data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// DELETE RACK CLUSTER
export const deleteRackCluster = createAsyncThunk(
  "rackCluster/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack-cluster/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(
          data.message || "Failed to delete rack cluster"
        );
      }

      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);


export const fetchRackClustersByAcKit = createAsyncThunk(
  "rackCluster/fetchByAcKit",
  async (ackitId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack-cluster/byAckit/${ackitId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed");

      return data.clusters || [];
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// FETCH RACK CLUSTERS BY DATA CENTER
export const fetchRackClustersByDataCenter = createAsyncThunk(
  "rackCluster/fetchByDataCenter",
  async (dataCenterId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(
        `${BASE}/rack-cluster/by-dataCenter/${dataCenterId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(
          data.message || "Failed to fetch rack clusters by data center"
        );
      }

      return data.clusters || [];
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

/* ========== NEW: FETCH MEANS FOR ALL CLUSTERS IN A DATA CENTER ========== */
export const fetchRackClusterMeansByDc = createAsyncThunk(
  "rackCluster/fetchMeansByDc",
  async (dataCenterId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack-cluster/all-means/${dataCenterId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch cluster means");

      // controller returns { dataCenterId, clusters: [...] }
      return data.clusters || [];
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

/* ========== NEW: FETCH MEAN FOR A SINGLE CLUSTER (evaluation result) ========== */
export const fetchRackClusterMean = createAsyncThunk(
  "rackCluster/fetchMeanByCluster",
  async (clusterId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/rack-cluster/mean/${clusterId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch cluster mean");

      // controller returns an object with cluster, meanTemp, meanHumi, desiredAc, actualAc, message ...
      return data || null;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);


/* ===================== SLICE ===================== */

const rackClusterSlice = createSlice({
  name: "rackCluster",
  initialState: {
    clusters: [],
    meansList: [],       // holds clusters means for a data center (all-means)
    meanDetail: null,    // holds a single cluster mean/evaluation (mean/:clusterId)
    loading: {
      fetch: false,
      submit: false,
      update: false,
      delete: false,
      means: false,
      mean: false,
    },
    error: {
      fetch: null,
      submit: null,
      update: null,
      delete: null,
      means: null,
      mean: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchAllRackClusters.pending, (s) => {
        s.loading.fetch = true;
        s.error.fetch = null;
      })
      .addCase(fetchAllRackClusters.fulfilled, (s, a) => {
        s.loading.fetch = false;
        s.clusters = a.payload;
      })
      .addCase(fetchAllRackClusters.rejected, (s, a) => {
        s.loading.fetch = false;
        s.error.fetch = a.payload;
      })

      // CREATE
      .addCase(createRackCluster.pending, (s) => {
        s.loading.submit = true;
        s.error.submit = null;
      })
      .addCase(createRackCluster.fulfilled, (s, a) => {
        s.loading.submit = false;
        s.clusters = [a.payload, ...s.clusters];
      })
      .addCase(createRackCluster.rejected, (s, a) => {
        s.loading.submit = false;
        s.error.submit = a.payload;
      })

      // UPDATE
      // .addCase(updateRackCluster.fulfilled, (s, a) => {
      //   const updated = a.payload;
      //   s.clusters = s.clusters.map((c) =>
      //     String(c._id) === String(updated._id) ? updated : c
      //   );
      // })
      .addCase(updateRackCluster.pending, (s) => {
      s.loading.update = true;
      s.error.update = null;
      })
      .addCase(updateRackCluster.fulfilled, (s, a) => {
        s.loading.update = false;
        const updated = a.payload;
        s.clusters = s.clusters.map((c) =>
          String(c._id) === String(updated._id) ? updated : c
        );
      })
      .addCase(updateRackCluster.rejected, (s, a) => {
        s.loading.update = false;
        s.error.update = a.payload;
      })

      // DELETE
      .addCase(deleteRackCluster.fulfilled, (s, a) => {
        s.clusters = s.clusters.filter(
          (c) => String(c._id) !== String(a.payload)
        );
      })

      // FETCH BY DATA CENTER
      .addCase(fetchRackClustersByDataCenter.pending, (s) => {
        s.loading.fetch = true;
        s.error.fetch = null;
      })
      .addCase(fetchRackClustersByDataCenter.fulfilled, (s, a) => {
        s.loading.fetch = false;
        s.clusters = a.payload;
      })
      .addCase(fetchRackClustersByDataCenter.rejected, (s, a) => {
        s.loading.fetch = false;
        s.clusters = [];
        s.error.fetch = a.payload;
      })
      .addCase(fetchRackClustersByAcKit.pending, s=>{
        s.loading.fetch=true
        s.error.fetch=null
      })
      .addCase(fetchRackClustersByAcKit.fulfilled,(s,a)=>{
        s.loading.fetch=false
        s.clusters=a.payload
      })
      .addCase(fetchRackClustersByAcKit.rejected,(s,a)=>{
        s.loading.fetch=false
        s.error.fetch=a.payload
        s.clusters=[]
      })
      /* ========== NEW: fetchRackClusterMeansByDc ========== */
      .addCase(fetchRackClusterMeansByDc.pending, (s) => {
        s.loading.means = true;
        s.error.means = null;
      })
      .addCase(fetchRackClusterMeansByDc.fulfilled, (s, a) => {
        s.loading.means = false;
        s.meansList = a.payload; // array of { id, name, meanTemp, meanHumi, ackitStatus }
      })
      .addCase(fetchRackClusterMeansByDc.rejected, (s, a) => {
        s.loading.means = false;
        s.meansList = [];
        s.error.means = a.payload;
      })
      /* ========== NEW: fetchRackClusterMean (single cluster evaluation) ========== */
      .addCase(fetchRackClusterMean.pending, (s) => {
        s.loading.mean = true;
        s.error.mean = null;
      })
      .addCase(fetchRackClusterMean.fulfilled, (s, a) => {
        s.loading.mean = false;
        s.meanDetail = a.payload; // object returned by your controller
      })
      .addCase(fetchRackClusterMean.rejected, (s, a) => {
        s.loading.mean = false;
        s.meanDetail = null;
        s.error.mean = a.payload;
      });

  },
});

export default rackClusterSlice.reducer;
