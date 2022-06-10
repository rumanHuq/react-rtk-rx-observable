import * as React from 'react';
import { decrement, increment, useAppDispatch, useAppState } from './store';
import './style.css';

export default function App() {
  const dispatch = useAppDispatch();
  const counter = useAppState((state) => state.counter);
  return (
    <div>
      <button onClick={() => dispatch(increment(1))}>incr</button>
      <button onClick={() => dispatch(decrement(1))}>decr</button>
      <p>{counter.toString()}</p>
    </div>
  );
}
