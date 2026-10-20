import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { AuctionCard } from '../components/AuctionCard';
import { UpcomingAuctionRow } from '../components/UpcomingAuctionRow';
import { QuickBidModal } from '../components/QuickBidModal';
import { SearchBar } from '../components/SearchBar';
import { useAuctions } from '../context/AuctionContext';
import { Info, Calendar, Filter } from 'lucide-react';

export const Auctions = () => {
  const { liveAuctions, upcomingAuctions } = useAuctions();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get('tab') || 'all';
  const [activeTab, setActiveTab] = useState(tabParam); // 'all', 'live', 'upcoming'
  const [selectedBidAuction, setSelectedBidAuction] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    if (newTab === 'all') {
      searchParams.delete('tab');
    } else {
      searchParams.set('tab', newTab);
    }
    setSearchParams(searchParams);
  };

  // Filtered live auctions
  const filteredLiveAuctions = useMemo(() => {
    return liveAuctions.filter((auc) => {
      const matchesSearch =
        auc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        auc.maker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        auc.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' ||
        auc.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [liveAuctions, searchQuery, selectedCategory]);

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '680px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="eyebrow" style={{ margin: 0 }}>
              The Curated Bidding Room
            </span>
            <span className="tagline-badge">
              Real-Time Bids
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '12px' }}>
            The art of the bid.
          </h1>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            Compete in real time for authenticated archival design, single-edition ceramic masterworks, and rare artisan prototypes.
          </p>
        </div>

        {/* Prototype Demo Banner */}
        <div
          style={{
            backgroundColor: 'var(--surface-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xs)',
            padding: '16px 20px',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}
        >
          <Info size={18} color="var(--accent-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Simulated Auction Experience: </strong>
            This marketplace prototype features live countdown timers and simulated client-side bidding with minimum-increment validation. No financial payment is processed, and bids persist within your browser session.
          </div>
        </div>

        {/* Section Tabs & Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '20px',
            marginBottom: '40px'
          }}
        >
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => handleTabChange('all')}
              style={{
                padding: '8px 16px',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                border: activeTab === 'all' ? '1px solid var(--btn-primary)' : '1px solid var(--border-color)',
                backgroundColor: activeTab === 'all' ? 'var(--btn-primary)' : '#FFFFFF',
                color: activeTab === 'all' ? '#FFFFFF' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-xs)',
                fontWeight: activeTab === 'all' ? 600 : 400,
                transition: 'all 150ms ease'
              }}
            >
              All Lots ({liveAuctions.length + upcomingAuctions.length})
            </button>

            <button
              onClick={() => handleTabChange('live')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                border: activeTab === 'live' ? '1px solid var(--btn-primary)' : '1px solid var(--border-color)',
                backgroundColor: activeTab === 'live' ? 'var(--btn-primary)' : '#FFFFFF',
                color: activeTab === 'live' ? '#FFFFFF' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-xs)',
                fontWeight: activeTab === 'live' ? 600 : 400,
                transition: 'all 150ms ease'
              }}
            >
              <span className="dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: activeTab === 'live' ? '#FFF' : 'var(--accent-burgundy)' }} />
              <span>Live Now ({liveAuctions.length})</span>
            </button>

            <button
              onClick={() => handleTabChange('upcoming')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                border: activeTab === 'upcoming' ? '1px solid var(--btn-primary)' : '1px solid var(--border-color)',
                backgroundColor: activeTab === 'upcoming' ? 'var(--btn-primary)' : '#FFFFFF',
                color: activeTab === 'upcoming' ? '#FFFFFF' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-xs)',
                fontWeight: activeTab === 'upcoming' ? 600 : 400,
                transition: 'all 150ms ease'
              }}
            >
              <Calendar size={13} />
              <span>Upcoming ({upcomingAuctions.length})</span>
            </button>
          </div>

          {/* Search Bar for Live Auctions */}
          {activeTab !== 'upcoming' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search auctions by lot or artisan..."
                maxWidth="280px"
              />
            </div>
          )}
        </div>

        {/* Live Section */}
        {(activeTab === 'all' || activeTab === 'live') && (
          <section style={{ marginBottom: '64px' }}>
            <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge-live" style={{ marginBottom: '6px' }}>
                  <span className="dot" />
                  LIVE SESSIONS
                </span>
                <h2 style={{ fontSize: '1.75rem' }}>Active Lots In Progress</h2>
              </div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                Showing <strong>{filteredLiveAuctions.length}</strong> active lots
              </span>
            </div>

            {filteredLiveAuctions.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '28px'
                }}
              >
                {filteredLiveAuctions.map((auction) => (
                  <AuctionCard
                    key={auction.id}
                    auction={auction}
                    onOpenBidModal={setSelectedBidAuction}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '48px 20px',
                  backgroundColor: 'var(--surface-secondary)',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px dashed var(--border-color)'
                }}
              >
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  No live auctions match "{searchQuery}".
                </p>
              </div>
            )}
          </section>
        )}

        {/* Upcoming Section */}
        {(activeTab === 'all' || activeTab === 'upcoming') && (
          <section style={{ borderTop: activeTab === 'all' ? '1px solid var(--border-color)' : 'none', paddingTop: activeTab === 'all' ? '48px' : 0 }}>
            <div style={{ marginBottom: '28px' }}>
              <span className="eyebrow">Scheduled Calendar</span>
              <h2 style={{ fontSize: '1.75rem' }}>Forthcoming Catalog Openings</h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Set an alert to receive an instant notification when bidding opens for these curated lots.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {upcomingAuctions.map((auction) => (
                <UpcomingAuctionRow key={auction.id} auction={auction} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Quick Bid Modal */}
      {selectedBidAuction && (
        <QuickBidModal
          auction={selectedBidAuction}
          onClose={() => setSelectedBidAuction(null)}
        />
      )}
    </div>
  );
};
