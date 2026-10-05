import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlumniLink from '@/components/AlumniLink';
import { authApi } from '@/lib/api';

const initialForm = {
  email: '',
  date_of_birth: '',
  new_password: '',
  new_password_confirm: '',
};

function getErrorMessage(error) {
  const data = error.response?.data;
  if (typeof data?.detail === 'string') return data.detail;
  if (data && typeof data === 'object') {
    return Object.entries(data)
      .map(([field, messages]) =>
        `${field.replaceAll('_', ' ')}: ${Array.isArray(messages) ? messages.join(' ') : String(messages)}`,
      )
      .join(' ');
  }
  if (error.request) return 'Could not reach CampusOS. Please try again later.';
  return error.message || 'Password reset failed. Please try again.';
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field, value) => {
    setForm(current => ({ ...current, [field]: value }));
  };

  const submitReset = async event => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authApi.forgotPassword({
        ...form,
        email: form.email.trim(),
      });
      navigate('/login', {
        replace: true,
        state: { message: 'Password reset successfully. Sign in with your new password.' },
      });
    } catch (requestError) {
      console.error('Unable to reset alumni password:', requestError);
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="portal-page portal-auth">
      <div className="portal-auth-content">
        <section className="portal-auth-card">
          <header className="portal-auth-card-header">
            <h1>Reset your password</h1>
          </header>
          <div className="portal-auth-card-body">
            <p className="text-gray-600">
              Verify your account with your registered email and date of birth,
              then choose a new password.
            </p>
            {error && <div className="portal-alert" role="alert">{error}</div>}
            <form className="portal-form" onSubmit={submitReset}>
              <div>
                <label htmlFor="email">Registered email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={event => updateField('email', event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="date_of_birth">Date of birth</label>
                <input
                  id="date_of_birth"
                  type="date"
                  autoComplete="bday"
                  required
                  value={form.date_of_birth}
                  onChange={event => updateField('date_of_birth', event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="new_password">New password</label>
                <input
                  id="new_password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={form.new_password}
                  onChange={event => updateField('new_password', event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="new_password_confirm">Confirm new password</label>
                <input
                  id="new_password_confirm"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={form.new_password_confirm}
                  onChange={event => updateField('new_password_confirm', event.target.value)}
                />
              </div>
              <button
                className="portal-button portal-button-primary w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Resetting password…' : 'Reset password'}
              </button>
              <div className="portal-auth-links">
                <AlumniLink href="/login">Back to login</AlumniLink>
                <Link to="/">Back to home</Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
