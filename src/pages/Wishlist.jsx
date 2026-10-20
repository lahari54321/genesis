import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatINR } from '../data/products';

export const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToBag = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px', maxWidth: '600px' }}>
          <span className="eyebrow">Personal Curation</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '8px' }}>
            Saved Objects
          </h1>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
            Your private catalog of contemplated pieces, ceramics, and living heirlooms.
          </p>
        </div>

        {items.length > 0 ? (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'clamp(20px, 3vw, 36px)'
              }}
            >
              {items.map((product) => (
                <div
                  key={product.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-xs)',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '4 / 3',
                      backgroundColor: 'var(--surface-secondary)',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(250, 249, 246, 0.95)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <span className="badge-tag" style={{ marginBottom: '6px' }}>
                        {product.category}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.2rem',
                          fontWeight: 500,
                          lineHeight: 1.25,
                          marginBottom: '4px'
                        }}
                      >
                        {product.name}
                      </h3>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                        {product.seller}
                      </p>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: 'var(--text-md)',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginBottom: '16px'
                        }}
                      >
                        {formatINR(product.price)}
                      </div>

                      <button
                        onClick={() => handleMoveToBag(product)}
                        className="btn btn-primary"
                        style={{ width: '100%', height: '42px', fontSize: 'var(--text-xs)' }}
                      >
                        <ShoppingBag size={15} />
                        <span>Move to Shopping Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div
            style={{
              textAlign: 'center',
              padding: '80px 24px',
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: 'var(--radius-xs)',
              border: '1px dashed var(--border-color)',
              maxWidth: '520px',
              margin: '20px auto'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'var(--accent-earth)'
              }}
            >
              <Heart size={24} strokeWidth={1.5} />
            </div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Your wishlist is empty</h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: 1.6 }}>
              As you explore our collection of ceramics, archival furniture, and living art, save pieces here for quiet contemplation.
            </p>
            <Link to="/explore" className="btn btn-primary">
              <span>Explore collection</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
