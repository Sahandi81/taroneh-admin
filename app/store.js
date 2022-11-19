import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import storage from 'redux-persist/lib/storage';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

import adminReducer from '@/features/admin/adminSlice';
import categoryReducer from '@/features/category/categorySlice';
import { apiSlice } from '@/features/api/apiSlice';

const persistConfig = {
  key: 'taronehAdmin',
  version: 1,
  storage,
  blacklist: [apiSlice.reducerPath]
};

const reducers = combineReducers({
  admin: adminReducer,
  category: categoryReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(apiSlice.middleware)
});

setupListeners(store.dispatch);