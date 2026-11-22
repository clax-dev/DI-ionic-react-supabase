import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY en el archivo .env');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Comprueba la conexión con Supabase haciendo una consulta ligera
 * (solo el número de filas de la tabla clients) y lo muestra en la consola.
 */
export async function testConnection(): Promise<boolean> {
  const inicio = performance.now();
  const { count, error, status } = await supabase
    .from('clients')
    .select('*', { count: 'exact', head: true });
  const ms = Math.round(performance.now() - inicio);

  if (error) {
    console.error('❌ Error de conexión con Supabase:', error.message, error);
    return false;
  }

  console.log('%c✅ Conexión correcta con Supabase', 'color:#3ecf8e;font-weight:bold;font-size:14px');
  console.table({
    url: supabaseUrl,
    proyecto: new URL(supabaseUrl).hostname.split('.')[0],
    tabla: 'public.clients',
    registros: count ?? 0,
    estadoHTTP: status,
    tiempoRespuesta: `${ms} ms`,
    clave: `${supabaseKey.slice(0, 16)}…`,
  });
  return true;
}
