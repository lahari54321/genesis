import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Truck } from 'lucide-react';

export const AnnouncementBar = () => {
  return (
    <aside
      aria-label="Marketplace Announcement"
      style={{
        backgroundColor: 'var(--surface-secondary)',
        borderBottom: '1px solid var(--border-color)',
        height: 'var(--announcement-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        letterSpacing: '0.04em',
        color: 'var(--text-secondary)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={13} color="var(--accent-burgundy)" />
            <span>100% Authenticated Provenance</span>
          </span>
          <span className="hide-on-mobile" style={{ opacity: 0.3 }}>|</span>
          <span className="hide-on-mobile" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Truck size={13} />
            <span>Complimentary Insured Delivery on orders over ₹20,000</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--accent-burgundy)', fontWeight: 600 }}>
            <Zap size={12} fill="currentColor" />
            <span>Live Auctions Active</span>
          </span>
          <span style={{ opacity: 0.3 }}>—</span>
          <Link
            to="/auctions"
            style={{
              color: 'var(--text-primary)',
              textDecoration: 'underline',
              fontWeight: 600
            }}
          >
            Enter Bidding Room
          </Link>
        </div>
      </div>
    </aside>
  );
};
