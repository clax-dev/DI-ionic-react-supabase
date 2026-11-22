import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/clientes', label: 'Ver clientes' },
  { to: '/clientes/nuevo', label: 'Añadir clientes' },
  { to: '/about', label: 'About' },
];

const AppNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand fw-semibold" to="/clientes">
        DAM CRM
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        aria-controls="mainNav"
        aria-expanded={open}
        aria-label="Abrir menú"
        onClick={() => setOpen(!open)}
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div id="mainNav" className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
        <ul className="navbar-nav ms-auto">
          {links.map((l) => (
            <li className="nav-item" key={l.to}>
              <NavLink
                to={l.to}
                end
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default AppNavbar;
