export interface Client {
  id: string;
  nombre: string;
  empresa: string;
  email: string;
  created_at: string;
}

/** Datos que rellena el usuario en el formulario (el resto los pone la BD). */
export type NewClient = Pick<Client, 'nombre' | 'empresa' | 'email'>;
