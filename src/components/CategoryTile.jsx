import React from 'react';
import { Link } from 'react-router-dom';

export const CategoryTile = ({ category }) => {
  return (
    <Link
      to={`/explore?category=${category.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        position: 'relative'
      }}
      className="category-tile"
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          backgroundColor: 'var(--surface-secondary)',
          overflow: 'hidden',
          borderRadius: 'var(--radius-xs)',
          marginBottom: '12px',
          position: 'relative'
        }}
      >
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          className="category-tile-img"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(25, 25, 25, 0.08)',
            transition: 'background-color 200ms ease'
          }}
          className="category-tile-overlay"
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            fontWeight: 500,
            margin: '0 0 2px 0',
            color: 'var(--text-primary)',
            lineHeight: 1.2
          }}
        >
          {category.name}
        </h3>
        <span
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)'
          }}
        >
          {category.subtitle}
        </span>
      </div>

      <style>{`
        .category-tile:hover .category-tile-img {
          transform: scale(1.04);
        }
        .category-tile:hover .category-tile-overlay {
          background-color: rgba(25, 25, 25, 0.02);
        }
      `}</style>
    </Link>
  );
};
