import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import carsReducer from '../features/cars/carsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cars: carsReducer,
  },
});
