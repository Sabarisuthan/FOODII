export interface Product {
  id: string;
  name: string;
  brand: string;
  flavor: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isHero: boolean;
  heroTheme: {
    bgGradient: string;
    spotlightColor: string;
    glowColor: string;
    accentColor: string;
  };
  image: string;
  badge?: string;
  category: 'chips' | 'spreads' | 'cookies' | 'combos';
  tags: string[];
  weight: string;
  nutrition: {
    calories: string;
    fat: string;
    sodium: string;
    protein: string;
  };
  flavorProfile: {
    spiciness: number; // 0 - 5
    crunchiness: number; // 0 - 5
    savory: number; // 0 - 5
    richness: number; // 0 - 5
  };
  ingredients: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  productName: string;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
  description: string;
}
