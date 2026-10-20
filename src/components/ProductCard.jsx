import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, CheckCircle2, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../data/products';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xs)',
        overflow: 'hidden'
      }}
      className="marketplace-product-card card-interactive"
    >
      {/* Product Image Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          backgroundColor: 'var(--surface-secondary)',
          overflow: 'hidden',
          cursor: onQuickView ? 'pointer' : 'default'
        }}
        onClick={() => onQuickView && onQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.35s ease, opacity 0.3s ease',
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
            opacity: imageLoaded ? 1 : 0
          }}
        />

        {/* Category Pill on Image */}
        <span
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            padding: '3px 7px',
            backgroundColor: 'rgba(248, 247, 244, 0.92)',
            backdropFilter: 'blur(4px)',
            fontSize: '10px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--text-secondary)',
            borderRadius: 'var(--radius-xs)'
          }}
        >
          {product.category}
        </span>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFavorited ? 'var(--accent-burgundy)' : 'var(--text-primary)',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
            transition: 'transform 150ms ease',
            zIndex: 3
          }}
          title={isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={15} fill={isFavorited ? 'currentColor' : 'none'} strokeWidth={1.75} />
        </button>

        {/* Quick View Hover Pill */}
        {onQuickView && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '4px 10px',
              backgroundColor: 'rgba(25, 25, 25, 0.85)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-xs)',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 180ms ease',
              pointerEvents: 'none'
            }}
          >
            <Eye size={12} />
            <span>Quick View</span>
          </div>
        )}
      </div>

      {/* Product Details & Purchasing Actions */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Seller & Verification */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
            <span
              style={{
                fontSize: '11px',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {product.seller}
            </span>
            <CheckCircle2 size={12} color="var(--accent-burgundy)" />
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.15rem',
              fontWeight: 500,
              lineHeight: 1.25,
              color: 'var(--text-primary)',
              margin: '0 0 8px 0',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.5em'
            }}
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Price & Shipping Info */}
          <div style={{ marginBottom: '14px' }}>
            <div
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '0.01em',
                lineHeight: 1
              }}
            >
              {formatINR(product.price)}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
              <span className="badge-shipping">
                Free Insured Delivery
              </span>
              {product.location && (
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  • {product.location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Direct Action Button */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleAddToCart}
            className="btn btn-sm"
            style={{
              flex: 1,
              height: '38px',
              fontSize: '12px',
              fontWeight: 600,
              gap: '6px',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: justAdded ? 'var(--success-color)' : 'var(--btn-primary)',
              color: '#FFFFFF',
              border: `1px solid ${justAdded ? 'var(--success-color)' : 'var(--btn-primary)'}`,
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {justAdded ? <CheckCircle2 size={14} color="#FFF" /> : <ShoppingBag size={14} />}
            <span>{justAdded ? 'Added to Bag' : 'Add to Bag'}</span>
          </button>

          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="btn btn-secondary btn-sm"
              style={{
                width: '38px',
                height: '38px',
                padding: 0,
                borderRadius: 'var(--radius-xs)'
              }}
              title="View object specifications"
              aria-label={`View ${product.name} specifications`}
            >
              <Eye size={15} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
