import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight, User, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../data/products';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('all');
  
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, signOut } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (selectedSearchCategory && selectedSearchCategory !== 'all') {
      params.set('category', selectedSearchCategory);
    }
    navigate(`/explore?${params.toString()}`);
  };

  const navCategories = [
    { id: 'all', label: 'All Categories', path: '/explore' },
    { id: 'art-prints', label: 'Art & Prints', path: '/explore?category=art-prints' },
    { id: 'handmade', label: 'Handmade Ceramics', path: '/explore?category=handmade' },
    { id: 'home-living', label: 'Home & Living', path: '/explore?category=home-living' },
    { id: 'fashion', label: 'Fashion & Accessories', path: '/explore?category=fashion' },
    { id: 'collectibles', label: 'Collectibles', path: '/explore?category=collectibles' },
    { id: 'vintage', label: 'Vintage Finds', path: '/explore?category=vintage' },
    { id: 'live-auctions', label: 'Live Auctions', path: '/auctions', isLive: true },
    { id: 'upcoming-auctions', label: 'Upcoming Lots', path: '/auctions?tab=upcoming' }
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-color)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
        }}
      >
        {/* Main Header Bar */}
        <div
          className="container"
          style={{
            height: '74px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(12px, 2.5vw, 32px)'
          }}
        >
          {/* Left: Mobile Toggle & Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="mobile-nav-toggle"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                padding: '6px'
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link
              to="/"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.9rem',
                letterSpacing: '0.22em',
                fontWeight: 600,
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                display: 'inline-block',
                lineHeight: 1
              }}
            >
              VEYRA
            </Link>
          </div>

          {/* Center: Prominent Marketplace Search Bar (eBay/Etsy-style) */}
          <div
            className="header-search-container"
            style={{
              flex: '1 1 520px',
              maxWidth: '680px',
              display: 'block'
            }}
          >
            <form
              onSubmit={handleSearchSubmit}
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1.5px solid var(--border-color)',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'var(--bg-primary)',
                overflow: 'hidden',
                transition: 'border-color 150ms ease'
              }}
              className="marketplace-search-form"
            >
              {/* Category Dropdown */}
              <select
                value={selectedSearchCategory}
                onChange={(e) => setSelectedSearchCategory(e.target.value)}
                aria-label="Filter search by category"
                className="hide-on-tablet"
                style={{
                  height: '42px',
                  padding: '0 10px',
                  border: 'none',
                  borderRight: '1px solid var(--border-color)',
                  backgroundColor: 'transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  outline: 'none',
                  cursor: 'pointer',
                  maxWidth: '140px'
                }}
              >
                <option value="all">All Categories</option>
                <option value="art-prints">Art & Prints</option>
                <option value="handmade">Handmade</option>
                <option value="home-living">Home & Living</option>
                <option value="fashion">Fashion</option>
                <option value="collectibles">Collectibles</option>
                <option value="vintage">Vintage Finds</option>
              </select>

              {/* Text Input */}
              <input
                type="text"
                placeholder="Search thousands of artisan pieces, ceramics, vintage finds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  height: '42px',
                  padding: '0 14px',
                  border: 'none',
                  background: 'transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-burgundy"
                style={{
                  height: '42px',
                  padding: '0 18px',
                  borderRadius: 0,
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  cursor: 'pointer'
                }}
              >
                <Search size={15} />
                <span className="hide-on-mobile">Search</span>
              </button>
            </form>
          </div>

          {/* Right: Marketplace Utility Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 1.5vw, 20px)', flexShrink: 0 }}>
            {/* Sell Link */}
            <Link
              to="/sell"
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--accent-burgundy)',
                whiteSpace: 'nowrap'
              }}
              className="hide-on-mobile"
            >
              Sell on Veyra
            </Link>

            <span className="hide-on-mobile" style={{ width: '1px', height: '22px', backgroundColor: 'var(--border-color)' }} />

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              aria-label={`Wishlist with ${wishlistCount} items`}
              style={{
                color: 'var(--text-primary)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
              title="Saved Wishlist"
            >
              <Heart size={20} strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    minWidth: '16px',
                    height: '16px',
                    padding: '0 3px',
                    backgroundColor: 'var(--accent-burgundy)',
                    color: '#FFF',
                    borderRadius: '8px',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Link */}
            <Link
              to="/cart"
              aria-label={`Shopping bag with ${cartCount} items`}
              style={{
                color: 'var(--text-primary)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
              title="Shopping Bag"
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    minWidth: '16px',
                    height: '16px',
                    padding: '0 3px',
                    backgroundColor: 'var(--btn-primary)',
                    color: '#FFF',
                    borderRadius: '8px',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account / Sign In */}
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-primary)',
                    fontWeight: 600
                  }}
                  className="hide-on-mobile"
                >
                  Hi, {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={signOut}
                  className="btn-subtle"
                  style={{ height: '32px', fontSize: '11px', padding: '0 8px' }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="btn btn-primary btn-sm"
                style={{ fontSize: 'var(--text-xs)', height: '36px', padding: '0 14px' }}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Category Subnav Strip (eBay / Etsy style) */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-primary)',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}
          className="category-subnav"
        >
          <div
            className="container"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(14px, 2vw, 24px)',
              height: '40px',
              whiteSpace: 'nowrap'
            }}
          >
            {navCategories.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                style={{
                  fontSize: '12.5px',
                  fontWeight: item.isLive ? 600 : 500,
                  color: item.isLive ? 'var(--accent-burgundy)' : 'var(--text-secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'color 150ms ease'
                }}
                className="subnav-item"
              >
                {item.isLive && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-burgundy)',
                      display: 'inline-block'
                    }}
                  />
                )}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Accessible Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'rgba(25, 25, 25, 0.5)',
            backdropFilter: 'blur(3px)'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '85%',
              maxWidth: '320px',
              backgroundColor: '#FFFFFF',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.12)',
              overflowY: 'auto'
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '16px',
                  borderBottom: '1px solid var(--border-color)',
                  marginBottom: '20px'
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.5rem',
                      letterSpacing: '0.18em',
                      fontWeight: 600,
                      display: 'block'
                    }}
                  >
                    VEYRA
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--accent-burgundy)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                    Marketplace & Live Auctions
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  style={{ padding: '6px' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xs)' }}>
                  <input
                    type="text"
                    placeholder="Search objects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      flex: 1,
                      height: '38px',
                      padding: '0 10px',
                      border: 'none',
                      fontSize: 'var(--text-xs)',
                      outline: 'none'
                    }}
                  />
                  <button type="submit" className="btn-burgundy" style={{ padding: '0 12px', border: 'none' }}>
                    <Search size={14} />
                  </button>
                </div>
              </form>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Main Navigation
                </span>
                <NavLink to="/" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500 }}>
                  Home
                </NavLink>
                <NavLink to="/explore" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500 }}>
                  Explore All Marketplace
                </NavLink>
                <NavLink to="/auctions" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'var(--text-sm)', color: 'var(--accent-burgundy)', fontWeight: 600 }}>
                  🔥 Live Auctions
                </NavLink>
                <NavLink to="/auctions?tab=upcoming" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500 }}>
                  Upcoming Scheduled Lots
                </NavLink>
                <NavLink to="/sell" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500 }}>
                  Sell on Veyra
                </NavLink>
                <NavLink to="/wishlist" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500 }}>
                  Wishlist ({wishlistCount})
                </NavLink>
                <NavLink to="/cart" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500 }}>
                  Shopping Bag ({cartCount})
                </NavLink>

                <div style={{ margin: '10px 0', borderTop: '1px solid var(--border-color)' }} />
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Browse by Medium
                </span>
                {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                  <Link
                    key={c.id}
                    to={`/explore?category=${c.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}
                  >
                    {c.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '20px' }}>
              {user ? (
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Signed in as <strong>{user.name}</strong>
                  </p>
                  <button onClick={signOut} className="btn btn-secondary" style={{ width: '100%', height: '38px', fontSize: 'var(--text-xs)' }}>
                    Sign Out
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Link
                    to="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-primary"
                    style={{ width: '100%', height: '38px', fontSize: 'var(--text-xs)' }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-secondary"
                    style={{ width: '100%', height: '38px', fontSize: 'var(--text-xs)' }}
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        .marketplace-search-form:focus-within {
          border-color: var(--accent-burgundy) !important;
          box-shadow: 0 0 0 2px rgba(120, 59, 75, 0.12);
        }
        .subnav-item:hover {
          color: var(--text-primary) !important;
        }
        @media (max-width: 860px) {
          .hide-on-tablet {
            display: none !important;
          }
        }
        @media (max-width: 680px) {
          .mobile-nav-toggle {
            display: inline-flex !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
