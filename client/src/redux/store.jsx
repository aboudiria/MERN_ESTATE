
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/user/UserSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

// Install package redux-persist to add data to local storage when used in loading.
const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: 'root',
  storage: storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
