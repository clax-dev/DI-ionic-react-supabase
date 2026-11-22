# DI - Ionic React + Supabase + Bootstrap

Aplicación Ionic React (Vite + TypeScript) que lee la tabla `clients` de Supabase
y la muestra con estilos de Bootstrap 5.

## Stack
- Ionic React 8 + React Router
- `@supabase/supabase-js`
- `bootstrap` (importado en `src/App.tsx`)

## Estructura de `src`
```
src/
  lib/supabaseClient.ts      cliente de Supabase (lee las variables VITE_*)
  services/clientsService.ts consultas a la tabla clients
  types/Client.ts            modelo Client
  pages/Home.tsx             listado de clientes (tabla Bootstrap)
  theme/variables.css        variables de Ionic
  App.tsx                    rutas + imports CSS (Ionic y Bootstrap)
  main.tsx                   punto de entrada
```

## Puesta en marcha
```bash
npm install
cp .env.example .env   # rellenar URL y anon key del proyecto Supabase
ionic serve
```

## Tabla `clients`
```sql
CREATE TABLE public.clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  empresa TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
