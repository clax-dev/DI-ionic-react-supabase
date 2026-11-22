import { supabase } from '../lib/supabaseClient';
import type { Client, NewClient } from '../types/Client';

export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function addClient(client: NewClient): Promise<void> {
  const { error } = await supabase.from('clients').insert(client);

  if (error) {
    // 23505 = violación de UNIQUE (email repetido)
    if (error.code === '23505') throw new Error('Ya existe un cliente con ese email.');
    throw error;
  }
}
