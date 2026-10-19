import React from 'react';
import { formatINR } from '../data/products';
import { useAuctions } from '../context/AuctionContext';
import { Bell, Check, Calendar } from 'lucide-react';

export const UpcomingAuctionRow = ({ auction }) => {
  const { isReminderSet, toggleReminder } = useAuctions();
  const reminderActive = isReminderSet(auction.id);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px 0',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background-color 150ms ease'
      }}
      className="upcoming-auction-row"
    >
      {/* Left Thumbnail & Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 320px' }}>
        <div
          style={{
            width: '84px',
            height: '84px',
            flexShrink: 0,
            borderRadius: 'var(--radius-xs)',
            overflow: 'hidden',
            backgroundColor: 'var(--surface-secondary)'
          }}
        >
          <img
            src={auction.thumbnail}
            alt={auction.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div>
          <span className="badge-tag" style={{ marginBottom: '4px' }}>
            {auction.category}
          </span>
          <h4
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              fontWeight: 500,
              lineHeight: 1.25,
              marginBottom: '4px',
              color: 'var(--text-primary)'
            }}
          >
            {auction.name}
          </h4>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>
            {auction.maker} {auction.curatorNote ? `— ${auction.curatorNote}` : ''}
          </p>
        </div>
      </div>

      {/* Middle: Schedule */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '180px' }}>
        <Calendar size={15} color="var(--accent-earth)" />
        <div>
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              display: 'block'
            }}
          >
            Opening Session
          </span>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--text-primary)' }}>
            {auction.scheduledDate}
          </span>
        </div>
      </div>

      {/* Right: Starting Bid & Remind Me Action */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <div>
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              display: 'block'
            }}
          >
            Starting Bid
          </span>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
            {formatINR(auction.startingBid)}
          </span>
        </div>

        <button
          onClick={() => toggleReminder(auction.id)}
          className={`btn ${reminderActive ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          style={{
            height: '38px',
            gap: '6px',
            fontSize: 'var(--text-xs)'
          }}
          aria-label={reminderActive ? `Reminder active for ${auction.name}` : `Set reminder for ${auction.name}`}
        >
          {reminderActive ? <Check size={14} /> : <Bell size={14} />}
          <span>{reminderActive ? 'Reminder Set' : 'Remind Me'}</span>
        </button>
      </div>
    </div>
  );
};
