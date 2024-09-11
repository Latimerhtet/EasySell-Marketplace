import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import loaderReducer from "./Slices/loaderSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const combinedReducers = combineReducers({
  user: userReducer,
  loader: loaderReducer,
});

const persist_reducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: { user: persist_reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
});
