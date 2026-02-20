import type { CategoryLink, NavItem, Thread, TrendingProduct } from "@/lib/types";

export const aiCredits = 45;

export const navItems: NavItem[] = [
  { label: "Home", href: "#", icon: "home", active: true },
  { label: "Popular Guides", href: "#", icon: "guides" },
  { label: "My Garage", href: "#", icon: "garage" },
  { label: "Saved", href: "#", icon: "saved" },
];

export const categoryLinks: CategoryLink[] = [
  { label: "Washing", href: "#" },
  { label: "Paint Correction", href: "#" },
  { label: "Ceramic Coatings", href: "#" },
  { label: "Interior", href: "#" },
];

export const threads: Thread[] = [
  {
    id: "thread-1",
    author: {
      name: "Baris Demir",
      avatarUrl:
        "https://images.unsplash.com/photo-1542204625-de293a9b7b2d?auto=format&fit=crop&w=160&q=80",
      role: "Pro Detailer",
    },
    timestamp: "2h ago",
    title: "Review: Koch Chemie F6 on Soft Honda Paint",
    snippet:
      "Tested F6 on a black Civic panel with heavy swirl marks. The cut level surprised me, but pad choice changed the finish quality dramatically.",
    tags: [
      { label: "Koch Chemie", variant: "cyan" },
      { label: "Paint Correction", variant: "default" },
    ],
    votes: 128,
    comments: 34,
    sliderMedia: {
      beforeImageUrl:
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1600&q=80",
      afterImageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
      beforeLabel: "BEFORE",
      afterLabel: "AFTER",
    },
  },
  {
    id: "thread-2",
    author: {
      name: "Aylin Kaya",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
      role: "Pro Detailer",
    },
    timestamp: "5h ago",
    title: "One-Bucket Rinse Technique for Tight Apartment Garages",
    snippet:
      "If your wash bay space is limited, this rinse-first routine cuts water usage and keeps marring risk low. Included: dilution chart and mitt rotation timing.",
    tags: [
      { label: "Washing", variant: "cyan" },
      { label: "Beginner Friendly", variant: "default" },
    ],
    votes: 96,
    comments: 21,
    previewImageUrl:
      "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "thread-3",
    author: {
      name: "Emir Yalcin",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
      role: "Member",
    },
    timestamp: "10h ago",
    title: "Ceramic Coating Layering: Is 2nd Coat Worth It on Daily Drivers?",
    snippet:
      "I documented contact angle, gloss meter readings, and maintenance effort over 8 weeks. Data suggests the second layer helps mostly with long-term chemical resistance.",
    tags: [
      { label: "Ceramic Coatings", variant: "cyan" },
      { label: "Field Test", variant: "default" },
    ],
    votes: 74,
    comments: 18,
    previewImageUrl:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
  },
];

export const trendingProducts: TrendingProduct[] = [
  {
    id: "gear-1",
    name: "Gyeon Q2 Mohs EVO 50ml",
    oldPrice: "$89.90",
    newPrice: "$72.40",
    dropLabel: "Price Dropped",
  },
  {
    id: "gear-2",
    name: "Koch Chemie Green Star 1L",
    oldPrice: "$24.90",
    newPrice: "$18.60",
    dropLabel: "Price Dropped",
  },
];
