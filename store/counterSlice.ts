import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

type InitialState = typeof initialState;

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state: InitialState, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    decrement(state: InitialState, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});
export const { actions: counterActions } = counterSlice;
export const { reducer: counterReducer } = counterSlice;
export type CounterActions = typeof counterSlice.actions;
