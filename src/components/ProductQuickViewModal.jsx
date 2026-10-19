import React, { useEffect } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { formatINR } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductQuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
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
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '780px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xs)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          maxHeight: '90vh'
        }}
      >
        {/* Left: Image */}
        <div style={{ backgroundColor: 'var(--surface-secondary)', position: 'relative', minHeight: '340px' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Right: Content */}
        <div
          style={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span className="eyebrow" style={{ marginBottom: 0 }}>
                {product.category}
              </span>
              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{ color: 'var(--text-secondary)', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <h2 id="product-modal-title" style={{ fontSize: '1.65rem', marginBottom: '6px' }}>
              {product.name}
            </h2>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Crafted by <strong>{product.seller}</strong> • {product.location}
            </p>

            <div
              style={{
                fontSize: '1.35rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '20px'
              }}
            >
              {formatINR(product.price)}
            </div>

            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: '20px' }}>
              {product.description}
            </p>

            {/* Attributes */}
            <div
              style={{
                borderTop: '1px solid var(--border-color)',
                borderBottom: '1px solid var(--border-color)',
                padding: '14px 0',
                marginBottom: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: 'var(--text-xs)'
              }}
            >
              {product.materials && (
                <div style={{ display: 'flex' }}>
                  <span style={{ width: '100px', color: 'var(--text-secondary)' }}>Materials:</span>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{product.materials}</span>
                </div>
              )}
              {product.dimensions && (
                <div style={{ display: 'flex' }}>
                  <span style={{ width: '100px', color: 'var(--text-secondary)' }}>Dimensions:</span>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{product.dimensions}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => {
                addToCart(product, 1);
                onClose();
              }}
              className="btn btn-primary"
              style={{ flex: 1, height: '46px' }}
            >
              <ShoppingBag size={16} />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className="btn btn-secondary"
              style={{ width: '46px', padding: 0 }}
              aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart size={18} fill={isFavorited ? 'var(--accent-earth)' : 'none'} color={isFavorited ? 'var(--accent-earth)' : 'currentColor'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
