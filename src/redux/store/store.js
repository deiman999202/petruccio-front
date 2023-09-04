import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web
import counterReducer from '../slice/cartSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: sessionStorage
}

const persistedReducer = persistReducer(persistConfig, counterReducer);

export default configureStore({
  reducer: {
    cart: persistedReducer,
  },
});