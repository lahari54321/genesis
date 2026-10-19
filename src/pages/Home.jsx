import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Flame,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  Store,
  Compass,
  ShoppingBag,
  Hammer,
  Lock,
  Award
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { AuctionCard } from '../components/AuctionCard';
import { UpcomingAuctionRow } from '../components/UpcomingAuctionRow';
import { QuickBidModal } from '../components/QuickBidModal';
import { ProductQuickViewModal } from '../components/ProductQuickViewModal';
import { WhyVeyra } from '../components/WhyVeyra';
import { useProducts } from '../context/ProductsContext';
import { useAuctions } from '../context/AuctionContext';
import { useCart } from '../context/CartContext';
import { formatINR } from '../data/products';

export const Home = () => {
  const { products } = useProducts();
  const { liveAuctions, upcomingAuctions } = useAuctions();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [selectedBidAuction, setSelectedBidAuction] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [trendingTab, setTrendingTab] = useState('all');

  // Spotlight auction (First live lot)
  const spotlightAuction = liveAuctions[0];

  // Category navigation cards
  const categories = [
    {
      id: 'art-prints',
      name: 'Art & Prints',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
      count: '8 lots'
    },
    {
      id: 'handmade',
      name: 'Handmade Ceramics',
      image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=400&q=80',
      count: '12 lots'
    },
    {
      id: 'home-living',
      name: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=400&q=80',
      count: '10 lots'
    },
    {
      id: 'fashion',
      name: 'Fashion & Accessories',
      image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=400&q=80',
      count: '6 lots'
    },
    {
      id: 'collectibles',
      name: 'Collectibles',
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=400&q=80',
      count: '7 lots'
    },
    {
      id: 'vintage',
      name: 'Vintage Finds',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80',
      count: '5 lots'
    }
  ];

  // Filter trending products by tab
  const filteredTrending = products
    .filter((p) => {
      if (trendingTab === 'all') return true;
      if (trendingTab === 'handmade') return p.category.toLowerCase().includes('handmade');
      if (trendingTab === 'vintage') return p.category.toLowerCase().includes('vintage');
      if (trendingTab === 'collectibles') return p.category.toLowerCase().includes('collectibles');
      return true;
    })
    .slice(0, 8);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* 1. Compact Marketplace Hero Section (Useful, not oversized) */}
      <section
        style={{
          borderBottom: '1px solid var(--border-color)',
          paddingTop: '28px',
          paddingBottom: '36px',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(24px, 4vw, 40px)',
              alignItems: 'center'
            }}
          >
            {/* Left: Marketplace Call to Action */}
            <div style={{ maxWidth: '580px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span className="eyebrow" style={{ margin: 0 }}>
                  Curated Shopping & Real-Time Auctions
                </span>
                <span className="tagline-badge">
                  Buy or Bid
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.1rem, 3.4vw, 3rem)',
                  lineHeight: 1.15,
                  marginBottom: '14px',
                  letterSpacing: '-0.01em'
                }}
              >
                Find the extraordinary.
              </h1>

              <p
                style={{
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  marginBottom: '24px'
                }}
              >
                Discover distinctive pieces, meet independent makers, and compete in live auctions for objects worth keeping.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <Link to="/explore" className="btn btn-primary" style={{ height: '44px', padding: '0 20px' }}>
                  <ShoppingBag size={15} />
                  <span>Explore Marketplace</span>
                </Link>

                <Link to="/auctions" className="btn btn-burgundy" style={{ height: '44px', padding: '0 20px' }}>
                  <Hammer size={15} />
                  <span>Enter Live Auctions</span>
                </Link>

                <Link to="/sell" className="btn btn-secondary" style={{ height: '44px' }}>
                  <span>Sell on Veyra</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-color)',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={15} color="var(--accent-burgundy)" />
                  <span>Authenticated Provenance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Truck size={15} color="var(--accent-burgundy)" />
                  <span>White-Glove Insured Delivery</span>
                </div>
              </div>
            </div>

            {/* Right: Dual Spotlight Cards (Live Auction + Direct Buy) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px'
              }}
            >
              {/* Spotlight 1: Live Auction Featured Lot */}
              {spotlightAuction && (
                <div
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    border: '1.5px solid var(--border-color)',
                    borderRadius: 'var(--radius-xs)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10' }}>
                    <img
                      src={spotlightAuction.image}
                      alt={spotlightAuction.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span className="badge-live" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      <span className="dot" />
                      FEATURED LIVE LOT
                    </span>
                  </div>

                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h3
                        style={{
                          fontSize: '1.05rem',
                          margin: '0 0 4px 0',
                          lineHeight: 1.25,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {spotlightAuction.name}
                      </h3>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '0 0 10px 0' }}>
                        {spotlightAuction.maker}
                      </p>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          Current Bid ({spotlightAuction.bidCount} bids)
                        </span>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {formatINR(spotlightAuction.currentBid)}
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedBidAuction(spotlightAuction)}
                        className="btn btn-burgundy btn-sm"
                        style={{ width: '100%', height: '34px', fontSize: '11.5px', textTransform: 'uppercase' }}
                      >
                        <Hammer size={13} />
                        <span>Place Live Bid</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Spotlight 2: Fixed-Price Object of Note */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10' }}>
                  <img
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
                    alt="Natural Sandstone Form"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      padding: '2px 8px',
                      backgroundColor: 'rgba(25, 25, 25, 0.85)',
                      color: '#FFF',
                      fontSize: '10px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      borderRadius: 'var(--radius-xs)'
                    }}
                  >
                    BUY IT NOW
                  </span>
                </div>

                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3
                      style={{
                        fontSize: '1.05rem',
                        margin: '0 0 4px 0',
                        lineHeight: 1.25,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      Solid Sandstone Sculptural Object
                    </h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '0 0 10px 0' }}>
                      Dharohar Craft • Jodhpur, India
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        Fixed Price
                      </span>
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>
                        ₹19,800
                      </span>
                    </div>

                    <Link
                      to="/explore"
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%', height: '34px', fontSize: '11.5px', textTransform: 'uppercase' }}
                    >
                      <ShoppingBag size={13} />
                      <span>Shop Fixed Price</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visual Category Discovery Strip (eBay-style circular/pill shortcuts) */}
      <section
        style={{
          borderBottom: '1px solid var(--border-color)',
          padding: '28px 0',
          backgroundColor: 'var(--bg-primary)'
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.35rem', margin: 0 }}>Explore by Category</h2>
            <Link
              to="/explore"
              style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--accent-burgundy)', textDecoration: 'underline' }}
            >
              See all categories →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '16px'
            }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/explore?category=${cat.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)',
                  transition: 'border-color 150ms ease, transform 150ms ease'
                }}
                className="category-shortcut-chip"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
                <div>
                  <h4 style={{ fontSize: 'var(--text-xs)', fontWeight: 600, margin: '0 0 2px 0', color: 'var(--text-primary)' }}>
                    {cat.name}
                  </h4>
                  <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                    {cat.count}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Live Auctions Section ("The Art of the Bid") */}
      <section
        className="section-spacing"
        style={{
          backgroundColor: 'var(--surface-secondary)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '28px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge-live">
                  <span className="dot" />
                  REAL-TIME BIDDING
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  {liveAuctions.length} Active Lots
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.25rem)', margin: 0 }}>
                The Art of the Bid
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                Compete for verified studio masterworks and authenticated design heirlooms.
              </p>
            </div>

            <Link to="/auctions" className="btn btn-secondary btn-sm" style={{ backgroundColor: '#FFFFFF' }}>
              <span>View All Live Lots</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* 4 Live Auction Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '20px'
            }}
          >
            {liveAuctions.map((auction) => (
              <AuctionCard
                key={auction.id}
                auction={auction}
                onOpenBidModal={setSelectedBidAuction}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trending Marketplace Products Grid */}
      <section className="section-spacing" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px'
            }}
          >
            <div>
              <span className="eyebrow">Buy It Now</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.25rem)', margin: 0 }}>
                Trending Marketplace Finds
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                Fixed-price objects available for immediate purchase direct from artisan ateliers.
              </p>
            </div>

            {/* Quick Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
              <button
                onClick={() => setTrendingTab('all')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: trendingTab === 'all' ? '1px solid var(--btn-primary)' : '1px solid var(--border-color)',
                  backgroundColor: trendingTab === 'all' ? 'var(--btn-primary)' : 'transparent',
                  color: trendingTab === 'all' ? '#FFF' : 'var(--text-secondary)'
                }}
              >
                All Pieces
              </button>
              <button
                onClick={() => setTrendingTab('handmade')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: trendingTab === 'handmade' ? '1px solid var(--btn-primary)' : '1px solid var(--border-color)',
                  backgroundColor: trendingTab === 'handmade' ? 'var(--btn-primary)' : 'transparent',
                  color: trendingTab === 'handmade' ? '#FFF' : 'var(--text-secondary)'
                }}
              >
                Ceramics
              </button>
              <button
                onClick={() => setTrendingTab('vintage')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: trendingTab === 'vintage' ? '1px solid var(--btn-primary)' : '1px solid var(--border-color)',
                  backgroundColor: trendingTab === 'vintage' ? 'var(--btn-primary)' : 'transparent',
                  color: trendingTab === 'vintage' ? '#FFF' : 'var(--text-secondary)'
                }}
              >
                Vintage
              </button>
              <button
                onClick={() => setTrendingTab('collectibles')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: trendingTab === 'collectibles' ? '1px solid var(--btn-primary)' : '1px solid var(--border-color)',
                  backgroundColor: trendingTab === 'collectibles' ? 'var(--btn-primary)' : 'transparent',
                  color: trendingTab === 'collectibles' ? '#FFF' : 'var(--text-secondary)'
                }}
              >
                Collectibles
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 'clamp(16px, 2.5vw, 24px)'
            }}
          >
            {filteredTrending.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

          {/* View Catalog Button */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/explore" className="btn btn-secondary" style={{ padding: '0 28px' }}>
              <span>View All {products.length} Marketplace Objects</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Upcoming Auctions Section */}
      <section className="section-spacing" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '24px'
            }}
          >
            <div>
              <span className="eyebrow">Catalog Schedule</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.25rem)', margin: 0 }}>
                Upcoming Auction Sessions
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                Preview forthcoming lots. Set a reminder to receive an alert when bidding opens.
              </p>
            </div>

            <Link
              to="/auctions?tab=upcoming"
              style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--accent-burgundy)', textDecoration: 'underline' }}
            >
              View full auction calendar →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF', padding: '0 20px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xs)' }}>
            {upcomingAuctions.map((auction) => (
              <UpcomingAuctionRow key={auction.id} auction={auction} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Marketplace Trust & Buyer Protection Bar */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-color)',
          padding: '36px 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px'
            }}
          >
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ padding: '8px', backgroundColor: 'var(--surface-secondary)', borderRadius: 'var(--radius-xs)', color: 'var(--accent-burgundy)' }}>
                <Award size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 2px 0' }}>Authenticity Guarantee</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                  Every lot is thoroughly authenticated by archival specialists before release.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ padding: '8px', backgroundColor: 'var(--surface-secondary)', borderRadius: 'var(--radius-xs)', color: 'var(--accent-burgundy)' }}>
                <Lock size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 2px 0' }}>Escrow Protection</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                  Funds remain protected in verified escrow until your item is delivered intact.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ padding: '8px', backgroundColor: 'var(--surface-secondary)', borderRadius: 'var(--radius-xs)', color: 'var(--accent-burgundy)' }}>
                <Truck size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 2px 0' }}>Insured Global Transit</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                  Complimentary white-glove packaging with full transit insurance.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ padding: '8px', backgroundColor: 'var(--surface-secondary)', borderRadius: 'var(--radius-xs)', color: 'var(--accent-burgundy)' }}>
                <Store size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 2px 0' }}>Direct Artisan Atelier</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                  Support independent master ceramists, woodturners, and fine art studios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Seller Recruitment Section */}
      <section
        style={{
          padding: 'clamp(44px, 5vw, 64px) 0',
          backgroundColor: 'var(--surface-secondary)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid var(--border-color)',
              borderRadius: 'var(--radius-xs)',
              padding: 'clamp(28px, 4vw, 48px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '28px'
            }}
          >
            <div style={{ maxWidth: '620px' }}>
              <span className="eyebrow">Become a Veyra Maker</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.2rem)', marginBottom: '8px' }}>
                Reach passionate collectors across India & globally.
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                List your handmade ceramics, fine art prints, furniture, or rare collectibles. Enjoy transparent fee structures, dedicated maker support, and direct access to serious buyers.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/sell" className="btn btn-burgundy" style={{ height: '44px', padding: '0 20px' }}>
                <Store size={15} />
                <span>Start Selling on Veyra</span>
              </Link>
              <Link to="/explore" className="btn btn-secondary" style={{ height: '44px' }}>
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Why Veyra Pillars */}
      <WhyVeyra />

      {/* Modals */}
      {selectedBidAuction && (
        <QuickBidModal
          auction={selectedBidAuction}
          onClose={() => setSelectedBidAuction(null)}
        />
      )}

      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      <style>{`
        .category-shortcut-chip:hover {
          border-color: var(--accent-burgundy) !important;
          transform: translateY(-2px);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
};
