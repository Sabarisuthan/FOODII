import { Product, Review, Category } from '../types';

export const HERO_PRODUCTS: Product[] = [
  {
    id: 'hero-cheese-jalapeno',
    name: 'Crunchy Bites',
    brand: 'Crunchy Bites',
    flavor: 'Cheese & Jalapeño',
    subtitle: 'Fiery & Savory Potato Chips',
    shortDescription: 'Fiery Cheese. Crunchy Texture. Made with Premium Ingredients.',
    fullDescription: 'Indulge in the bold, exhilarating crunch of golden-rippled potato chips smothered in rich melted cheddar cheese and infused with spicy Mexican jalapeño heat. Hand-cooked in micro-batches for the ultimate crispy texture.',
    price: 149,
    originalPrice: 199,
    rating: 5.0,
    reviewCount: 342,
    isHero: true,
    heroTheme: {
      bgGradient: 'from-[#2d1405] via-[#1a0a03] to-[#0a0502]',
      spotlightColor: '#3d1a0e',
      glowColor: 'rgba(61, 26, 14, 0.35)',
      accentColor: '#3d1a0e'
    },
    image: 'cheese-jalapeno',
    badge: 'BESTSELLER',
    category: 'chips',
    tags: ['Spicy', 'Cheese', 'Hand-Cooked', 'Gluten Free'],
    weight: '150g e',
    nutrition: {
      calories: '530 kcal',
      fat: '32g',
      sodium: '480mg',
      protein: '6.5g'
    },
    flavorProfile: {
      spiciness: 4,
      crunchiness: 5,
      savory: 5,
      richness: 4
    },
    ingredients: [
      'Selected Potatoes',
      'Sunflower Oil',
      'Cheddar Cheese Powder',
      'Dehydrated Jalapeño Pepper',
      'Sea Salt',
      'Paprika Extract'
    ]
  },
  {
    id: 'hero-truffle-pepper',
    name: 'Terra & Truffle',
    brand: 'Terra & Truffle',
    flavor: 'Truffle & Black Pepper',
    subtitle: 'Artisan Gourmet Potato Chips',
    shortDescription: 'Gourmet Hand-Cooked. Rich Earthy Truffle. Cracked Black Pepper.',
    fullDescription: 'Crafted for connoisseurs. Kettle-cooked thick-cut golden chips infused with rare Italian black summer truffles, seasoned with coarsely cracked Tellicherry black pepper and fine sea salt crystals.',
    price: 299,
    originalPrice: 349,
    rating: 4.9,
    reviewCount: 518,
    isHero: true,
    heroTheme: {
      bgGradient: 'from-[#2a1308] via-[#1a0a03] to-[#0a0502]',
      spotlightColor: '#3d1a0e',
      glowColor: 'rgba(61, 26, 14, 0.35)',
      accentColor: '#3d1a0e'
    },
    image: 'truffle-pepper',
    badge: 'LUXURY SELECTION',
    category: 'chips',
    tags: ['Truffle', 'Gourmet', 'Artisan', 'Non-GMO'],
    weight: '150g e',
    nutrition: {
      calories: '515 kcal',
      fat: '30g',
      sodium: '420mg',
      protein: '7.0g'
    },
    flavorProfile: {
      spiciness: 2,
      crunchiness: 5,
      savory: 5,
      richness: 5
    },
    ingredients: [
      'Farm-Fresh Potatoes',
      'High-Oleic Cold Pressed Oil',
      'Italian Black Truffle Granules',
      'Cracked Tellicherry Pepper',
      'Flaky Sea Salt',
      'Natural Truffle Aroma'
    ]
  },
  {
    id: 'hero-dark-choco-pb',
    name: 'The Artisan Chocolatier',
    brand: 'The Artisan Chocolatier',
    flavor: 'Dark Chocolate Peanut Butter',
    subtitle: 'Creamy & Indulgent Handcrafted Spread',
    shortDescription: 'Creamy Slow-Roasted Peanuts & 70% Dark Belgian Cocoa.',
    fullDescription: 'Slow-roasted Virginia peanuts stone-ground to velvet smoothness, blended with 70% dark Belgian cocoa and a whisper of wildflower honey. Handcrafted in small bronze-labeled glass jars.',
    price: 349,
    originalPrice: 399,
    rating: 4.8,
    reviewCount: 219,
    isHero: true,
    heroTheme: {
      bgGradient: 'from-[#1e1008] via-[#08110b] to-[#050505]',
      spotlightColor: '#b45309',
      glowColor: 'rgba(180, 83, 9, 0.35)',
      accentColor: '#b45309'
    },
    image: 'chocolate-peanut-butter',
    badge: 'HANDCRAFTED',
    category: 'spreads',
    tags: ['High Protein', 'Dark Cocoa', 'No Palm Oil', 'Artisan Jar'],
    weight: '16 oz (454g)',
    nutrition: {
      calories: '580 kcal',
      fat: '45g',
      sodium: '190mg',
      protein: '22g'
    },
    flavorProfile: {
      spiciness: 0,
      crunchiness: 2,
      savory: 3,
      richness: 5
    },
    ingredients: ['Dry Roasted Peanuts', 'Belgian Cocoa Mass', 'Organic Cane Sugar', 'Sea Salt', 'Wildflower Honey']
  },
  {
    id: 'hero-double-choco-cookie',
    name: 'Indulge Biscuits',
    brand: 'Indulge',
    flavor: 'Double Chocolate Chip',
    subtitle: 'Rich & Decadent Chocolate Chip Biscuits',
    shortDescription: 'Loaded with Melting Chocolate Chips & Pure Butter.',
    fullDescription: 'Traditional oven-baked biscuits loaded with chunked dark and milk chocolate chips. Crispy on the outer edges with a rich, fudge-like buttery center, packed in a gold-embossed luxury box.',
    price: 249,
    originalPrice: 299,
    rating: 4.9,
    reviewCount: 184,
    isHero: true,
    heroTheme: {
      bgGradient: 'from-[#1c120c] via-[#08110b] to-[#050505]',
      spotlightColor: '#3d1a0e',
      glowColor: 'rgba(61, 26, 14, 0.35)',
      accentColor: '#3d1a0e'
    },
    image: 'double-chocolate-cookies',
    badge: 'FRESH OVEN-BAKED',
    category: 'cookies',
    tags: ['Pure Butter', 'Double Cocoa', 'Oven Baked', 'Gold Box'],
    weight: '250g | 8.8oz',
    nutrition: {
      calories: '490 kcal',
      fat: '26g',
      sodium: '310mg',
      protein: '5.8g'
    },
    flavorProfile: {
      spiciness: 0,
      crunchiness: 4,
      savory: 2,
      richness: 5
    },
    ingredients: ['Wheat Flour', 'Dark Chocolate Chunks', 'Real Butter', 'Brown Sugar', 'Vanilla Bean']
  }
];

export const ALL_PRODUCTS: Product[] = [
  ...HERO_PRODUCTS,
  {
    id: 'product-dark-choco-pb',
    name: 'The Artisan Chocolatier',
    brand: 'The Artisan Chocolatier',
    flavor: 'Dark Chocolate Peanut Butter',
    subtitle: 'Creamy & Indulgent Handcrafted Spread',
    shortDescription: 'Creamy Slow-Roasted Peanuts & 70% Dark Belgian Cocoa.',
    fullDescription: 'Slow-roasted Virginia peanuts stone-ground to velvet smoothness, blended with 70% dark Belgian cocoa and a whisper of wildflower honey.',
    price: 349,
    originalPrice: 399,
    rating: 4.8,
    reviewCount: 219,
    isHero: false,
    heroTheme: {
      bgGradient: 'from-[#1e1008] via-[#08110b] to-[#050505]',
      spotlightColor: '#a0522d',
      glowColor: 'rgba(160, 82, 45, 0.3)',
      accentColor: '#d8b56c'
    },
    image: 'chocolate-peanut-butter',
    badge: 'NEW',
    category: 'spreads',
    tags: ['High Protein', 'Dark Cocoa', 'No Palm Oil', 'Artisan'],
    weight: '454g (16 oz)',
    nutrition: {
      calories: '580 kcal',
      fat: '45g',
      sodium: '190mg',
      protein: '22g'
    },
    flavorProfile: {
      spiciness: 0,
      crunchiness: 2,
      savory: 3,
      richness: 5
    },
    ingredients: ['Dry Roasted Peanuts', 'Belgian Cocoa Mass', 'Organic Cane Sugar', 'Sea Salt', 'Honey']
  },
  {
    id: 'product-double-choco-cookie',
    name: 'Indulge Biscuits',
    brand: 'Indulge',
    flavor: 'Double Chocolate Chip',
    subtitle: 'Rich & Decadent Chocolate Chip Biscuits',
    shortDescription: 'Loaded with Melting Chocolate Chips & Pure Butter.',
    fullDescription: 'Traditional oven-baked biscuits loaded with chunked dark and milk chocolate chips. Crispy on the outer edges with a rich, fudge-like buttery center.',
    price: 249,
    originalPrice: 299,
    rating: 4.9,
    reviewCount: 184,
    isHero: false,
    heroTheme: {
      bgGradient: 'from-[#1c120c] via-[#08110b] to-[#050505]',
      spotlightColor: '#8b4513',
      glowColor: 'rgba(139, 69, 19, 0.3)',
      accentColor: '#d8b56c'
    },
    image: 'double-chocolate-cookies',
    badge: 'POPULAR',
    category: 'cookies',
    tags: ['Pure Butter', 'Double Cocoa', 'Oven Baked'],
    weight: '250g',
    nutrition: {
      calories: '490 kcal',
      fat: '26g',
      sodium: '310mg',
      protein: '5.8g'
    },
    flavorProfile: {
      spiciness: 0,
      crunchiness: 4,
      savory: 2,
      richness: 5
    },
    ingredients: ['Wheat Flour', 'Dark Chocolate Chunks', 'Real Butter', 'Brown Sugar', 'Vanilla Bean']
  },
  {
    id: 'product-smoked-sea-salt',
    name: 'Terra & Truffle',
    brand: 'Terra & Truffle',
    flavor: 'Smoked Oak Sea Salt',
    subtitle: 'Slow Oak-Smoked Flaky Salt Chips',
    shortDescription: 'Crispy Kettle Chips Seasoned with Smoked Sea Salt Crystals.',
    fullDescription: 'Thick cut potatoes batch-cooked in small kettles and seasoned with oakwood-smoked sea salt harvested from Atlantic coastal waters.',
    price: 279,
    originalPrice: 329,
    rating: 4.7,
    reviewCount: 128,
    isHero: false,
    heroTheme: {
      bgGradient: 'from-[#2d1405] via-[#1a0a03] to-[#0a0502]',
      spotlightColor: '#3d1a0e',
      glowColor: 'rgba(61, 26, 14, 0.3)',
      accentColor: '#3d1a0e'
    },
    image: 'smoked-salt',
    badge: 'ORGANIC',
    category: 'chips',
    tags: ['Organic', 'Kettle Cooked', 'Vegan'],
    weight: '150g e',
    nutrition: {
      calories: '500 kcal',
      fat: '28g',
      sodium: '390mg',
      protein: '6.0g'
    },
    flavorProfile: {
      spiciness: 0,
      crunchiness: 5,
      savory: 5,
      richness: 3
    },
    ingredients: ['Organic Potatoes', 'Cold-Pressed Sunflower Oil', 'Smoked Sea Salt']
  },
  {
    id: 'product-sour-cream-onion',
    name: 'Crunchy Bites',
    brand: 'Crunchy Bites',
    flavor: 'Sour Cream & Herbs',
    subtitle: 'Creamy Sour Cream & Fresh Garden Chives',
    shortDescription: 'Smooth Creaminess & Tangy Fresh Chives on Crispy Ridges.',
    fullDescription: 'Crispy ridged potato chips seasoned with real sweet cream buttermilk, tangy sour cream powder, and aromatic garden chives.',
    price: 149,
    originalPrice: 189,
    rating: 4.8,
    reviewCount: 276,
    isHero: false,
    heroTheme: {
      bgGradient: 'from-[#2b160a] via-[#1a0a03] to-[#0a0502]',
      spotlightColor: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.3)',
      accentColor: '#fbbf24'
    },
    image: 'sour-cream',
    badge: 'CLASSIC',
    category: 'chips',
    tags: ['Creamy', 'Herbs', 'Ridged'],
    weight: '150g e',
    nutrition: {
      calories: '520 kcal',
      fat: '31g',
      sodium: '440mg',
      protein: '6.2g'
    },
    flavorProfile: {
      spiciness: 1,
      crunchiness: 5,
      savory: 4,
      richness: 4
    },
    ingredients: ['Potatoes', 'Vegetable Oil', 'Sour Cream Powder', 'Dried Chives', 'Onion Powder', 'Sea Salt']
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'chips',
    name: 'Artisan Potato Chips',
    count: 14,
    image: 'chips',
    description: 'Thick kettle-cooked crisps seasoned with natural gourmet spices.'
  },
  {
    id: 'spreads',
    name: 'Gourmet Nut Spreads',
    count: 8,
    image: 'spreads',
    description: 'Stone-ground velvet spreads blended with cocoa and honey.'
  },
  {
    id: 'cookies',
    name: 'Handcrafted Biscuits',
    count: 12,
    image: 'cookies',
    description: 'Oven-baked buttery delights studded with chocolate & nuts.'
  },
  {
    id: 'combos',
    name: 'Luxury Gift Boxes',
    count: 6,
    image: 'combos',
    description: 'Curated tasting collections packaged in velvet & gold gift boxes.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Chef David Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    title: 'Unbelievable Truffle Depth!',
    comment: 'As a Michelin-starred chef, I am usually skeptical of truffle-flavored snacks. Terra & Truffle got it 100% right. Real black summer truffle aroma with cracked Tellicherry pepper. Phenomenal.',
    date: '2 days ago',
    productName: 'Terra & Truffle',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    title: 'The Cheese & Jalapeño is Addictive!',
    comment: 'The fiery warmth from the jalapeño balances the rich melted cheese flavor perfectly. Incredible crunch in every single bite.',
    date: '1 week ago',
    productName: 'Crunchy Bites Cheese & Jalapeño',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    title: 'Packaging & Taste match Apple level perfection',
    comment: 'Unboxing these feels like opening a luxury smartwatch. The foil bags keep everything extraordinarily fresh and crispy.',
    date: '2 weeks ago',
    productName: 'Gourmet Tasting Bundle',
    verified: true
  }
];
