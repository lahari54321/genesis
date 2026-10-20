import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)',
        marginTop: 'auto',
        paddingTop: '64px',
        paddingBottom: '40px'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '64px'
          }}
        >
          {/* Brand Manifesto & Tagline */}
          <div style={{ maxWidth: '340px' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.6rem',
                letterSpacing: '0.2em',
                fontWeight: 600,
                display: 'block',
                marginBottom: '8px'
              }}
            >
              VEYRA
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-burgundy)',
                display: 'block',
                marginBottom: '16px'
              }}
            >
              Discover it. Desire it. Bid for it.
            </span>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, marginBottom: '20px' }}>
              An editorial marketplace for distinctive objects, ceramics, living art, and live auctions. Connecting discerning collectors with independent makers worldwide.
            </p>
            <div style={{ display: 'flex', gap: '16px', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              <a href="#instagram" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'underline' }}>Instagram</a>
              <a href="#twitter" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'underline' }}>Twitter / X</a>
              <a href="#journal" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'underline' }}>Editorial Journal</a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                color: 'var(--text-primary)'
              }}
            >
              Marketplace
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link to="/explore" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  All Distinctive Objects
                </Link>
              </li>
              <li>
                <Link to="/explore?category=art-prints" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Art & Prints
                </Link>
              </li>
              <li>
                <Link to="/explore?category=handmade" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Handmade Ceramics
                </Link>
              </li>
              <li>
                <Link to="/explore?category=vintage" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Vintage Finds
                </Link>
              </li>
              <li>
                <Link to="/auctions" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Live Auctions
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio & Support */}
          <div>
            <h4
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                color: 'var(--text-primary)'
              }}
            >
              Support & Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link to="/sell" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Sell on Veyra
                </Link>
              </li>
              <li>
                <a href="#about" onClick={(e) => e.preventDefault()} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  About
                </a>
              </li>
              <li>
                <a href="#help-centre" onClick={(e) => e.preventDefault()} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Help Centre
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => e.preventDefault()} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '12px',
                color: 'var(--text-primary)'
              }}
            >
              The Dispatch
            </h4>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Weekly dispatches highlighting emerging makers, private auction previews, and craftsmanship dialogues.
            </p>

            {subscribed ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 14px',
                  backgroundColor: 'var(--surface-secondary)',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-primary)'
                }}
              >
                <Check size={16} color="var(--success-color)" />
                <span>You have been subscribed to The Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div style={{ display: 'flex', position: 'relative' }}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address for newsletter"
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '0 42px 0 12px',
                      backgroundColor: '#FFFFFF',
                      border: error ? '1px solid var(--error-color)' : '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: 'var(--text-xs)',
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: '42px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-burgundy)'
                    }}
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
                {error && <span className="form-error" style={{ display: 'block', marginTop: '4px' }}>{error}</span>}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)'
          }}
        >
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} VEYRA Marketplace. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
