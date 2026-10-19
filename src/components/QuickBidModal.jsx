import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Hammer, ShieldCheck, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { formatINR } from '../data/products';
import { useAuctions } from '../context/AuctionContext';
import { useAuth } from '../context/AuthContext';

export const QuickBidModal = ({ auction, onClose }) => {
  const { placeBid } = useAuctions();
  const { user } = useAuth();
  const navigate = useNavigate();

  const minRequired = auction ? auction.currentBid + auction.minIncrement : 0;
  const [bidAmount, setBidAmount] = useState(minRequired);
  const [bidderName, setBidderName] = useState(user ? user.name : '');
  const [errorMessage, setErrorMessage] = useState('');
  const [bidSuccess, setBidSuccess] = useState(false);

  // Sync minRequired when auction updates
  useEffect(() => {
    if (auction) {
      setBidAmount(auction.currentBid + auction.minIncrement);
    }
  }, [auction?.currentBid, auction?.minIncrement]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!auction) return null;

  const handlePlaceBid = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const num = Number(bidAmount);

    if (num < minRequired) {
      setErrorMessage(`Your bid must be at least ${formatINR(minRequired)}.`);
      return;
    }

    const res = placeBid(auction.id, num, bidderName.trim() || 'You');
    if (res.success) {
      setBidSuccess(true);
      setTimeout(() => {
        setBidSuccess(false);
      }, 2500);
    } else {
      setErrorMessage(res.error || 'Failed to place bid.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bid-modal-title"
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
          maxWidth: '540px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xs)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-primary)'
          }}
        >
          <div>
            <span className="eyebrow" style={{ marginBottom: 0 }}>
              Simulated Bidding Room
            </span>
            <h3 id="bid-modal-title" style={{ fontSize: '1.25rem', margin: 0 }}>
              {auction.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{ padding: '6px', color: 'var(--text-secondary)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto' }}>
          {/* Item Banner */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '20px'
            }}
          >
            <img
              src={auction.image}
              alt={auction.name}
              style={{
                width: '72px',
                height: '72px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-xs)'
              }}
            />
            <div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>
                {auction.maker} • {auction.category}
              </p>
              <div style={{ marginTop: '4px', display: 'flex', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Current Bid</span>
                  <p style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                    {formatINR(auction.currentBid)}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Min Increment</span>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--accent-earth)', fontWeight: 500, margin: 0 }}>
                    +{formatINR(auction.minIncrement)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bid Success Banner */}
          {bidSuccess && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border-color)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-xs)',
                marginBottom: '20px'
              }}
            >
              <CheckCircle2 size={18} color="var(--success-color)" />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', fontWeight: 500 }}>
                You are currently the highest bidder at {formatINR(auction.currentBid)}!
              </span>
            </div>
          )}

          {/* Bidding Form or Authentication Gate */}
          {user ? (
            <form onSubmit={handlePlaceBid}>
              <div className="form-group">
                <label className="form-label" htmlFor="bidder-name">
                  Your Verified Collector Alias
                </label>
                <input
                  id="bidder-name"
                  type="text"
                  className="form-input"
                  value={bidderName || user.name}
                  onChange={(e) => setBidderName(e.target.value)}
                  placeholder="Enter bidder alias"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="bid-amount">
                  Bid Amount in INR (Minimum required: {formatINR(minRequired)})
                </label>
                <input
                  id="bid-amount"
                  type="number"
                  step="500"
                  min={minRequired}
                  className="form-input"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  required
                />
              </div>

              {/* Quick Increment Shortcuts */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setBidAmount(auction.currentBid + auction.minIncrement)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '11px' }}
                >
                  +Min ({formatINR(auction.minIncrement)})
                </button>
                <button
                  type="button"
                  onClick={() => setBidAmount(auction.currentBid + 5000)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '11px' }}
                >
                  +₹5,000
                </button>
                <button
                  type="button"
                  onClick={() => setBidAmount(auction.currentBid + 10000)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '11px' }}
                >
                  +₹10,000
                </button>
              </div>

              {errorMessage && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--error-color)',
                    fontSize: 'var(--text-xs)',
                    marginBottom: '16px'
                  }}
                >
                  <AlertCircle size={15} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-burgundy"
                style={{ width: '100%', height: '44px', textTransform: 'uppercase', letterSpacing: '0.06em' }}
              >
                <Hammer size={15} />
                <span>Submit Binding Bid ({formatINR(Number(bidAmount) || minRequired)})</span>
              </button>
            </form>
          ) : (
            <div
              style={{
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-xs)',
                padding: '24px',
                textAlign: 'center',
                marginBottom: '20px'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--accent-burgundy)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}
              >
                <Lock size={20} />
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Sign In Required to Place Bids</h4>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
                To maintain auction integrity, all bids require an authenticated account. Please sign in to submit binding bids.
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/signin?redirect=/auctions');
                }}
                className="btn btn-burgundy"
                style={{ width: '100%', height: '42px', fontSize: 'var(--text-xs)', letterSpacing: '0.04em' }}
              >
                <span>Sign In to Place Bids</span>
              </button>
            </div>
          )}

          {/* Demo Note */}
          <p
            style={{
              fontSize: '11px',
              color: 'var(--text-secondary)',
              marginTop: '12px',
              textAlign: 'center'
            }}
          >
            * Interactive Prototype Simulation — Bids update local session state immediately. No real payment required.
          </p>

          {/* Bid History */}
          <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <h4 style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              Recent Bid Activity
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {auction.bidHistory && auction.bidHistory.length > 0 ? (
                auction.bidHistory.slice(0, 5).map((b, idx) => (
                  <div
                    key={b.id || idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 'var(--text-xs)',
                      padding: '6px 8px',
                      backgroundColor: idx === 0 ? 'var(--surface-secondary)' : 'transparent',
                      borderRadius: 'var(--radius-xs)'
                    }}
                  >
                    <span style={{ fontWeight: idx === 0 ? 600 : 400 }}>
                      {b.bidder} {idx === 0 && <span style={{ color: 'var(--accent-earth)' }}>(High Bid)</span>}
                    </span>
                    <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                      {formatINR(b.amount)}
                    </span>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>No bids recorded yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
