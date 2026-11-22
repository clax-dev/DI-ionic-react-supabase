import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { testConnection } from './lib/supabaseClient';

// Bootstrap sigue el mismo tema (claro/oscuro) que Ionic, que usa la preferencia del sistema
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const applyTheme = () =>
  document.documentElement.setAttribute('data-bs-theme', darkQuery.matches ? 'dark' : 'light');
applyTheme();
darkQuery.addEventListener('change', applyTheme);

// Reto 1: comprobar la conexión con Supabase al arrancar (ver consola del navegador)
testConnection();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
