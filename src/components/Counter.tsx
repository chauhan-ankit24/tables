import * as React from 'react';
import { observer } from 'mobx-react';
import { appStore } from '../stores/AppStore';
import './Counter.css';

interface CounterProps {
  store: typeof appStore;
}

const Counter = observer(({ store }: CounterProps) => {
  return (
    <div className="counter-container">
      <h2>MobX Counter</h2>
      <div className="counter-display">
        <span className="count-value">{store.count}</span>
      </div>
      <div className="button-group">
        <button 
          className="counter-button decrement" 
          onClick={store.decrement}
        >
          -
        </button>
        <button 
          className="counter-button increment" 
          onClick={store.increment}
        >
          +
        </button>
        <button 
          className="counter-button reset" 
          onClick={store.reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
});

export default Counter;
