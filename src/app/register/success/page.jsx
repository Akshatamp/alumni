import { useLocation } from 'react-router-dom';
import AlumniLink from '@/components/AlumniLink';

export default function RegistrationSuccess() {
  const { state } = useLocation();
  const username = state?.username;

  return (
    <main className="portal-page portal-auth">
      <section className="portal-auth-content portal-auth-card">
        <header className="portal-auth-card-header">
          <h1>Application submitted</h1>
        </header>
        <div className="portal-auth-card-body portal-success-content">
          <div className="portal-success-icon" aria-hidden="true">✓</div>
          <h2>Thank you for applying to Alumni Connect.</h2>
          <p>
            Your application is pending review. You can sign in after the alumni
            office approves it. Your date of birth is your initial password in
            DDMMYYYY format.
          </p>
          {username && (
            <p>
              Your sign-in username is <strong>{username}</strong>. Keep it private.
            </p>
          )}
          <AlumniLink href="/login" className="portal-button portal-button-primary">
            Go to login
          </AlumniLink>
        </div>
      </section>
    </main>
  );
}
