import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import portfolioSlice from './slices/portfolioSlice';
import sipSlice from './slices/sipSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    portfolio: portfolioSlice,
    sip: sipSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;