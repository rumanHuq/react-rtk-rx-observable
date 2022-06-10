import {
  AnyAction,
  combineReducers,
  configureStore,
  Dispatch,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createEpicMiddleware, Epic, ofType } from 'redux-observable';
import { map, delay, tap, take } from 'rxjs/operators';
import {
  counterReducer,
  counterActions,
  CounterActions,
} from './store/counterSlice';

interface RootActions extends CounterActions, AnyAction {}

const reducer = {
  counter: counterReducer,
};
export type RootState = {
  [key in keyof typeof reducer]: ReturnType<typeof reducer[key]>;
};

const countEpic: Epic<AnyAction, AnyAction, RootState> = (action$) => {
  return action$.pipe(
    ofType(counterActions.increment.toString()),
    delay(500),
    tap(console.log),
    map<ReturnType<RootActions['increment']>, AnyAction>((action) =>
      counterActions.increment(action.payload)
    ),
    take(4)
  );
};

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

export const store = configureStore({
  reducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ thunk: false }).concat(epicMiddleware);
  },
});

epicMiddleware.run(countEpic);

export const useAppDispatch = () => useDispatch<Dispatch>();
export const useAppState: TypedUseSelectorHook<RootState> = useSelector;
