// src/slices/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDataCenterId: null,
  selectedRackClusterId: null,
  selectedRackId: null,
  // keep track of which contexts had an initial successful fetch
  contextHasFetched: {
    dc: {},       // dc[id] = true
    cluster: {},  // cluster[id] = true
  },
  // mark we've auto-selected the first rack for a given context so we don't repeat
  autoSelectedRackForContext: {
    dc: {},
    cluster: {},
  },
  isInitialContextLoad: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedDataCenterId(state, action) {
      state.selectedDataCenterId = action.payload;
      // switching DC clears cluster selection
      state.selectedRackClusterId = null;
      state.selectedRackId = null;
      state.autoSelectedRackForContext.cluster = {};
    },
    setSelectedRackClusterId(state, action) {
      state.selectedRackClusterId = action.payload;
      // on cluster select we clear selectedRackId until racks load
      state.selectedRackId = null;
    },
    setSelectedRackId(state, action) {
      state.selectedRackId = action.payload;
    },
    markContextFetched(state, action) {
      const { kind, id } = action.payload; // kind: 'dc'|'cluster'
      if (kind && id) state.contextHasFetched[kind][id] = true;
      // state.isInitialContextLoad = false;
        if (state.isInitialContextLoad) {
        state.isInitialContextLoad = false;
      }
    },
    markAutoSelectedRack(state, action) {
      const { kind, id } = action.payload; // kind: 'dc'|'cluster'
      if (kind && id) state.autoSelectedRackForContext[kind][id] = true;
    },
    clearSelection(state) {
      state.selectedDataCenterId = null;
      state.selectedRackClusterId = null;
      state.selectedRackId = null;
    },
    resetUI: (state) => {
      state.selectedDataCenterId = null;
      state.selectedRackClusterId = null;
      state.selectedRackId = null;
      state.contextHasFetched = { dc: {}, cluster: {} };
      state.autoSelectedRackForContext = { dc: {}, cluster: {} };
    },
  },
});

export const {
  setSelectedDataCenterId,
  setSelectedRackClusterId,
  setSelectedRackId,
  markContextFetched,
  markAutoSelectedRack,
  clearSelection,
  resetUI
} = uiSlice.actions;

export default uiSlice.reducer;



