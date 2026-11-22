import { useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../components/Layout';
import { addClient } from '../services/clientsService';
import type { NewClient } from '../types/Client';

const empty: NewClient = { nombre: '', empresa: '', email: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(c: NewClient): Partial<Record<keyof NewClient, string>> {
  const errors: Partial<Record<keyof NewClient, string>> = {};
  if (c.nombre.trim().length < 2) errors.nombre = 'Escribe un nombre (mínimo 2 caracteres).';
  if (c.empresa.trim().length < 2) errors.empresa = 'Escribe la empresa (mínimo 2 caracteres).';
  if (!EMAIL_RE.test(c.email.trim())) errors.email = 'Escribe un email válido.';
  return errors;
}

const AddClientPage: React.FC = () => {
  const [form, setForm] = useState<NewClient>(empty);
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setResult(null);
    if (!isValid) return;

    setSaving(true);
    try {
      await addClient({
        nombre: form.nombre.trim(),
        empresa: form.empresa.trim(),
        email: form.email.trim().toLowerCase(),
      });
      setResult({ ok: true, msg: `Cliente "${form.nombre.trim()}" guardado correctamente.` });
      setForm(empty);
      setTouched(false);
    } catch (err) {
      setResult({ ok: false, msg: (err as Error).message });
    } finally {
      setSaving(false);
    }
  };

  const field = (name: keyof NewClient, label: string, type = 'text', placeholder = '') => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`form-control ${touched && errors[name] ? 'is-invalid' : ''}`}
        value={form[name]}
        onChange={onChange}
      />
      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  );

  return (
    <Layout title="Añadir cliente">
      <div className="row">
        <div className="col-lg-6">
          {result && (
            <div className={`alert ${result.ok ? 'alert-success' : 'alert-danger'}`}>
              {result.msg}{' '}
              {result.ok && (
                <Link to="/clientes" className="alert-link">
                  Ver clientes
                </Link>
              )}
            </div>
          )}
          <form className="card card-body" noValidate onSubmit={onSubmit}>
            {field('nombre', 'Nombre', 'text', 'Ana García')}
            {field('empresa', 'Empresa', 'text', 'Tech Solutions SL')}
            {field('email', 'Email', 'email', 'ana@empresa.com')}
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving && <span className="spinner-border spinner-border-sm me-2" />}
                Guardar cliente
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setForm(empty);
                  setTouched(false);
                  setResult(null);
                }}
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddClientPage;
