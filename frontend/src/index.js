import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import { polygonAmoy } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'TreasuryGo RWA',
  projectId: '044601f65212332475a09bc14cead7c3', // Public demo ID
  chains: [polygonAmoy],
  transports: { [polygonAmoy.id]: http('https://rpc-amoy.polygon.technology') },
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({ accentColor: '#2563eb' })}>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);