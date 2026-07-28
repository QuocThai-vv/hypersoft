export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  category: string;
  tag?: string;
}

export interface Stylist {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  specialty: string[];
  availableSlots: string[];
  experienceYears?: number;
  quote?: string;
}

export interface Booking {
  id: string;
  services: Service[];
  stylist?: Stylist;
  date?: string;
  time?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerNote?: string;
  totalPrice?: number;
}

export interface PortfolioItem {
  id: string;
  image: string;
  tags: string[];
  stylistId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone: string;
  rewardPoints?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  content: string;
  rating: number;
  service?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  readMinutes: number;
  publishedAt: string;
  author: { name: string; avatar: string; title?: string };
  body: { type: "h2" | "p" | "quote" | "callout" | "image" | "list"; text?: string; src?: string; items?: string[]; accent?: string }[];
  featured?: boolean;
}

export interface Voucher {
  id: string;
  title: string;
  code: string;
  discountValue: string;
  expireDate: string;
  tier: "gold" | "silver";
}
