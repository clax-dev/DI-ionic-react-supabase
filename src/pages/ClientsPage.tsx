import { useCallback, useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';
import { Link } from 'react-router-dom';

import Layout from '../components/Layout';
import { getClients } from '../services/clientsService';
import type { Client } from '../types/Client';

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    getClients()
      .then(setClients)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Ionic mantiene las páginas en caché: recargamos cada vez que se entra en la vista.
  useIonViewWillEnter(load);

  return (
    <Layout title="Clientes">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="opacity-75">
          {loading ? 'Cargando…' : `${clients.length} clientes en la tabla clients`}
        </span>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={load} disabled={loading}>
            Recargar
          </button>
          <Link className="btn btn-primary btn-sm" to="/clientes/nuevo">
            + Añadir cliente
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-danger">Error al cargar: {error}</div>}

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {!loading && !error && clients.length === 0 && (
        <div className="alert alert-info">Todavía no hay clientes.</div>
      )}

      {!loading && clients.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Empresa</th>
                <th>Email</th>
                <th>Alta</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c, i) => (
                <tr key={c.id}>
                  <td>{i + 1}</td>
                  <td>{c.nombre}</td>
                  <td>{c.empresa}</td>
                  <td>{c.email}</td>
                  <td>{new Date(c.created_at).toLocaleDateString('es-ES')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default ClientsPage;
