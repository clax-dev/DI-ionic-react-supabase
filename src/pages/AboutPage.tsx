import Layout from '../components/Layout';

const stack = [
  ['Ionic React 8', 'Componentes de interfaz y navegación con IonRouterOutlet.'],
  ['React Router 6', 'Rutas /clientes, /clientes/nuevo y /about.'],
  ['Bootstrap 5', 'Estilos: navbar, tablas, formularios y alertas.'],
  ['Supabase', 'Base de datos PostgreSQL con API REST y seguridad por filas (RLS).'],
  ['Vercel', 'Despliegue continuo desde GitHub con variables de entorno.'],
];

const AboutPage: React.FC = () => (
  <Layout title="About">
    <div className="row g-4">
      <div className="col-lg-6">
        <p>
          <strong>DAM CRM</strong> es una aplicación web de gestión de clientes desarrollada para la
          asignatura de <em>Desarrollo de Interfaces</em> (2º DAM). Permite consultar los clientes
          guardados en la tabla <code>clients</code> de Supabase y dar de alta nuevos clientes
          mediante un formulario validado.
        </p>
        <ul className="list-group mb-3">
          {stack.map(([name, desc]) => (
            <li className="list-group-item" key={name}>
              <strong>{name}:</strong> {desc}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-lg-6">
        <img
          src="/img/stack.webp"
          alt="Arquitectura: Ionic React con Bootstrap conectado a Supabase y desplegado en Vercel"
          className="img-fluid rounded shadow-sm mb-4"
          width={1200}
          height={630}
        />
        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.youtube-nocookie.com/embed/zBZgdTb-dns"
            title="Supabase in 100 Seconds"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  </Layout>
);

export default AboutPage;
