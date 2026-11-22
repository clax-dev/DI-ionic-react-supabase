# DAM CRM - Ionic React + Supabase + Bootstrap

Aplicación Ionic React (Vite + TypeScript) conectada a Supabase para gestionar la tabla `clients`,
con estilos de Bootstrap 5 y desplegada en Vercel.

## Funcionalidades
- **Conexión con Supabase**: al arrancar, `testConnection()` muestra en la consola del navegador
  `✅ Conexión correcta con Supabase` y una tabla con los datos de la conexión.
- **Barra de navegación** (Bootstrap navbar + `NavLink` de React Router):
  - **Ver clientes** (`/clientes`): tabla con los registros de `clients`.
  - **Añadir clientes** (`/clientes/nuevo`): formulario validado que inserta en `clients`.
  - **About** (`/about`): descripción del proyecto, imagen `.webp` y vídeo de YouTube.

## Estructura de `src`
```
src/
  lib/supabaseClient.ts      cliente de Supabase + testConnection()
  services/clientsService.ts getClients() / addClient()
  types/Client.ts            modelos Client y NewClient
  components/AppNavbar.tsx   barra de navegación
  components/Layout.tsx      IonPage con cabecera (navbar) y contenido
  pages/ClientsPage.tsx      Ver clientes
  pages/AddClientPage.tsx    Añadir clientes
  pages/AboutPage.tsx        About
  App.tsx                    rutas + imports CSS (Ionic y Bootstrap)
  main.tsx                   punto de entrada (lanza testConnection)
public/img/stack.webp        imagen de la página About
vercel.json                  rewrite a index.html para las rutas del SPA
```

## Puesta en marcha
```bash
npm install
cp .env.example .env   # rellenar URL y anon key del proyecto Supabase
ionic serve
```

## Variables de entorno
| Variable | Descripción |
|---|---|
| `VITE_SUPABASE_URL` | URL del proyecto (`https://<ref>.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | clave pública (publishable/anon) |

El archivo `.env` está en `.gitignore`. En Vercel se configuran en *Settings → Environment Variables*.

## Tabla `clients` y políticas RLS
```sql
CREATE TABLE public.clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  empresa TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- La app usa la clave anónima: necesita leer e insertar
CREATE POLICY "Lectura anon de clientes"  ON public.clients FOR SELECT TO anon USING (true);
CREATE POLICY "Insercion anon de clientes" ON public.clients FOR INSERT TO anon WITH CHECK (true);
```
