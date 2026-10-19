import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search by object, maker, or medium...',
  maxWidth = '460px',
  autoFocus = false
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(value);
      }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        style={{
          width: '100%',
          height: '42px',
          paddingLeft: '38px',
          paddingRight: value ? '36px' : '12px',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xs)',
          backgroundColor: '#FFFFFF',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text-primary)',
          outline: 'none',
          transition: 'border-color var(--transition-fast)'
        }}
      />
      <Search
        size={16}
        color="var(--text-secondary)"
        style={{ position: 'absolute', left: '12px', top: '13px' }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search input"
          style={{
            position: 'absolute',
            right: '10px',
            top: '11px',
            color: 'var(--text-secondary)',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>
      )}
    </form>
  );
};
