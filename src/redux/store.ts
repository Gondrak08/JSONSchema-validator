import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import FormDataSlice from './reducer';

export const store = configureStore({
  reducer:{
    formData:FormDataSlice
  },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
