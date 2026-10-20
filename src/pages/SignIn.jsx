import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ArrowRight, Eye, EyeOff, ArrowLeft, ShieldCheck, Info } from 'lucide-react';

export const SignIn = () => {
  const { signIn, signInWithGoogle, isSupabaseConfigured } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination after successful login
  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/explore';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both your email and password.');
      return;
    }

    setIsSubmitting(true);
    const res = await signIn(email, password);
    setIsSubmitting(false);

    if (res.success) {
      navigate(redirectPath);
    } else {
      setError(res.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  const handleGoogleClick = async () => {
    setError('');
    const res = await signInWithGoogle();
    if (!res.success && res.error) {
      setError(res.error);
    }
  };

  return (
    <div style={{ paddingTop: '48px', paddingBottom: '96px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        {/* Return Home Link */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-secondary)'
            }}
          >
            <ArrowLeft size={14} />
            <span>Return to VEYRA Home</span>
          </Link>
        </div>

        {/* Card Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Link
            to="/"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              letterSpacing: '0.22em',
              fontWeight: 600,
              display: 'block',
              marginBottom: '6px'
            }}
          >
            VEYRA
          </Link>
          <span className="eyebrow" style={{ marginBottom: '6px' }}>
            Collector & Maker Portal
          </span>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Sign in to your account</h1>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            Access private acquisitions, live auction watchlist, and curated bids.
          </p>
        </div>

        {/* Supabase Status Banner */}
        <div
          style={{
            backgroundColor: isSupabaseConfigured ? 'var(--badge-shipping-bg)' : 'var(--surface-secondary)',
            border: `1px solid ${isSupabaseConfigured ? 'rgba(56, 107, 73, 0.2)' : 'var(--border-color)'}`,
            borderRadius: 'var(--radius-xs)',
            padding: '12px 14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '11px',
            color: isSupabaseConfigured ? 'var(--badge-shipping-text)' : 'var(--text-secondary)'
          }}
        >
          {isSupabaseConfigured ? (
            <ShieldCheck size={16} color="var(--success-color)" style={{ flexShrink: 0 }} />
          ) : (
            <Info size={16} color="var(--accent-burgundy)" style={{ flexShrink: 0 }} />
          )}
          <span>
            {isSupabaseConfigured ? (
              <strong>Connected to Supabase Project: veyra-marketplace</strong>
            ) : (
              <span>
                <strong>Supabase Setup:</strong> Add your credentials in <code>.env.local</code> to authenticate with your live database.
              </span>
            )}
          </span>
        </div>

        {/* Sign In Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            padding: '32px',
            borderRadius: 'var(--radius-xs)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)'
          }}
        >
          {/* Google OAuth Option */}
          <button
            type="button"
            onClick={handleGoogleClick}
            className="btn btn-secondary"
            style={{
              width: '100%',
              height: '42px',
              fontSize: 'var(--text-xs)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.99 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              fontSize: '11px',
              color: 'var(--text-secondary)'
            }}
          >
            <span style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
            <span>OR WITH EMAIL</span>
            <span style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email-input">
              Email Address
            </label>
            <input
              id="email-input"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" htmlFor="password-input">
                Password
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  addToast('To reset your password, visit your Supabase Authentication dashboard.');
                }}
                style={{ fontSize: '11px', color: 'var(--text-secondary)', textDecoration: 'underline' }}
              >
                Forgot password?
              </a>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                style={{ paddingRight: '40px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="form-error" style={{ marginBottom: '16px' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: '100%', height: '46px', letterSpacing: '0.06em', textTransform: 'uppercase' }}
          >
            <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight size={15} />
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            marginTop: '24px'
          }}
        >
          Don't have an account yet?{' '}
          <Link
            to={`/signup${location.search}`}
            style={{
              color: 'var(--accent-burgundy)',
              textDecoration: 'underline',
              fontWeight: 600
            }}
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};
