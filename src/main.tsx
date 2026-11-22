import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { testConnection } from './lib/supabaseClient';

// Reto 1: comprobar la conexión con Supabase al arrancar (ver consola del navegador)
testConnection();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
