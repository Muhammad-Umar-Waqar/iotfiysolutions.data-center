import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import { combineReducers } from "redux";
import OrganizationReducer from "../slices/OrganizationSlice";
import DataCenterReducer from "../slices/DataCenterSlice";
import DeviceReducer from "../slices/DeviceSlice";
import ManagerReducer from "../slices/ManagerSlice";
import VenueReducer from "../slices/VenueSlice";
import alertsReducer from '../slices/alertsSlice';
import UserReducer from '../slices/UserSlice';
import hubReducer from '../slices/hubSlice';
import rackReducer from '../slices/rackSlice'
import acKitReducer from '../slices/ackitSlice'
import rackClusterReducer from '../slices/rackClusterSlice'
import uiReducer from '../slices/uiSlice'


const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  User: UserReducer,
  Organization: OrganizationReducer,
  DataCenter: DataCenterReducer,
  Device: DeviceReducer,
  Manager: ManagerReducer,
  Venue: VenueReducer,
  alerts: alertsReducer,
  hub: hubReducer,
  rack: rackReducer,
  ackit: acKitReducer,
  rackCluster: rackClusterReducer,
  ui: uiReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
