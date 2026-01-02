import React from 'react';
import './i18n';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from 'core/context/userContext/userContext.provider';
import ImageCacheProvider from 'core/context/imageCacheContext/imageCacheContext.provider';
import { AllowedAuthProvider } from 'core/context/authContext/authContext.provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ImageCacheProvider>
        <AllowedAuthProvider>
          <App />
        </AllowedAuthProvider>
      </ImageCacheProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
