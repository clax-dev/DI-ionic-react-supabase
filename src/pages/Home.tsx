import { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { getClients } from '../services/clientsService';
import type { Client } from '../types/Client';
import './Home.css';

const Home: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getClients()
      .then(setClients)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container py-4">
          <h1 className="h3 mb-1">Ionic React + Supabase + Bootstrap</h1>
          <p className="opacity-75 mb-4">Listado de la tabla <code>clients</code> de Supabase.</p>

          {loading && (
            <div className="d-flex align-items-center gap-2">
              <div className="spinner-border spinner-border-sm text-primary" role="status" />
              <span>Cargando clientes…</span>
            </div>
          )}

          {error && <div className="alert alert-danger">Error: {error}</div>}

          {!loading && !error && clients.length === 0 && (
            <div className="alert alert-info">
              No hay clientes visibles. La tabla tiene RLS activado: solo los usuarios
              autenticados pueden leer los registros.
            </div>
          )}

          {clients.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Nombre</th>
                    <th>Empresa</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c) => (
                    <tr key={c.id}>
                      <td>{c.nombre}</td>
                      <td>{c.empresa}</td>
                      <td>{c.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Recargar
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
