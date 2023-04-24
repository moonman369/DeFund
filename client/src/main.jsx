import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
const root = ReactDOM.createRoot(document.getElementById('root'));
import App from './App';
import './index.css';
import { StateContextProvider } from './context';
import { SwitchChainModal } from './components';

root.render(
  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <StateContextProvider>
      <SwitchChainModal />
      <Router>
        <App />
      </Router>
    </StateContextProvider>
  </ThirdwebProvider>
);
