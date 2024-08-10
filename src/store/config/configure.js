import { configureStore } from "@reduxjs/toolkit";
import nav from "../module/Dashboard";
import user from "../module/User";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  nav,
  user,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);
