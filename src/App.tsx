import * as React from 'react';
import { observer } from 'mobx-react';
import { appStore } from './stores/AppStore';
import Counter from './components/Counter';
import logo from './logo.svg';
import './App.css';

const App = observer(() => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>KORU App</h1>
        <p className="app-message">{appStore.message}</p>
        <Counter store={appStore} />
        <div className="tech-stack">
          <p>Built with React 16, TypeScript, MobX 5, and Native CSS</p>
        </div>
      </header>
    </div>
  );
});

export default App;
