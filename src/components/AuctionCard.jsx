import React, { useState } from 'react';
import { formatINR } from '../data/products';
import { Clock, Hammer, ShieldCheck, Flame } from 'lucide-react';

export const AuctionCard = ({ auction, onOpenBidModal }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const remaining = auction.remainingSeconds ?? 0;

  const formatCountdown = (totalSeconds) => {
    if (totalSeconds <= 0) return 'Concluded';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  };

  const isLive = remaining > 0;

  return (
    <article
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xs)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      className="marketplace-auction-card card-interactive"
    >
      {/* Visual Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 11',
          backgroundColor: 'var(--surface-secondary)',
          overflow: 'hidden',
          cursor: isLive ? 'pointer' : 'default'
        }}
        onClick={() => isLive && onOpenBidModal(auction)}
      >
        <img
          src={auction.image}
          alt={auction.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease, transform 0.3s ease'
          }}
          className="auction-img"
        />

        {/* Live Badge Indicator */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
          {isLive ? (
            <span className="badge-live">
              <span className="dot" />
              LIVE AUCTION
            </span>
          ) : (
            <span
              style={{
                fontSize: '11px',
                padding: '3px 8px',
                backgroundColor: 'rgba(25, 25, 25, 0.75)',
                color: '#FFF',
                letterSpacing: '0.05em',
                borderRadius: 'var(--radius-xs)',
                fontWeight: 600
              }}
            >
              CONCLUDED
            </span>
          )}
        </div>

        {/* Provenance Pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            backgroundColor: 'rgba(248, 247, 244, 0.92)',
            padding: '3px 8px',
            borderRadius: 'var(--radius-xs)',
            fontSize: '10.5px',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            backdropFilter: 'blur(4px)',
            maxWidth: 'calc(100% - 24px)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {auction.provenance || auction.maker}
        </div>
      </div>

      {/* Auction Info */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <span className="badge-tag" style={{ marginBottom: '6px' }}>
            {auction.category}
          </span>

          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              fontWeight: 500,
              lineHeight: 1.25,
              marginBottom: '6px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.5em'
            }}
            title={auction.name}
          >
            {auction.name}
          </h3>

          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-secondary)',
              lineHeight: 1.45,
              marginBottom: '14px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {auction.description}
          </p>
        </div>

        {/* Bid Status & Timer */}
        <div>
          <div
            style={{
              backgroundColor: 'var(--surface-secondary)',
              padding: '10px 12px',
              borderRadius: 'var(--radius-xs)',
              marginBottom: '12px',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '8px'
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  display: 'block',
                  fontWeight: 600
                }}
              >
                Current Bid ({auction.bidCount} bids)
              </span>
              <span
                style={{
                  fontSize: 'var(--text-md)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {formatINR(auction.currentBid)}
              </span>
            </div>

            <div>
              <span
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  display: 'block',
                  fontWeight: 600
                }}
              >
                Time Left
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: isLive ? 'var(--accent-burgundy)' : 'var(--text-secondary)',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                <Clock size={12} strokeWidth={2} />
                <span>{formatCountdown(remaining)}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onOpenBidModal(auction)}
            disabled={!isLive}
            className={`btn ${isLive ? 'btn-burgundy' : 'btn-secondary'}`}
            style={{
              width: '100%',
              height: '38px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              gap: '6px'
            }}
          >
            <Hammer size={14} />
            <span>{isLive ? 'View & Place Bid' : 'Auction Ended'}</span>
          </button>
        </div>
      </div>

      <style>{`
        .marketplace-auction-card:hover {
          border-color: #cfc8be;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          transform: translateY(-2px);
        }
        .marketplace-auction-card:hover .auction-img {
          transform: scale(1.03);
        }
      `}</style>
    </article>
  );
};
