import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  actionText,
  actionLink,
  align = 'left'
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: align === 'center' ? 'center' : 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '40px',
        textAlign: align
      }}
    >
      <div style={{ maxWidth: align === 'center' ? '700px' : '560px', margin: align === 'center' ? '0 auto' : '0' }}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 style={{ marginBottom: description ? '8px' : '0' }}>{title}</h2>
        {description && <p style={{ fontSize: 'var(--text-base)', margin: 0 }}>{description}</p>}
      </div>

      {actionText && actionLink && (
        <Link
          to={actionLink}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            color: 'var(--text-primary)',
            textDecoration: 'none',
            paddingBottom: '2px',
            borderBottom: '1px solid var(--text-primary)',
            transition: 'gap 150ms ease'
          }}
          className="section-action-link"
        >
          <span>{actionText}</span>
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
};
