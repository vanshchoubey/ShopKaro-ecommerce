import { configureStore } from '@reduxjs/toolkit' 
import cartslice from './cartslice'

export const store = configureStore({
  reducer: {
    cart: cartslice,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})