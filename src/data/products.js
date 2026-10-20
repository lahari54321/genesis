// VEYRA Curated Product Catalog
// Editorial artisan pieces, ceramics, handcrafted objects, and studio art

export const CATEGORIES = [
  { id: 'all', name: 'All Objects' },
  { id: 'art-prints', name: 'Art & Prints', count: 8 },
  { id: 'handmade', name: 'Handmade', count: 12 },
  { id: 'home-living', name: 'Home & Living', count: 10 },
  { id: 'fashion', name: 'Fashion & Accessories', count: 6 },
  { id: 'collectibles', name: 'Collectibles', count: 7 },
  { id: 'vintage', name: 'Vintage Finds', count: 5 }
];

export const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Ochre Raku Fluted Vessel',
    seller: 'Studio Vayu',
    location: 'Pondicherry, India',
    category: 'Handmade',
    price: 18500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1000&q=80',
    description: 'Wheel-thrown stoneware vessel smoke-fired with local botanical leaves and natural ferric ochre slip. Each vessel possesses unique crazing and fire marks.',
    materials: 'High-fire stoneware, wood-ash glaze, natural mineral slip',
    dimensions: '24cm H × 18cm Ø',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-2',
    name: 'Brutalist Cast Bronze Candlestick',
    seller: 'Atelier Morandi',
    location: 'Milan, Italy',
    category: 'Home & Living',
    price: 24000,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
    description: 'Sand-cast solid bronze holder with an unlacquered living patina that deepens with use and ambient warmth.',
    materials: '100% Solid recycled architectural bronze',
    dimensions: '19cm H × 11cm W × 7cm D',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-3',
    name: 'Archival Monotype Print: Horizon 07',
    seller: 'Arjun Sen Fine Art',
    location: 'Kolkata, India',
    category: 'Art & Prints',
    price: 32500,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    description: 'A singular monotype hand-pulled onto 300gsm deckle-edged cotton rag. Exploring minimalism, negative space, and tonal gradients.',
    materials: 'Charbonnel oil ink on St Cuthbert’s Mill cotton paper',
    dimensions: '56cm × 76cm (Framed in raw white oak)',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-4',
    name: 'Hand-loomed Wild Muga Silk Stole',
    seller: 'Brahmaputra Loom Collective',
    location: 'Assam, India',
    category: 'Fashion & Accessories',
    price: 14200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1000&q=80',
    description: 'Indigenous golden muga silk spun and hand-woven on traditional wooden throw-shuttle pit looms. Naturally lustrous and water-resilient.',
    materials: '100% Raw Indian Muga Peace Silk',
    dimensions: '200cm × 70cm',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-5',
    name: 'Wabi-Sabi Stoneware Kyusu Teapot',
    seller: 'Komorebi Ceramics',
    location: 'Kyoto, Japan',
    category: 'Handmade',
    price: 16800,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    description: 'Side-handled ceramic teapot with integrated clay mesh filter. Wood-fired inside an anagama kiln for 4 continuous days.',
    materials: 'Iron-rich Shigaraki clay, unglazed interior',
    dimensions: '320ml capacity',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-6',
    name: 'Vintage Bauhaus Brass Task Lamp (1954)',
    seller: 'Aura Archives',
    location: 'Berlin, Germany',
    category: 'Vintage Finds',
    price: 48000,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
    description: 'Original mid-century counterbalanced articulated desk lamp in spun brass and matte graphite armature. Fully rewired with braided silk cable.',
    materials: 'Spun brass, steel counterbalance weight, bakelite switch',
    dimensions: '45cm max height',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-7',
    name: 'Turned Walnut Catchall & Incense Tray',
    seller: 'Havn Studio',
    location: 'Copenhagen, Denmark',
    category: 'Home & Living',
    price: 9500,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    description: 'Lathe-turned from fallen European walnut heartwood. Finished with cold-pressed Swedish linseed oil and organic beeswax.',
    materials: 'Solid reclaimed European walnut, brass incense pin',
    dimensions: '22cm Ø × 3.5cm H',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-8',
    name: 'Heavy Travertine Bookend Pair',
    seller: 'Maison Mineral',
    location: 'Rome, Italy',
    category: 'Collectibles',
    price: 21500,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80',
    description: 'Hand-hewn from unpolished Roman travertine limestone with natural fossil cavities and raw chamfered edges.',
    materials: 'Natural Italian Silver Travertine',
    dimensions: '18cm H × 10cm W × 8cm D (pair weighs 4.8kg)',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-9',
    name: 'Indigo Dyed Raw Linen Throw',
    seller: 'Niloufar Textiles',
    location: 'Isfahan, Iran',
    category: 'Home & Living',
    price: 13500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
    description: 'Heavyweight organic linen dip-dyed eleven times in natural plant indigo vats. Fringed selvage hem with hand-stitched sashiko detail.',
    materials: '100% Organic European flax, botanical indigo dye',
    dimensions: '180cm × 140cm',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-10',
    name: 'Solid Sandstone Sculptural Object',
    seller: 'Dharohar Craft',
    location: 'Jodhpur, India',
    category: 'Collectibles',
    price: 19800,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
    description: 'Chiseled by master stonecutters in Rajasthan from golden sandstone. An understated contemplation object for desktop or console.',
    materials: 'Natural Jaisalmer golden sandstone',
    dimensions: '16cm H × 14cm W × 14cm D',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-11',
    name: 'Vegetable-Tanned Saddle Leather Tote',
    seller: 'Tannery No. 4',
    location: 'Kanpur, India',
    category: 'Fashion & Accessories',
    price: 27500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
    description: 'Minimalist unlined carryall built from 2.5mm full-grain bridle leather with hand-peened solid copper rivets.',
    materials: 'Full-grain vegetable-tanned bovine leather, solid copper rivets',
    dimensions: '40cm W × 36cm H × 14cm D',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-12',
    name: 'Geometric Linocut Diptych: Form & Silence',
    seller: 'Elena Rostova',
    location: 'Stockholm, Sweden',
    category: 'Art & Prints',
    price: 29000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
    description: 'Two complementary reduction relief prints exploring spatial tension and rhythm. Edition of 20, signed and numbered by the artist.',
    materials: 'Relief ink on Japanese Awagami washi paper',
    dimensions: '42cm × 59cm each',
    featured: false,
    inStock: true
  }
];

export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
