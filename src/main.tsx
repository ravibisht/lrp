import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ReactGA from 'react-ga4';
import './index.css';

const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (trackingId) {
  ReactGA.initialize(trackingId);
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
