import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, X, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../data/products';

export const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, cartSubtotal, cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Shipping calculation: Free above ₹20,000, otherwise ₹1,200 for insured white-glove transport
  const shippingThreshold = 20000;
  const shippingCost = cartSubtotal > 0 && cartSubtotal >= shippingThreshold ? 0 : (cartSubtotal > 0 ? 1200 : 0);
  const totalAmount = cartSubtotal + shippingCost;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const generatedId = 'VY-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderComplete(true);
    clearCart();
  };

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <span className="eyebrow">Acquisitions</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '8px' }}>
            Shopping Bag ({cartCount})
          </h1>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
            Each object is directly packaged by its independent maker with museum-grade care.
          </p>
        </div>

        {items.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(32px, 5vw, 64px)',
              alignItems: 'flex-start'
            }}
          >
            {/* Bag Items List */}
            <div style={{ flex: '1 1 540px' }}>
              <div
                style={{
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    style={{
                      display: 'flex',
                      gap: '20px',
                      padding: '24px 0',
                      borderBottom: '1px solid var(--border-color)',
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: '100px',
                        height: '110px',
                        backgroundColor: 'var(--surface-secondary)',
                        borderRadius: 'var(--radius-xs)',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <span className="badge-tag" style={{ marginBottom: '4px' }}>
                        {product.category}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.25rem',
                          margin: '0 0 4px 0'
                        }}
                      >
                        {product.name}
                      </h3>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: '0 0 10px 0' }}>
                        Maker: {product.seller} • {product.location}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        {/* Quantity Counter */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-xs)',
                            height: '34px',
                            backgroundColor: '#FFFFFF'
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            aria-label="Decrease quantity"
                            style={{
                              width: '32px',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            <Minus size={13} />
                          </button>
                          <span
                            style={{
                              width: '32px',
                              textAlign: 'center',
                              fontSize: 'var(--text-xs)',
                              fontWeight: 600
                            }}
                          >
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            aria-label="Increase quantity"
                            style={{
                              width: '32px',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Remove Action */}
                        <button
                          onClick={() => removeFromCart(product.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-secondary)',
                            background: 'none'
                          }}
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right', minWidth: '100px' }}>
                      <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {formatINR(product.price * quantity)}
                      </span>
                      {quantity > 1 && (
                        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                          ({formatINR(product.price)} each)
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <Link
                  to="/explore"
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-primary)',
                    textDecoration: 'underline'
                  }}
                >
                  ← Continue exploring collection
                </Link>
                <button
                  onClick={clearCart}
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'underline'
                  }}
                >
                  Clear bag
                </button>
              </div>
            </div>

            {/* Order Summary Card */}
            <div
              style={{
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-xs)',
                padding: '32px',
                position: 'sticky',
                top: '100px'
              }}
            >
              <h3 style={{ fontSize: '1.35rem', marginBottom: '24px' }}>Order Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal ({cartCount} objects)</span>
                  <span style={{ fontWeight: 500 }}>{formatINR(cartSubtotal)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                  <div>
                    <span style={{ color: 'var(--text-secondary)' }}>Insured White-Glove Shipping</span>
                    <p style={{ fontSize: '11px', color: 'var(--accent-earth)', margin: 0 }}>
                      {shippingCost === 0 ? 'Complimentary above ₹20,000' : 'Standard regional carrier'}
                    </p>
                  </div>
                  <span style={{ fontWeight: 500 }}>
                    {shippingCost === 0 ? 'Complimentary' : formatINR(shippingCost)}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Taxes & Atelier Handling</span>
                  <span style={{ fontWeight: 500 }}>Included</span>
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '18px',
                  marginBottom: '28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline'
                }}
              >
                <span style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>Total</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 600, fontFamily: 'var(--font-serif)' }}>
                  {formatINR(totalAmount)}
                </span>
              </div>

              {user ? (
                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    height: '48px',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase'
                  }}
                >
                  <span>Proceed to Simulated Checkout</span>
                  <ArrowRight size={15} />
                </button>
              ) : (
                <button
                  onClick={() => navigate('/signin?redirect=/cart')}
                  className="btn btn-burgundy"
                  style={{
                    width: '100%',
                    height: '48px',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    gap: '8px'
                  }}
                >
                  <Lock size={15} />
                  <span>Sign In to Checkout</span>
                </button>
              )}

              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '11px',
                  color: 'var(--text-secondary)'
                }}
              >
                <ShieldCheck size={16} color="var(--accent-earth)" />
                <span>Museum-standard packing & fully insured transit.</span>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Bag State */
          <div
            style={{
              textAlign: 'center',
              padding: '80px 24px',
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: 'var(--radius-xs)',
              border: '1px dashed var(--border-color)',
              maxWidth: '540px',
              margin: '20px auto'
            }}
          >
            <h2 style={{ fontSize: '1.7rem', marginBottom: '8px' }}>Your shopping bag is empty</h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: 1.6 }}>
              You haven't added any artisan objects to your bag yet. Explore our curated selection of ceramics, bronzes, and living design.
            </p>
            <Link to="/explore" className="btn btn-primary">
              <span>Explore collection</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>

      {/* Simulated Checkout Modal */}
      {checkoutModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(36, 35, 33, 0.65)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setCheckoutModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '520px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-color)',
              padding: '32px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)'
            }}
          >
            {!orderComplete ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Simulated Checkout</h3>
                  <button onClick={() => setCheckoutModalOpen(false)} style={{ color: 'var(--text-secondary)' }}>
                    <X size={20} />
                  </button>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    marginBottom: '20px'
                  }}
                >
                  * Prototype Notice: No genuine charge will occur. Submitting will simulate placing an order.
                </div>

                <form onSubmit={handleCheckoutSubmit}>
                  <div className="form-group">
                    <label className="form-label">Recipient Name</label>
                    <input className="form-input" required defaultValue="Arjun Singhania" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Delivery Address</label>
                    <input className="form-input" required defaultValue="42 Heritage Mansions, Civil Lines" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">City & Postal Code</label>
                    <input className="form-input" required defaultValue="New Delhi, 110054" />
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '16px',
                      marginBottom: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: 600
                    }}
                  >
                    <span>Total Payable</span>
                    <span>{formatINR(totalAmount)}</span>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', height: '46px', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                  >
                    Confirm Simulated Order
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--surface-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: 'var(--success-color)'
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <span className="eyebrow">Acquisition Confirmed</span>
                <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Thank you for your patronship</h2>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Simulated Order Reference: <strong>{orderId}</strong>
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '28px' }}>
                  The atelier has received your acquisition request and will begin preparing white-glove transport.
                </p>
                <button
                  onClick={() => {
                    setCheckoutModalOpen(false);
                    setOrderComplete(false);
                  }}
                  className="btn btn-primary"
                  style={{ width: '100%', height: '44px' }}
                >
                  Return to Marketplace
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
