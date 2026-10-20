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
  Award,
  ChevronRight,
  CheckCircle2
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

  // Recently added pieces (latest 4 from catalog)
  const recentlyAdded = products.slice(-4).reverse();

  // Helper to format countdown timer for spotlight
  const formatCountdown = (totalSeconds) => {
    if (!totalSeconds || totalSeconds <= 0) return 'Concluded';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  };

  // Category visual showcase
  const categories = [
    {
      id: 'art-prints',
      name: 'Art & Prints',
      subtitle: 'Monotypes, etchings & archival works',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
      count: '8 curated lots'
    },
    {
      id: 'handmade',
      name: 'Handmade Ceramics',
      subtitle: 'Wood-fired stoneware & porcelain',
      image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80',
      count: '12 curated lots'
    },
    {
      id: 'home-living',
      name: 'Home & Living',
      subtitle: 'Bronze candlesticks & sculptural objects',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
      count: '10 curated lots'
    },
    {
      id: 'fashion',
      name: 'Fashion & Accessories',
      subtitle: 'Hand-loomed textiles & artisanal jewelry',
      image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80',
      count: '6 curated lots'
    },
    {
      id: 'collectibles',
      name: 'Collectibles',
      subtitle: 'Carved basalt, silver & heirloom pieces',
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80',
      count: '7 curated lots'
    },
    {
      id: 'vintage',
      name: 'Vintage Finds',
      subtitle: 'Mid-century modern & archival furniture',
      image: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=600&q=80',
      count: '5 curated lots'
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
      {/* ====================================================================
          1. PREMIUM EDITORIAL HERO SECTION
          ==================================================================== */}
      <section
        style={{
          borderBottom: '1px solid var(--border-color)',
          paddingTop: 'clamp(32px, 5vw, 56px)',
          paddingBottom: 'clamp(36px, 5vw, 64px)',
          backgroundColor: '#FFFFFF',
          position: 'relative'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(32px, 5vw, 56px)',
              alignItems: 'center'
            }}
          >
            {/* Left: Editorial Proposition */}
            <div style={{ maxWidth: '580px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span className="eyebrow" style={{ margin: 0 }}>
                  Curated Shopping & Real-Time Auctions
                </span>
                <span className="tagline-badge">
                  Live Edition
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
                  lineHeight: 1.12,
                  marginBottom: '18px',
                  letterSpacing: '-0.015em',
                  color: 'var(--text-primary)'
                }}
              >
                Find something worth the chase.
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  marginBottom: '32px'
                }}
              >
                Shop distinctive finds, discover hidden gems, and make your next great bid on Veyra.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '36px' }}>
                <Link
                  to="/explore"
                  className="btn btn-primary"
                  style={{
                    height: '48px',
                    padding: '0 24px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    letterSpacing: '0.04em'
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Explore Collection</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  to="/auctions"
                  className="btn btn-burgundy"
                  style={{
                    height: '48px',
                    padding: '0 22px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    letterSpacing: '0.04em'
                  }}
                >
                  <Hammer size={16} />
                  <span>Discover Auctions</span>
                </Link>

                <Link
                  to="/sell"
                  className="btn btn-secondary"
                  style={{
                    height: '48px',
                    padding: '0 20px',
                    fontSize: 'var(--text-sm)'
                  }}
                >
                  <span>Sell on Veyra</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border-color)',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={16} color="var(--accent-burgundy)" />
                  <span style={{ fontWeight: 500 }}>Authenticated Provenance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={16} color="var(--accent-burgundy)" />
                  <span style={{ fontWeight: 500 }}>Direct Artisan Ateliers</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={16} color="var(--accent-burgundy)" />
                  <span style={{ fontWeight: 500 }}>Escrow-Secured Purchases</span>
                </div>
              </div>
            </div>

            {/* Right: Imposing Editorial Showcase Visual with Live Auction Teaser */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 13',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--surface-secondary)',
                  boxShadow: '0 20px 48px rgba(0, 0, 0, 0.08)',
                  border: '1px solid var(--border-color)'
                }}
                className="image-zoom-container"
              >
                <img
                  src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85"
                  alt="Curated Stoneware & Architectural Object"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Floating Top Label */}
                <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 2 }}>
                  <span className="glass-pill">
                    <span className="badge-live" style={{ padding: 0, border: 'none', background: 'none' }}>
                      <span className="dot" />
                    </span>
                    <span>LIVE LOT IN SESSION</span>
                  </span>
                </div>

                {/* Floating Bottom Card: Spotlight Live Auction Lot */}
                {spotlightAuction && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      right: '16px',
                      background: 'rgba(248, 247, 244, 0.95)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(226, 221, 213, 0.9)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '14px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <div style={{ flex: '1 1 240px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          fontWeight: 700,
                          color: 'var(--accent-burgundy)',
                          display: 'block',
                          marginBottom: '2px'
                        }}
                      >
                        Featured Auction • {spotlightAuction.category}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.2rem',
                          margin: '0 0 2px 0',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        title={spotlightAuction.name}
                      >
                        {spotlightAuction.name}
                      </h3>
                      <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)' }}>
                        {spotlightAuction.maker} • {spotlightAuction.provenance}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexShrink: 0 }}>
                      <div style={{ textAlign: 'right' }}>
                        <span
                          style={{
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            color: 'var(--text-secondary)',
                            fontWeight: 600,
                            display: 'block'
                          }}
                        >
                          Current Bid ({spotlightAuction.bidCount} bids)
                        </span>
                        <div
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            fontVariantNumeric: 'tabular-nums',
                            lineHeight: 1.1
                          }}
                        >
                          {formatINR(spotlightAuction.currentBid)}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedBidAuction(spotlightAuction)}
                        className="btn btn-burgundy btn-sm"
                        style={{
                          height: '38px',
                          padding: '0 16px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          fontSize: '11.5px',
                          fontWeight: 600
                        }}
                      >
                        <Hammer size={13} />
                        <span>Quick Bid</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. FEATURED CATEGORIES
          ==================================================================== */}
      <section
        style={{
          borderBottom: '1px solid var(--border-color)',
          padding: 'clamp(44px, 5vw, 64px) 0',
          backgroundColor: 'var(--bg-primary)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '28px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <span className="eyebrow">Discovery by Discipline</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.25rem)', margin: 0 }}>
                Featured Categories
              </h2>
            </div>

            <Link
              to="/explore"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--accent-burgundy)',
                textDecoration: 'underline',
                letterSpacing: '0.03em'
              }}
            >
              Browse complete directory →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/explore?category=${cat.id}`}
                className="category-hero-tile card-interactive"
                style={{
                  position: 'relative',
                  height: '200px',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '24px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1,
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="cat-bg-img"
                />

                {/* Dark Vignette Overlay for Readability */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to top, rgba(20, 19, 18, 0.88) 0%, rgba(20, 19, 18, 0.35) 60%, rgba(20, 19, 18, 0.1) 100%)',
                    zIndex: 2
                  }}
                />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <span
                    style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.8)',
                      display: 'block',
                      marginBottom: '4px'
                    }}
                  >
                    {cat.count}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.45rem',
                      fontWeight: 500,
                      color: '#FFFFFF',
                      margin: '0 0 2px 0'
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '11.5px',
                      color: 'rgba(255, 255, 255, 0.82)',
                      margin: 0
                    }}
                  >
                    {cat.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. THE LIVE AUCTION FLOOR
          ==================================================================== */}
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
              marginBottom: '32px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge-live">
                  <span className="dot" />
                  REAL-TIME BIDDING
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  {liveAuctions.length} Verified Live Lots
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.85rem, 3vw, 2.4rem)', margin: 0 }}>
                The Live Auction Floor
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: '6px 0 0 0' }}>
                Compete in real time for verified studio masterworks, rare prototypes, and authenticated design heirlooms.
              </p>
            </div>

            <Link to="/auctions" className="btn btn-secondary btn-sm" style={{ backgroundColor: '#FFFFFF' }}>
              <span>View All Live Lots</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Live Auction Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
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

      {/* ====================================================================
          4. TRENDING MARKETPLACE PRODUCTS (BUY IT NOW)
          ==================================================================== */}
      <section
        className="section-spacing"
        style={{
          backgroundColor: '#FFFFFF',
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
              <span className="eyebrow">Direct Atelier Acquisition</span>
              <h2 style={{ fontSize: 'clamp(1.85rem, 3vw, 2.4rem)', margin: 0 }}>
                Trending Marketplace Finds
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: '6px 0 0 0' }}>
                Fixed-price objects available for immediate acquisition direct from independent makers.
              </p>
            </div>

            {/* Quick Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
              <button
                onClick={() => setTrendingTab('all')}
                style={{
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: trendingTab === 'all' ? '1px solid var(--btn-primary)' : '1px solid var(--border-color)',
                  backgroundColor: trendingTab === 'all' ? 'var(--btn-primary)' : 'transparent',
                  color: trendingTab === 'all' ? '#FFF' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                All Pieces
              </button>
              <button
                onClick={() => setTrendingTab('handmade')}
                style={{
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: trendingTab === 'handmade' ? '1px solid var(--btn-primary)' : '1px solid var(--border-color)',
                  backgroundColor: trendingTab === 'handmade' ? 'var(--btn-primary)' : 'transparent',
                  color: trendingTab === 'handmade' ? '#FFF' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                Ceramics
              </button>
              <button
                onClick={() => setTrendingTab('vintage')}
                style={{
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: trendingTab === 'vintage' ? '1px solid var(--btn-primary)' : '1px solid var(--border-color)',
                  backgroundColor: trendingTab === 'vintage' ? 'var(--btn-primary)' : 'transparent',
                  color: trendingTab === 'vintage' ? '#FFF' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                Vintage
              </button>
              <button
                onClick={() => setTrendingTab('collectibles')}
                style={{
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: trendingTab === 'collectibles' ? '1px solid var(--btn-primary)' : '1px solid var(--border-color)',
                  backgroundColor: trendingTab === 'collectibles' ? 'var(--btn-primary)' : 'transparent',
                  color: trendingTab === 'collectibles' ? '#FFF' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
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
          <div style={{ textAlign: 'center', marginTop: '44px' }}>
            <Link to="/explore" className="btn btn-secondary" style={{ padding: '0 32px', height: '46px' }}>
              <span>View All {products.length} Marketplace Objects</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. RECENTLY ADDED FINDS (FRESH FROM THE ATELIERS)
          ==================================================================== */}
      <section
        className="section-spacing"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: '14px',
              marginBottom: '28px'
            }}
          >
            <div>
              <span className="eyebrow">Fresh From The Ateliers</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.25rem)', margin: 0 }}>
                Recently Added Finds
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                New singular creations and archival collector acquisitions introduced to the catalog this week.
              </p>
            </div>

            <Link
              to="/explore?sort=newest"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--accent-burgundy)',
                textDecoration: 'underline'
              }}
            >
              Explore latest arrivals →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 'clamp(16px, 2.5vw, 24px)'
            }}
          >
            {recentlyAdded.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. UPCOMING AUCTION SESSIONS
          ==================================================================== */}
      <section
        className="section-spacing"
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '28px'
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
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--accent-burgundy)',
                textDecoration: 'underline'
              }}
            >
              View full auction calendar →
            </Link>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              padding: '0 20px',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-xs)'
            }}
          >
            {upcomingAuctions.map((auction) => (
              <UpcomingAuctionRow key={auction.id} auction={auction} />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. THE VEYRA STANDARD (TRUST & BUYER PROTECTION)
          ==================================================================== */}
      <section
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '48px 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '28px'
            }}
          >
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  padding: '10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--accent-burgundy)',
                  flexShrink: 0
                }}
              >
                <Award size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 4px 0' }}>
                  Authenticity Guarantee
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  Every lot is thoroughly vetted and authenticated by archival design specialists before catalog release.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  padding: '10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--accent-burgundy)',
                  flexShrink: 0
                }}
              >
                <Lock size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 4px 0' }}>
                  Escrow Protection
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  Buyer funds remain safely secured in escrow until your acquisition is delivered intact and inspected.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  padding: '10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--accent-burgundy)',
                  flexShrink: 0
                }}
              >
                <Truck size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 4px 0' }}>
                  Insured Global Transit
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  Complimentary white-glove custom packaging with full transit insurance across every piece.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  padding: '10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--accent-burgundy)',
                  flexShrink: 0
                }}
              >
                <Store size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 4px 0' }}>
                  Direct Artisan Ateliers
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  Transparent commerce directly supporting independent ceramists, sculptors, and fine art ateliers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. THE VEYRA ATELIER (SELLER INVITATION)
          ==================================================================== */}
      <section
        style={{
          padding: 'clamp(52px, 6vw, 80px) 0',
          backgroundColor: 'var(--surface-secondary)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-xs)',
              padding: 'clamp(32px, 5vw, 56px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '32px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)'
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <span className="eyebrow">The Veyra Atelier</span>
              <h2
                style={{
                  fontSize: 'clamp(1.9rem, 2.8vw, 2.4rem)',
                  marginBottom: '12px',
                  letterSpacing: '-0.01em'
                }}
              >
                Present your craftsmanship to a global collector community.
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  lineHeight: 1.6
                }}
              >
                We invite independent ceramists, sculptors, woodturners, printmakers, and vintage curators to present distinctive works. Enjoy verified collector access, curated spotlights, and transparent marketplace terms.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                to="/sell"
                className="btn btn-burgundy"
                style={{ height: '48px', padding: '0 24px', fontWeight: 600 }}
              >
                <Store size={16} />
                <span>Apply to Sell on Veyra</span>
              </Link>
              <Link
                to="/explore"
                className="btn btn-secondary"
                style={{ height: '48px', padding: '0 20px' }}
              >
                <span>Browse The Catalog</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. WHY VEYRA CORE PILLARS */}
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
        .category-hero-tile:hover .cat-bg-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
};
