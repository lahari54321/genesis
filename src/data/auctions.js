// VEYRA Live & Upcoming Curated Auctions

export const INITIAL_LIVE_AUCTIONS = [
  {
    id: 'auc-1',
    name: 'Archival Chandigarh Teak & Cane V-Leg Chair (c. 1956)',
    maker: 'Pierre Jeanneret Workshop',
    provenance: 'Punjab Administrative Quarters, Chandigarh',
    category: 'Vintage Finds',
    currentBid: 96000,
    startingBid: 65000,
    minIncrement: 2500,
    bidCount: 16,
    // Duration in seconds from now (~2h 45m for realistic dynamic countdown)
    endsInSeconds: 9900,
    image: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=1000&q=80',
    description: 'Original solid Burma teak framework with renewed natural hand-woven cane seating. Features documented stenciled archival inventory numbering on the rear apron.',
    dimensions: '78cm H × 51cm W × 54cm D',
    condition: 'Museum restored; authentic minor surface patina consistent with age.',
    bidHistory: [
      { id: 'b-1', bidder: 'A. Singhania', amount: 96000, time: '3 mins ago' },
      { id: 'b-2', bidder: 'Collector_90', amount: 93500, time: '14 mins ago' },
      { id: 'b-3', bidder: 'Studio K.O.', amount: 90000, time: '38 mins ago' },
      { id: 'b-4', bidder: 'V. Mehta', amount: 85000, time: '1 hour ago' }
    ]
  },
  {
    id: 'auc-2',
    name: 'Monolithic Carved Basalt Contemplation Basin',
    maker: 'Atelier Kuroda',
    provenance: 'Nagano Prefecture, Japan',
    category: 'Collectibles',
    currentBid: 68500,
    startingBid: 45000,
    minIncrement: 2000,
    bidCount: 11,
    endsInSeconds: 15420, // ~4h 17m
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    description: 'Sculpted from a single volcanic basalt boulder. The interior is hand-ground to a mirror sheen while preserving raw mineral fissures across the outer perimeter.',
    dimensions: '38cm Ø × 16cm H (approx 22kg)',
    condition: 'Pristine studio masterwork, signed by stone sculptor.',
    bidHistory: [
      { id: 'b-1', bidder: 'Elena R.', amount: 68500, time: '8 mins ago' },
      { id: 'b-2', bidder: 'Marcus T.', amount: 66000, time: '22 mins ago' },
      { id: 'b-3', bidder: 'T. Nambiar', amount: 62000, time: '1 hour ago' }
    ]
  },
  {
    id: 'auc-3',
    name: 'Repoussé Sterling Silver Water Ewer & Basin Set',
    maker: 'Master Craftsman H. Raman',
    provenance: 'Thanjavur, Tamil Nadu',
    category: 'Collectibles',
    currentBid: 112000,
    startingBid: 80000,
    minIncrement: 3000,
    bidCount: 22,
    endsInSeconds: 4320, // ~1h 12m
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1000&q=80',
    description: 'Forged from 925 sterling silver using traditional south Indian chased repoussé motifs depicting stylized temple lotus petals and flowing water rhythms.',
    dimensions: 'Ewer 32cm H; Basin 36cm Ø (Total weight: 1,420g)',
    condition: 'Excellent preservation, hallmarks authenticated.',
    bidHistory: [
      { id: 'b-1', bidder: 'Heritage Fund', amount: 112000, time: '1 min ago' },
      { id: 'b-2', bidder: 'S. Kirloskar', amount: 108000, time: '7 mins ago' },
      { id: 'b-3', bidder: 'Collector_90', amount: 104000, time: '25 mins ago' }
    ]
  },
  {
    id: 'auc-4',
    name: 'Precision Chased Brass Astronomical Astrolabe (c. 1890)',
    maker: 'Royal Instrument Guild',
    provenance: 'Private Observatory Collection, Jaipur',
    category: 'Collectibles',
    currentBid: 58000,
    startingBid: 42000,
    minIncrement: 2000,
    bidCount: 15,
    endsInSeconds: 7540, // ~2h 05m
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    description: 'Brass astrolabe quadrant featuring intricately cut rete showing major northern constellations, hand-stamped altitude circles, and original suspension ring.',
    dimensions: '21cm Ø × 1.2cm thick (Weight: 890g)',
    condition: 'Intact historical mechanism with warm antique brass patina.',
    bidHistory: [
      { id: 'b-1', bidder: 'Aditi V.', amount: 58000, time: '5 mins ago' },
      { id: 'b-2', bidder: 'S. Banerjee', amount: 56000, time: '19 mins ago' },
      { id: 'b-3', bidder: 'VintageCurator', amount: 52000, time: '42 mins ago' }
    ]
  }
];

export const UPCOMING_AUCTIONS = [
  {
    id: 'up-1',
    name: '1970s Danish Rosewood Articulated Credenza',
    maker: 'Ib Kofod-Larsen for Faarup Møbelfabrik',
    scheduledDate: 'Thu, Oct 23 • 6:00 PM IST',
    startingBid: 145000,
    category: 'Vintage Finds',
    thumbnail: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    curatorNote: 'Preserved Brazilian rosewood grain with tambour roll doors and solid brass pulls.'
  },
  {
    id: 'up-2',
    name: 'Large-scale Raku Pit-Fired Torso Sculpture',
    maker: 'Kavita Ghosh Ceramics',
    scheduledDate: 'Sat, Oct 25 • 4:30 PM IST',
    startingBid: 52000,
    category: 'Art & Prints',
    thumbnail: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
    curatorNote: 'Single-edition stoneware smoked in sawdust and dried copper carbonates.'
  },
  {
    id: 'up-3',
    name: 'Antique Tibetan Silver-Inlaid Ghau Amulet Box',
    maker: 'Himalayan Silversmith Guild (c. 1910)',
    scheduledDate: 'Mon, Oct 27 • 8:00 PM IST',
    startingBid: 78000,
    category: 'Collectibles',
    thumbnail: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    curatorNote: 'Natural turquoise, coral inlays, and filigree Buddhist auspicious emblems.'
  },
  {
    id: 'up-4',
    name: 'Cast Bronze Freeform Low Coffee Table',
    maker: 'Studio Alchemist, Jaipur',
    scheduledDate: 'Wed, Oct 29 • 5:00 PM IST',
    startingBid: 120000,
    category: 'Home & Living',
    thumbnail: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80',
    curatorNote: 'Molten bronze cast into riverbed sand molds with hand-patinated verdigris finish.'
  }
];
