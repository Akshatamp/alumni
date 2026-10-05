import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { alumniApi } from '@/lib/api';
import AlumniLink from '@/components/AlumniLink';

const initialForm = {
  first_name: '',
  last_name: '',
  submitted_student_id: '',
  department: '',
  program: '',
  applicant_photo: null,
  email: '',
  phone: '',
  date_of_birth: '',
  current_company: '',
  designation: '',
  current_city: '',
  linkedin_url: '',
  github_url: '',
  portfolio_url: '',
};

function getErrorMessage(error) {
  const data = error.response?.data;
  if (typeof data?.message === 'string') return data.message;
  if (typeof data?.detail === 'string') return data.detail;
  if (data && typeof data === 'object') {
    return Object.entries(data)
      .map(([field, messages]) =>
        `${field.replaceAll('_', ' ')}: ${Array.isArray(messages) ? messages.join(' ') : String(messages)}`,
      )
      .join(' ');
  }
  if (error.request) return 'Could not reach CampusOS. Please try again later.';
  return error.message || 'Registration failed. Please try again.';
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field, value) => {
    setForm(current => ({ ...current, [field]: value }));
  };

  const submitRegistration = async event => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([field, value]) => {
        if (value instanceof File) {
          if (value) formData.append(field, value);
        } else if (typeof value === 'string') {
          formData.append(field, value.trim());
        }
      });
      const { data } = await alumniApi.register(formData);
      navigate('/register/success', {
        replace: true,
        state: { username: data.username },
      });
    } catch (requestError) {
      console.error('Unable to submit alumni application:', requestError);
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  const textFields = [
    ['phone', 'Phone', 'tel'],
    ['current_company', 'Current company'],
    ['designation', 'Designation'],
    ['current_city', 'Current city'],
    ['linkedin_url', 'LinkedIn URL', 'url'],
    ['github_url', 'GitHub URL', 'url'],
    ['portfolio_url', 'Portfolio URL', 'url'],
  ];

  return (
    <main className="portal-page portal-auth portal-register">
      <div className="portal-auth-content">
        <section className="portal-auth-card">
          <header className="portal-auth-card-header">
            <h1>Alumni Registration</h1>
          </header>
          <div className="portal-auth-card-body">
            <p className="text-gray-600">
              Complete this form to apply for an Alumni Connect account. The alumni
              office must approve your application before you can log in.
            </p>
            {error && <div className="portal-alert" role="alert">{error}</div>}

            <form className="portal-form" onSubmit={submitRegistration}>
              <div className="portal-form-grid">
                <div>
                  <label htmlFor="first_name">First name</label>
                  <input
                    id="first_name"
                    autoComplete="given-name"
                    required
                    maxLength={150}
                    value={form.first_name}
                    onChange={event => updateField('first_name', event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="last_name">Last name</label>
                  <input
                    id="last_name"
                    autoComplete="family-name"
                    required
                    maxLength={150}
                    value={form.last_name}
                    onChange={event => updateField('last_name', event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="submitted_student_id">Student ID (optional)</label>
                  <input
                    id="submitted_student_id"
                    maxLength={50}
                    value={form.submitted_student_id}
                    onChange={event => updateField('submitted_student_id', event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="department">Department</label>
                  <input
                    id="department"
                    maxLength={150}
                    value={form.department}
                    onChange={event => updateField('department', event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="program">Program</label>
                  <input
                    id="program"
                    maxLength={150}
                    value={form.program}
                    onChange={event => updateField('program', event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
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
                  <label htmlFor="applicant_photo">Profile photo (optional)</label>
                  <input
                    id="applicant_photo"
                    type="file"
                    accept="image/*"
                    onChange={event => updateField('applicant_photo', event.target.files?.[0] || null)}
                  />
                </div>
                <div>
                  <label htmlFor="date_of_birth">Date of birth (initial password)</label>
                  <input
                    id="date_of_birth"
                    type="date"
                    autoComplete="bday"
                    required
                    value={form.date_of_birth}
                    onChange={event => updateField('date_of_birth', event.target.value)}
                  />
                </div>
                {textFields.map(([field, label, type = 'text']) => (
                  <div key={field}>
                    <label htmlFor={field}>{label}</label>
                    <input
                      id={field}
                      type={type}
                      autoComplete={field === 'phone' ? 'tel' : undefined}
                      pattern={field === 'phone' ? '[0-9]{10}' : undefined}
                      maxLength={field === 'phone' ? 10 : undefined}
                      title={field === 'phone' ? 'Enter exactly 10 digits. Do not include +91.' : undefined}
                      inputMode={field === 'phone' ? 'numeric' : undefined}
                      value={form[field]}
                      onChange={event => updateField(
                        field,
                        field === 'phone'
                          ? event.target.value.replace(/\D/g, '').slice(0, 10)
                          : event.target.value,
                      )}
                    />
                    {field === 'phone' && (
                      <small className="text-gray-600">Enter 10 digits only; do not add +91.</small>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-gray-600">
                Your date of birth will be your initial password in DDMMYYYY
                format (for example, 05042004). Your account remains unavailable
                until approved.
              </p>
              <button
                className="portal-button portal-button-primary w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Submitting application…' : 'Submit application'}
              </button>
              <div className="portal-auth-links">
                <AlumniLink href="/login">Already approved? Sign in</AlumniLink>
                <Link to="/">Back to home</Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
