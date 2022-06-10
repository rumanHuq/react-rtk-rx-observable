import {
  AnyAction,
  combineReducers,
  configureStore,
  createSlice,
  Dispatch,
  PayloadAction,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { filter, map, delay, tap } from 'rxjs/operators';

export const counter = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => state + action.payload,
    decrement: (state, action: PayloadAction<number>) => state - action.payload,
  },
});
export const { increment, decrement } = counter.actions;
const reducer = combineReducers({
  counter: counter.reducer,
});

type Actions = {
  [key in keyof typeof counter.actions]: typeof counter.actions[key];
};
interface MainActions extends Actions, AnyAction {}
type mo = ReturnType<MainActions['increment']>;

export type MyState = ReturnType<typeof reducer>;

const countEpic = (action$) =>
  action$.pipe(
    filter<MainActions>(counter.actions.increment.match),
    delay(500),
    tap(console.log),
    map<mo, AnyAction>((action) => counter.actions.increment(action.payload))
  );

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, MyState>();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

epicMiddleware.run(countEpic);

export const useAppDispatch = () => useDispatch<Dispatch>();
export const useAppState: TypedUseSelectorHook<MyState> = useSelector;
