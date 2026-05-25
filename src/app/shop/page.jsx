'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import './products.css';
import ShopHeader from '@/components/Header';
import ShopFooter from '@/components/Footer';

// Constants for products data
const PRODUCTS_DATA = [
  {
    id: 'air-max-dn',
    name: 'Nike Air Max Dn',
    price: 13995,
    originalPrice: 15995,
    category: 'Lifestyle',
    image: '/products/air_max_dn.png',
    rating: 4.8,
    reviews: 142,
    badge: 'New Release',
    badgeClass: 'highlight',
    description: 'Experience the next generation of Air technology. The Air Max Dn features our Dynamic Air unit system of dual-pressure tubes, creating a reactive sensation with every step. Futuristic design meets ultimate street comfort, designed to move with you all day.',
    colors: [
      { name: 'Neon Volt', value: '#dffe00', labelColor: 'Volt', themeGlow: 'rgba(223, 254, 0, 0.25)' },
      { name: 'Eclipse Black', value: '#111111', labelColor: 'Black', themeGlow: 'rgba(255, 255, 255, 0.1)' },
      { name: 'Hyper Blue', value: '#00d2ff', labelColor: 'Blue', themeGlow: 'rgba(0, 210, 255, 0.25)' }
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'Dynamic Air unit system features 2 sets of dual-pressure tubes',
      'Multi-layered mesh on the upper feels lightweight and breathable',
      'Foam cushioning wraps the cushioning system for an enhanced feel',
      'Rubber outsole provides durable traction on various surfaces'
    ]
  },
  {
    id: 'pegasus-41',
    name: 'Nike Pegasus 41',
    price: 11995,
    originalPrice: 13495,
    category: 'Running',
    image: '/products/pegasus_41.png',
    rating: 4.7,
    reviews: 328,
    badge: 'Best Seller',
    badgeClass: 'highlight',
    description: 'The Pegasus 41 brings responsive cushioning to your daily run. Equipped with the new ReactX foam midsole, it offers 13% more energy return compared to previous models, while maintaining the signature dependable fit runners love.',
    colors: [
      { name: 'Electric Orange', value: '#ff6b00', labelColor: 'Orange', themeGlow: 'rgba(255, 107, 0, 0.25)' },
      { name: 'Cyber Volt', value: '#dffe00', labelColor: 'Volt', themeGlow: 'rgba(223, 254, 0, 0.2)' },
      { name: 'White Stealth', value: '#ffffff', labelColor: 'White', themeGlow: 'rgba(255, 255, 255, 0.15)' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    details: [
      'New ReactX foam midsole offers 13% more responsiveness than standard React',
      'Engineered mesh upper is lighter and more breathable than Pegasus 40',
      'Signature waffle-inspired rubber outsole provides grip and durability',
      'Plush collar, tongue and sockliner for a secure, comfortable fit'
    ]
  },
  {
    id: 'vaporfly-3',
    name: 'Nike Vaporfly 3',
    price: 22795,
    originalPrice: 24995,
    category: 'Racing',
    image: '/products/vaporfly_3.png',
    rating: 4.9,
    reviews: 95,
    badge: 'Elites Choice',
    badgeClass: '',
    description: 'Catch them if you can. The Nike Vaporfly 3 is built for the chase, offering race-day speed to conquer any distance. Featuring a full-length carbon fiber flyplate and ultra-responsive ZoomX foam cushioning, this shoe is tuned for premium energy efficiency.',
    colors: [
      { name: 'Crimson Spark', value: '#ff2a5f', labelColor: 'Crimson', themeGlow: 'rgba(255, 42, 95, 0.25)' },
      { name: 'Volt Fusion', value: '#dffe00', labelColor: 'Volt', themeGlow: 'rgba(223, 254, 0, 0.2)' },
      { name: 'Neon Blue', value: '#00d2ff', labelColor: 'Blue', themeGlow: 'rgba(0, 210, 255, 0.2)' }
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'Full-length carbon fiber flyplate provides a stiff, propulsive feel',
      'ZoomX foam, Nikes most responsive foam, delivers optimal energy return',
      'Bulged midsole design reduces weight on the inside of the foot',
      'Lightweight Flyknit upper is optimized for race-day breathability'
    ]
  },
  {
    id: 'air-force-1',
    name: "Nike Air Force 1 '07",
    price: 9695,
    originalPrice: 10795,
    category: 'Lifestyle',
    image: '/products/air_force_1.png',
    rating: 4.6,
    reviews: 512,
    badge: 'Classic',
    badgeClass: '',
    description: 'The radiance lives on in the Nike Air Force 1 07, the basketball original that puts a fresh spin on what you know best: clean leather, bold details, and the perfect amount of flash to make you shine.',
    colors: [
      { name: 'Triple White', value: '#ffffff', labelColor: 'White', themeGlow: 'rgba(255, 255, 255, 0.2)' },
      { name: 'Black Eclipse', value: '#111111', labelColor: 'Black', themeGlow: 'rgba(255, 255, 255, 0.05)' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'Premium stitched leather overlays on the upper add heritage style and support',
      'Originally designed for performance hoops, Nike Air cushioning adds comfort',
      'Padded low-cut collar looks sleek and feels great',
      'Rubber outsole with heritage pivot circles adds traction and durability'
    ]
  },
  {
    id: 'dunk-low',
    name: 'Nike Dunk Low Panda',
    price: 8295,
    originalPrice: 9295,
    category: 'Lifestyle',
    image: '/products/dunk_low.png',
    rating: 4.8,
    reviews: 420,
    badge: 'Trending',
    badgeClass: 'highlight',
    description: 'Created for the hardwood but taken to the streets, the Nike Dunk Low returns with crisp overlays and original team colors. This basketball icon channels 80s vibes with premium leather and clean low-cut aesthetics.',
    colors: [
      { name: 'White & Black', value: '#ffffff', labelColor: 'White', themeGlow: 'rgba(255, 255, 255, 0.2)' },
      { name: 'Eclipse Black', value: '#111111', labelColor: 'Black', themeGlow: 'rgba(255, 255, 255, 0.05)' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'Crisp leather upper has a slight sheen and ages to soft perfection',
      'Modern foam midsole offers lightweight, responsive cushioning',
      'Low-cut, padded collar adds a sleek look that feels comfortable',
      'Rubber sole with classic hoops pivot circle adds durability and traction'
    ]
  },
  {
    id: 'invincible-3',
    name: 'Nike Invincible 3',
    price: 16995,
    originalPrice: 18995,
    category: 'Running',
    image: '/products/invincible_3.png',
    rating: 4.7,
    reviews: 184,
    badge: 'Max Cushion',
    badgeClass: '',
    description: 'With maximum cushioning to support every mile, the Invincible 3 gives you our highest level of comfort underfoot. Designed to help keep you on the run, its highly responsive and springy ZoomX foam keeps you propelled along your path.',
    colors: [
      { name: 'Electric Orange', value: '#ff6b00', labelColor: 'Orange', themeGlow: 'rgba(255, 107, 0, 0.25)' },
      { name: 'Hyper Blue', value: '#00d2ff', labelColor: 'Blue', themeGlow: 'rgba(0, 210, 255, 0.25)' }
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'High-cushion ZoomX foam provides a softer, springier running platform',
      'Evolved Flyknit upper puts zones of breathability where your foot heats up most',
      'Wider midsole platform adds stability compared to previous versions',
      'Thicker heel stack helps absorb impact and reduces pressure on your joints'
    ]
  },
  {
    id: 'zoom-fly-5',
    name: 'Nike Zoom Fly 5',
    price: 14495,
    originalPrice: 15995,
    category: 'Running',
    image: '/products/pegasus_41.png',
    rating: 4.6,
    reviews: 112,
    badge: 'Training Partner',
    badgeClass: '',
    description: 'Bridge the gap between your weekend training run and race day. The Nike Zoom Fly 5 offers comfort and reliability with a propulsive sensation that helps you feel fast and fresh.',
    colors: [
      { name: 'Hyper Blue', value: '#00d2ff', labelColor: 'Blue', themeGlow: 'rgba(0, 210, 255, 0.2)' },
      { name: 'Cyber Volt', value: '#dffe00', labelColor: 'Volt', themeGlow: 'rgba(223, 254, 0, 0.2)' }
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'Recycled ZoomX foam in the midsole offers lightweight cushioning',
      'Full-length articulated carbon plate delivers dynamic transitions',
      'Lightweight mesh upper provides a softer, more breathable fit',
      'Dynamic fit webbing system offers midfoot support and locking structure'
    ]
  },
  {
    id: 'infinity-run-4',
    name: 'Nike Infinity Run 4',
    price: 15995,
    originalPrice: 17995,
    category: 'Running',
    image: '/products/invincible_3.png',
    rating: 4.7,
    reviews: 204,
    badge: 'Supportive Fit',
    badgeClass: 'highlight',
    description: 'With supportive cushioning built for a smooth run, the Infinity Run 4 offers a fresh take on a familiar favorite. Made with our all-new ReactX foam and Flyknit upper, it delivers supportive comfort on every run.',
    colors: [
      { name: 'Eclipse Black', value: '#111111', labelColor: 'Black', themeGlow: 'rgba(255, 255, 255, 0.05)' },
      { name: 'Electric Orange', value: '#ff6b00', labelColor: 'Orange', themeGlow: 'rgba(255, 107, 0, 0.2)' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    details: [
      'ReactX foam cushioning midsole gives you 13% more responsiveness',
      'Water-repellent liner in the toe helps keep you dry when weather turns',
      'Generous foam stacks provide a high cushion and supportive platform',
      'Curved rocker outsole makes transitions from heel to toe smooth'
    ]
  },
  {
    id: 'air-max-90',
    name: 'Nike Air Max 90',
    price: 10995,
    originalPrice: 12495,
    category: 'Lifestyle',
    image: '/products/air_max_dn.png',
    rating: 4.8,
    reviews: 814,
    badge: 'Retro Classic',
    badgeClass: '',
    description: 'Nothing as fly, nothing as comfortable, nothing as proven. The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU accents.',
    colors: [
      { name: 'Triple White', value: '#ffffff', labelColor: 'White', themeGlow: 'rgba(255, 255, 255, 0.15)' },
      { name: 'Eclipse Black', value: '#111111', labelColor: 'Black', themeGlow: 'rgba(255, 255, 255, 0.05)' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'Originally designed for performance running, Max Air unit adds cushioning',
      'Padded, low-cut collar looks sleek and feels comfortable',
      'Rubber Waffle outsole adds heritage look, traction and durability',
      'Stitched leather and synthetic overlays add long-lasting support'
    ]
  },
  {
    id: 'air-max-97',
    name: 'Nike Air Max 97',
    price: 16995,
    originalPrice: 18995,
    category: 'Lifestyle',
    image: '/products/air_max_dn.png',
    rating: 4.7,
    reviews: 310,
    badge: 'Iconic Style',
    badgeClass: '',
    description: 'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style forward at full speed. Taking the revolutionary full-length Air unit, it delivers premium comfort.',
    colors: [
      { name: 'Triple White', value: '#ffffff', labelColor: 'White', themeGlow: 'rgba(255, 255, 255, 0.15)' },
      { name: 'Hyper Blue', value: '#00d2ff', labelColor: 'Blue', themeGlow: 'rgba(0, 210, 255, 0.2)' }
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'Full-length Max Air unit provides lightweight cushioning and responsive stride',
      'Mesh and synthetic materials on the upper keep the fluid look of the OG',
      'Innovative hidden lacing system offers a streamlined look',
      'Rubber outsole with waffle pattern provides traction and stability'
    ]
  },
  {
    id: 'alphafly-3',
    name: 'Nike Air Zoom Alphafly 3',
    price: 27995,
    originalPrice: 29995,
    category: 'Racing',
    image: '/products/vaporfly_3.png',
    rating: 4.9,
    reviews: 64,
    badge: 'Record Breaker',
    badgeClass: 'highlight',
    description: 'Fine-tuned for marathon speed, the Alphafly 3 features dual Zoom Air units, ZoomX foam, and a carbon fiber plate to propel you forward. Crafted for efficiency, it helps you break barriers with comfort.',
    colors: [
      { name: 'Neon Volt', value: '#dffe00', labelColor: 'Volt', themeGlow: 'rgba(223, 254, 0, 0.25)' },
      { name: 'Crimson Spark', value: '#ff2a5f', labelColor: 'Crimson', themeGlow: 'rgba(255, 42, 95, 0.25)' }
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'Two forefoot Zoom Air units deliver maximum energy return',
      'Full-length carbon fiber Flyplate provides a stiff, responsive transition',
      'ZoomX foam cushioning delivers lightweight, resilient support',
      'AtomKnit upper is lightweight, breathable, and provides secure lock'
    ]
  },
  {
    id: 'streakfly',
    name: 'Nike Streakfly',
    price: 13995,
    originalPrice: 15495,
    category: 'Racing',
    image: '/products/vaporfly_3.png',
    rating: 4.6,
    reviews: 82,
    badge: 'Ultra Lightweight',
    badgeClass: '',
    description: 'Our lightest racing shoe, the Nike Streakfly is all about the speed you need to take on the competition in a 5K or 10K. Low profile with sleek details, it feels like it disappears on your foot.',
    colors: [
      { name: 'White Stealth', value: '#ffffff', labelColor: 'White', themeGlow: 'rgba(255, 255, 255, 0.15)' },
      { name: 'Crimson Spark', value: '#ff2a5f', labelColor: 'Crimson', themeGlow: 'rgba(255, 42, 95, 0.2)' }
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'Full-length ZoomX foam midsole provides optimal responsiveness and weight saving',
      'Midfoot Pebax plate adds stable structure and snappiness',
      'Ultra-thin knit upper is breathable and stripped of all extra weight',
      'Outsole pattern developed using runner data for optimal grip'
    ]
  },
  {
    id: 'vomero-17',
    name: 'Nike Air Zoom Vomero 17',
    price: 15995,
    originalPrice: 17495,
    category: 'Running',
    image: '/products/pegasus_41.png',
    rating: 4.7,
    reviews: 142,
    badge: 'Premium Comfort',
    badgeClass: '',
    description: 'A springy and soft ride to power every mile. The Vomero 17 features dual-density foam for premium cushioning, keeping you comfortable throughout short jogs and long endurance runs alike.',
    colors: [
      { name: 'Electric Orange', value: '#ff6b00', labelColor: 'Orange', themeGlow: 'rgba(255, 107, 0, 0.2)' },
      { name: 'Triple White', value: '#ffffff', labelColor: 'White', themeGlow: 'rgba(255, 255, 255, 0.1)' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    details: [
      'Dual-foam midsole combines ZoomX and Cushlon for balanced cushioning',
      'Engineered mesh upper offers improved breathability and midfoot lock',
      'Plush collar and padded tongue for wrap-around ankle comfort',
      'Durable rubber outsole with updated traction lugs'
    ]
  },
  {
    id: 'structure-25',
    name: 'Nike Structure 25',
    price: 12995,
    originalPrice: 14495,
    category: 'Running',
    image: '/products/pegasus_41.png',
    rating: 4.6,
    reviews: 198,
    badge: 'Support',
    badgeClass: '',
    description: 'With stability where you need it and cushioning where you want it, the Structure 25 helps support your stride. Ideal for long runs, short training blocks, and everyday active support.',
    colors: [
      { name: 'Eclipse Black', value: '#111111', labelColor: 'Black', themeGlow: 'rgba(255, 255, 255, 0.05)' },
      { name: 'Hyper Blue', value: '#00d2ff', labelColor: 'Blue', themeGlow: 'rgba(0, 210, 255, 0.2)' }
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'Midfoot support system adapts to your foot shape for lockdown',
      'Zoom Air unit in the forefoot offers snappy, responsive energy',
      'Comfortable foam midsole delivers soft cushioning underfoot',
      'Durability-first rubber sole design with flex grooves'
    ]
  },
  {
    id: 'pegasus-trail-5',
    name: 'Nike Pegasus Trail 5',
    price: 13495,
    originalPrice: 14995,
    category: 'Running',
    image: '/products/pegasus_41.png',
    rating: 4.7,
    reviews: 122,
    badge: 'All Terrain',
    badgeClass: 'highlight',
    description: 'Run from streets to dirt paths without missing a beat. The Pegasus Trail 5 delivers responsive React foam cushioning with durable traction optimized for gravel, mud, and uneven terrain.',
    colors: [
      { name: 'Neon Volt', value: '#dffe00', labelColor: 'Volt', themeGlow: 'rgba(223, 254, 0, 0.2)' },
      { name: 'Electric Orange', value: '#ff6b00', labelColor: 'Orange', themeGlow: 'rgba(255, 107, 0, 0.2)' }
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'React foam midsole offers smooth, springy transitions on trail paths',
      'Traction lugs on the rubber outsole deliver grip for uphill/downhill paths',
      'Engineered mesh upper is reinforced in high-wear areas',
      'Midfoot band integrates with laces for secure, adaptive lockdown'
    ]
  },
  {
    id: 'wildhorse-8',
    name: 'Nike Wildhorse 8',
    price: 11995,
    originalPrice: 12995,
    category: 'Running',
    image: '/products/invincible_3.png',
    rating: 4.5,
    reviews: 76,
    badge: 'Trail Pro',
    badgeClass: '',
    description: 'Built for rugged trails and technical terrains, the Wildhorse 8 features high-abrasion materials, reactive foam cushioning, and an aggressive grip outsole to keep you stable on steep slopes.',
    colors: [
      { name: 'Electric Orange', value: '#ff6b00', labelColor: 'Orange', themeGlow: 'rgba(255, 107, 0, 0.2)' },
      { name: 'Eclipse Black', value: '#111111', labelColor: 'Black', themeGlow: 'rgba(255, 255, 255, 0.05)' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    details: [
      'React foam cushioning delivers a soft, springy feel with every step',
      'Aggressive rubber outsole with multi-directional lugs provides grip',
      'Sock-like collar hugs the ankle to keep dirt and trail debris out',
      'Rock plate at the heel protects your foot on rough trail terrain'
    ]
  },
  {
    id: 'blazer-mid-77',
    name: "Nike Blazer Mid '77 Vintage",
    price: 8995,
    originalPrice: 9995,
    category: 'Lifestyle',
    image: '/products/dunk_low.png',
    rating: 4.7,
    reviews: 620,
    badge: 'Heritage',
    badgeClass: '',
    description: 'Styled for the 70s. Loved in the 80s. Classic in the 90s. Ready for the future. The Blazer Mid 77 Vintage delivers a timeless design with premium leather overlays and vintage midsole finish.',
    colors: [
      { name: 'Triple White', value: '#ffffff', labelColor: 'White', themeGlow: 'rgba(255, 255, 255, 0.15)' },
      { name: 'Eclipse Black', value: '#111111', labelColor: 'Black', themeGlow: 'rgba(255, 255, 255, 0.05)' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'Leather and synthetic upper looks clean and is easy to style',
      'Vintage treatment on the midsole provides an old-school look',
      'Autoclave construction fuses the outsole to midsole for a streamlined look',
      'Solid rubber sole with herringbone pattern adds durable grip'
    ]
  },
  {
    id: 'court-vision-low',
    name: 'Nike Court Vision Low',
    price: 5995,
    originalPrice: 6995,
    category: 'Lifestyle',
    image: '/products/air_force_1.png',
    rating: 4.5,
    reviews: 342,
    badge: 'Everyday Wear',
    badgeClass: '',
    description: 'In love with the classic look of 80s basketball but have a thing for fast-paced modern culture? Meet the Nike Court Vision Low. A classic remixed with recycled materials.',
    colors: [
      { name: 'Triple White', value: '#ffffff', labelColor: 'White', themeGlow: 'rgba(255, 255, 255, 0.15)' },
      { name: 'Black Eclipse', value: '#111111', labelColor: 'Black', themeGlow: 'rgba(255, 255, 255, 0.05)' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'Using a combination of leather, synthetic leather and rubber materials',
      'Perforations on the toe and sides add breathability and airflow',
      'Padded, low-cut collar looks sleek and feels comfortable underfoot',
      'Rubber cupsole construction for heritage court grip'
    ]
  },
  {
    id: 'zoom-bella-6',
    name: 'Nike Zoom Bella 6',
    price: 7495,
    originalPrice: 8495,
    category: 'Lifestyle',
    image: '/products/invincible_3.png',
    rating: 4.6,
    reviews: 118,
    badge: 'Active Cushion',
    badgeClass: '',
    description: 'Unleash your strength and style in the Nike Zoom Bella 6. This supportive design is built for heavy lifts, dynamic workout motions, and active everyday lifestyle wear.',
    colors: [
      { name: 'Triple White', value: '#ffffff', labelColor: 'White', themeGlow: 'rgba(255, 255, 255, 0.15)' },
      { name: 'Crimson Spark', value: '#ff2a5f', labelColor: 'Crimson', themeGlow: 'rgba(255, 42, 95, 0.2)' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    details: [
      'Zoom Air cushioning stretches from heel to midfoot for active bounce',
      'Updated frame in the forefoot creates more volume for an inclusive fit',
      'Flat sole helps keep you stable on gym surfaces and streets',
      'Inner sleeve improves fit, locking support while maintaining airflow'
    ]
  },
  {
    id: 'court-royale-2',
    name: 'Nike Court Royale 2 Low',
    price: 4995,
    originalPrice: 5495,
    category: 'Lifestyle',
    image: '/products/air_force_1.png',
    rating: 4.4,
    reviews: 215,
    badge: 'Essential',
    badgeClass: '',
    description: 'A flash from the past, the Nike Court Royale 2 Low features the same design that has rocked the streets since the late 70s. Leather upper looks crisp and is easy to wear.',
    colors: [
      { name: 'Triple White', value: '#ffffff', labelColor: 'White', themeGlow: 'rgba(255, 255, 255, 0.15)' },
      { name: 'Black Eclipse', value: '#111111', labelColor: 'Black', themeGlow: 'rgba(255, 255, 255, 0.05)' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'Crisp leather upper feels soft, looks clean, and adds durability',
      'Herringbone sole pattern adds heritage look, traction and stability',
      'Padded, low-cut collar looks sleek and feels comfortable',
      'Classic stitched overlays keep the heritage Nike court aesthetics'
    ]
  },
  {
    id: 'react-infinity-3',
    name: 'Nike React Infinity 3',
    price: 13995,
    originalPrice: 15495,
    category: 'Running',
    image: '/products/invincible_3.png',
    rating: 4.7,
    reviews: 290,
    badge: 'Soft & Stable',
    badgeClass: '',
    description: 'Still one of our most tested shoes, the Nike React Infinity 3 offers soft and supportive cushioning. Designed to keep you running, it offers a secure, stable feel on every path.',
    colors: [
      { name: 'Neon Volt', value: '#dffe00', labelColor: 'Volt', themeGlow: 'rgba(223, 254, 0, 0.2)' },
      { name: 'Hyper Blue', value: '#00d2ff', labelColor: 'Blue', themeGlow: 'rgba(0, 210, 255, 0.2)' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    details: [
      'React foam cushioning midsole provides a soft yet stable ride',
      'Flyknit upper is engineered to maximize breathability and locking support',
      'Increased rubber at the outsole delivers traction and durability',
      'Wide shape provides a more stable ride, helping release energy'
    ]
  }
];

export default function ShopPage() {
  // State for Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(30000);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [sortBy, setSortBy] = useState('featured');

  // Interactive Product States (specific selected color per card)
  const [cardColorways, setCardColorways] = useState({});

  // Wishlist state
  const [wishlist, setWishlist] = useState([]);

  // Cart state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal / Detail state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalColorwayIndex, setModalColorwayIndex] = useState(0);
  const [modalSelectedSize, setModalSelectedSize] = useState(null);
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Load cart and wishlist from localStorage if available (Client-side only)
  useEffect(() => {
    const savedCart = localStorage.getItem('nike_shop_cart');
    const savedWishlist = localStorage.getItem('nike_shop_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('openCart') === 'true') {
        setIsCartOpen(true);
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (urlParams.get('openWishlist') === 'true') {
        const count = savedWishlist ? JSON.parse(savedWishlist).length : 0;
        showToast(`Wishlist contains ${count} shoe(s)`);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save cart & wishlist to localStorage
  const saveCartToStorage = (newCart) => {
    setCart(newCart);
    localStorage.setItem('nike_shop_cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('nike_cart_update'));
  };

  const saveWishlistToStorage = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem('nike_shop_wishlist', JSON.stringify(newWishlist));
    window.dispatchEvent(new Event('nike_cart_update'));
  };

  // Toast helper
  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Toggle wishlist item
  const toggleWishlist = (productId, e) => {
    if (e) e.stopPropagation();
    let newWishlist;
    if (wishlist.includes(productId)) {
      newWishlist = wishlist.filter((id) => id !== productId);
      showToast('Removed item from wishlist');
    } else {
      newWishlist = [...wishlist, productId];
      showToast('Added item to wishlist! ❤️');
    }
    saveWishlistToStorage(newWishlist);
  };

  // Color options mapped uniquely for filter sidebar
  const filterColors = [
    { label: 'Volt', hex: '#dffe00' },
    { label: 'Orange', hex: '#ff6b00' },
    { label: 'Blue', hex: '#00d2ff' },
    { label: 'Crimson', hex: '#ff2a5f' },
    { label: 'Black', hex: '#111111' },
    { label: 'White', hex: '#ffffff' }
  ];

  // Sizes available across all products
  const filterSizes = [38, 39, 40, 41, 42, 43, 44, 45, 46];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // 1. Search Query Filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Category Filter
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      // 3. Price Filter
      const matchesPrice = product.price <= priceRange;
      
      // 4. Color Filter
      const matchesColor = !selectedColor || product.colors.some((c) => c.labelColor === selectedColor);
      
      // 5. Size Filter
      const matchesSize = !selectedSize || product.sizes.includes(selectedSize);

      return matchesSearch && matchesCategory && matchesPrice && matchesColor && matchesSize;
    }).sort((a, b) => {
      // Sort configurations
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default featured order
    });
  }, [searchQuery, selectedCategory, priceRange, selectedColor, selectedSize, sortBy]);

  // Cart operations
  const addToCart = (product, colorwayIndex, size, e) => {
    if (e) e.stopPropagation();
    
    if (!size) {
      showToast('Please select a size first!');
      return;
    }

    const selectedColorway = product.colors[colorwayIndex];
    const cartItemId = `${product.id}-${selectedColorway.name}-${size}`;
    
    const existingIndex = cart.findIndex((item) => item.cartItemId === cartItemId);
    let newCart = [...cart];

    if (existingIndex > -1) {
      newCart[existingIndex].quantity += 1;
    } else {
      newCart.push({
        cartItemId,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: selectedColorway.name,
        colorHex: selectedColorway.value,
        size: size,
        quantity: 1
      });
    }

    saveCartToStorage(newCart);
    showToast(`Added ${product.name} (${selectedColorway.name}) to cart!`);

    // Trigger UI animation if inside modal
    if (selectedProduct) {
      setIsAddedAnimation(true);
      setTimeout(() => setIsAddedAnimation(false), 1500);
    }
  };

  const updateCartQty = (cartItemId, delta) => {
    const existingIndex = cart.findIndex((item) => item.cartItemId === cartItemId);
    if (existingIndex === -1) return;

    let newCart = [...cart];
    newCart[existingIndex].quantity += delta;

    if (newCart[existingIndex].quantity <= 0) {
      newCart = newCart.filter((item) => item.cartItemId !== cartItemId);
      showToast('Removed item from cart');
    }

    saveCartToStorage(newCart);
  };

  const removeFromCart = (cartItemId) => {
    const newCart = cart.filter((item) => item.cartItemId !== cartItemId);
    saveCartToStorage(newCart);
    showToast('Removed item from cart');
  };

  // Cart calculation
  const cartTotals = useMemo(() => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    return { count, subtotal };
  }, [cart]);

  // Open Quick View Modal helper
  const openQuickView = (product) => {
    setSelectedProduct(product);
    setModalColorwayIndex(cardColorways[product.id] || 0);
    setModalSelectedSize(product.sizes[0]); // Default to first available size
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: PRODUCTS_DATA.length };
    PRODUCTS_DATA.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="shop-body-wrapper">
      {/* Decorative Atmosphere Glow */}
      <div className="shop-glow-radial" />
      <div className="shop-glow-radial-2" />

      {/* --- HEADER --- */}
      <ShopHeader 
        wishlistCount={wishlist.length} 
        cartCount={cartTotals.count} 
        onCartOpen={() => setIsCartOpen(true)} 
        onWishlistClick={showToast} 
        onSizeGuideOpen={() => setIsSizeGuideOpen(true)} 
      />

      {/* --- MAIN PAGE CONTAINER --- */}
      <main className="shop-container">
        
        {/* HERO SHOWCASE BANNER */}
        <section className="shop-hero">
          <div className="shop-hero-content">
            <span className="shop-hero-tag">Summer Drops 2026</span>
            <h1 className="shop-hero-title">
              <span>Next Generation</span>
              <span>Of Premium <em>Speed</em></span>
            </h1>
            <p className="shop-hero-desc">
              Unleash unmatched performance with our curated collection of premium Nike sneakers. Engineered with state-of-the-art shock absorption and energy return technologies.
            </p>
            <button className="shop-hero-btn" onClick={() => {
              const el = document.getElementById('shop-product-grid-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              Browse Collection
            </button>
          </div>
          <div className="shop-hero-showcase">
            <div className="shop-hero-circle" />
            <img 
              src="/products/air_max_dn.png" 
              alt="Nike Air Max Dn Volt Hero" 
              className="shop-hero-image"
            />
          </div>
        </section>

        {/* SHOP GRID SECTION */}
        <div id="shop-product-grid-section" className="shop-layout-split">
          
          {/* SIDEBAR FILTERS */}
          <aside className="shop-sidebar">
            {/* Search Widget */}
            <div className="shop-search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input 
                type="text" 
                placeholder="Search products..." 
                className="shop-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories Widget */}
            <div className="shop-filter-widget">
              <h3 className="shop-filter-title">Categories</h3>
              <div className="shop-filter-categories">
                {['All', 'Running', 'Racing', 'Lifestyle'].map((cat) => (
                  <button
                    key={cat}
                    className={`shop-filter-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                    <span className="shop-filter-cat-count">
                      {categoryCounts[cat] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Widget */}
            <div className="shop-filter-widget">
              <h3 className="shop-filter-title">Max Price</h3>
              <div className="shop-price-slider-container">
                <input 
                  type="range" 
                  min="5000" 
                  max="30000" 
                  step="500"
                  className="shop-price-slider"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
                <div className="shop-price-labels">
                  <span>Min: ₹5,000</span>
                  <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>
                    Max: ₹{priceRange.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Colors Widget */}
            <div className="shop-filter-widget">
              <h3 className="shop-filter-title">Colors</h3>
              <div className="shop-color-grid">
                <div 
                  className={`shop-color-pill ${!selectedColor ? 'active' : ''}`}
                  style={{ 
                    background: 'linear-gradient(45deg, #ff6b00, #dffe00, #ff2a5f, #00d2ff)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                  onClick={() => setSelectedColor('')}
                  title="All Colors"
                />
                {filterColors.map((color) => (
                  <button
                    key={color.label}
                    className={`shop-color-pill ${selectedColor === color.label ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.label)}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            {/* Sizes Widget */}
            <div className="shop-filter-widget">
              <h3 className="shop-filter-title">Sizes</h3>
              <div className="shop-size-grid">
                <button
                  className={`shop-size-btn ${!selectedSize ? 'active' : ''}`}
                  onClick={() => setSelectedSize(null)}
                >
                  All
                </button>
                {filterSizes.map((size) => (
                  <button
                    key={size}
                    className={`shop-size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN PRODUCT GRID */}
          <section className="shop-content">
            <div className="shop-content-header">
              <span className="shop-results-count">
                Showing {filteredProducts.length} of {PRODUCTS_DATA.length} products
              </span>
              
              <select 
                className="shop-sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-secondary)' }}>
                <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '48px', marginBottom: '16px', color: 'var(--accent-orange)' }}></i>
                <h3>No Shoes Found</h3>
                <p style={{ fontSize: '14px', marginTop: '8px' }}>Try resetting your filters or adjusting your price limit.</p>
              </div>
            ) : (
              <div className="shop-grid">
                {filteredProducts.map((product) => {
                  const activeColorwayIndex = cardColorways[product.id] || 0;
                  const activeColorway = product.colors[activeColorwayIndex];
                  
                  return (
                    <article 
                      key={product.id} 
                      className="shop-card"
                      onClick={() => openQuickView(product)}
                    >
                      {/* Ribbon badge */}
                      {product.badge && (
                        <span className={`shop-card-badge ${product.badgeClass}`}>
                          {product.badge}
                        </span>
                      )}

                      {/* Wishlist toggle */}
                      <button 
                        className={`shop-card-wishlist ${wishlist.includes(product.id) ? 'active' : ''}`}
                        onClick={(e) => toggleWishlist(product.id, e)}
                        aria-label="Add to Wishlist"
                      >
                        <i className={wishlist.includes(product.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                      </button>

                      {/* Image Container with Glow */}
                      <div className="shop-card-img-container">
                        <div 
                          className="shop-card-glow"
                          style={{ backgroundColor: activeColorway.value }}
                        />
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="shop-card-img"
                        />
                      </div>

                      {/* Info body */}
                      <div className="shop-card-info">
                        <span className="shop-card-cat">{product.category}</span>
                        <h4 className="shop-card-title">{product.name}</h4>
                        
                        {/* Dynamic colorway indicators */}
                        <div className="shop-card-colors" onClick={(e) => e.stopPropagation()}>
                          {product.colors.map((colorway, idx) => (
                            <button
                              key={colorway.name}
                              className={`shop-card-color-dot ${activeColorwayIndex === idx ? 'active' : ''}`}
                              style={{ backgroundColor: colorway.value }}
                              onClick={() => {
                                setCardColorways(prev => ({
                                  ...prev,
                                  [product.id]: idx
                                }));
                              }}
                              title={colorway.name}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="shop-card-footer" onClick={(e) => e.stopPropagation()}>
                        <div className="shop-card-price">
                          {product.originalPrice && <s>₹{product.originalPrice.toLocaleString('en-IN')}</s>}
                          <span>₹{product.price.toLocaleString('en-IN')}</span>
                        </div>
                        <button 
                          className="shop-card-add-btn"
                          onClick={(e) => addToCart(product, activeColorwayIndex, product.sizes[0], e)}
                          title="Add first size to cart"
                          aria-label="Quick Add"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      <ShopFooter onNewsletterSubmit={showToast} />

      {/* --- QUICK VIEW OVERLAY MODAL --- */}
      {selectedProduct && (
        <div 
          className={`shop-modal-overlay ${selectedProduct ? 'open' : ''}`}
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="shop-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="shop-modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close details"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Modal Gallery / Show */}
            <div className="shop-modal-gallery">
              <div 
                className="shop-modal-glow"
                style={{ backgroundColor: selectedProduct.colors[modalColorwayIndex].value }}
              />
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="shop-modal-img"
              />
            </div>

            {/* Modal Detail Settings */}
            <div className="shop-modal-details">
              <span className="shop-modal-cat">{selectedProduct.category}</span>
              <h3 className="shop-modal-title">{selectedProduct.name}</h3>
              
              <div className="shop-modal-price">
                ₹{selectedProduct.price.toLocaleString('en-IN')}
              </div>

              <p className="shop-modal-desc">{selectedProduct.description}</p>

              {/* Colorways */}
              <div className="shop-modal-option-title">Select Color: {selectedProduct.colors[modalColorwayIndex].name}</div>
              <div className="shop-modal-colors">
                {selectedProduct.colors.map((colorway, idx) => (
                  <button
                    key={colorway.name}
                    className={`shop-color-pill ${modalColorwayIndex === idx ? 'active' : ''}`}
                    style={{ backgroundColor: colorway.value }}
                    onClick={() => setModalColorwayIndex(idx)}
                    title={colorway.name}
                  />
                ))}
              </div>

              {/* Size Select */}
              <div className="shop-modal-option-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Select Size: EU {modalSelectedSize || 'None'}</span>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'var(--accent-orange)', 
                    fontSize: '11px', 
                    fontWeight: '700', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    transition: 'all 0.3s ease'
                  }}
                  className="shop-size-guide-link"
                >
                  <i className="fa-solid fa-ruler-horizontal"></i> Size Guide
                </button>
              </div>
              <div className="shop-modal-sizes">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={`shop-size-btn ${modalSelectedSize === size ? 'active' : ''}`}
                    onClick={() => setModalSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Action Button */}
              <button 
                className={`shop-modal-buy-btn ${isAddedAnimation ? 'added' : ''}`}
                onClick={(e) => addToCart(selectedProduct, modalColorwayIndex, modalSelectedSize, e)}
                disabled={isAddedAnimation}
              >
                {isAddedAnimation ? (
                  <>
                    <i className="fa-solid fa-check" style={{ marginRight: '8px' }}></i>
                    Added to Cart!
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CART SLIDE-OUT DRAWER --- */}
      <div 
        className={`shop-cart-overlay ${isCartOpen ? 'open' : ''}`} 
        onClick={() => setIsCartOpen(false)}
      />
      <div className={`shop-cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="shop-cart-header">
          <h3 className="shop-cart-title">
            <i className="fa-solid fa-cart-shopping"></i> Shopping Cart
          </h3>
          <button 
            className="shop-cart-close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="shop-cart-items">
          {cart.length === 0 ? (
            <div className="shop-cart-empty">
              <i className="fa-solid fa-bag-shopping"></i>
              <p>Your cart is empty.</p>
              <button 
                className="shop-size-btn" 
                style={{ width: 'auto', padding: '8px 24px', border: '1px solid var(--accent-orange)', color: 'var(--accent-orange)' }}
                onClick={() => setIsCartOpen(false)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartItemId} className="shop-cart-item">
                <div className="shop-cart-item-img-container">
                  <img src={item.image} alt={item.name} className="shop-cart-item-img" />
                </div>
                
                <div className="shop-cart-item-details">
                  <div>
                    <h5 className="shop-cart-item-title">{item.name}</h5>
                    <div className="shop-cart-item-meta">
                      <span>Color: {item.color}</span>
                      <span>Size: EU {item.size}</span>
                    </div>
                  </div>
                  
                  <div className="shop-cart-item-bottom">
                    <span className="shop-cart-item-price">₹{item.price.toLocaleString('en-IN')}</span>
                    <div className="shop-cart-qty-ctrl">
                      <button 
                        className="shop-cart-qty-btn"
                        onClick={() => updateCartQty(item.cartItemId, -1)}
                        aria-label="Decrease quantity"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span className="shop-cart-qty-num">{item.quantity}</span>
                      <button 
                        className="shop-cart-qty-btn"
                        onClick={() => updateCartQty(item.cartItemId, 1)}
                        aria-label="Increase quantity"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  className="shop-cart-item-remove"
                  onClick={() => removeFromCart(item.cartItemId)}
                  aria-label="Remove item"
                  title="Remove from cart"
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="shop-cart-footer">
            <div className="shop-cart-summary-line">
              <span>Subtotal</span>
              <span>₹{cartTotals.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="shop-cart-summary-line">
              <span>Shipping</span>
              <span style={{ color: '#00e676', fontWeight: '500' }}>Free</span>
            </div>
            <div className="shop-cart-summary-line total">
              <span>Total</span>
              <span>₹{cartTotals.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <button 
              className="shop-cart-checkout-btn"
              onClick={() => {
                showToast("Order submitted! Thank you for testing.");
                saveCartToStorage([]);
                setIsCartOpen(false);
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* --- TOAST NOTIFICATIONS --- */}
      <div className="shop-toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="shop-toast">
            <i className="fa-solid fa-circle-check"></i>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* --- SIZE GUIDE OVERLAY MODAL --- */}
      {isSizeGuideOpen && (
        <div 
          className="shop-modal-overlay open" 
          onClick={() => setIsSizeGuideOpen(false)}
          style={{ zIndex: 1200 }}
        >
          <div 
            className="shop-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '650px', gridTemplateColumns: '1fr' }}
          >
            <button 
              className="shop-modal-close"
              onClick={() => setIsSizeGuideOpen(false)}
              aria-label="Close size guide"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            <div className="shop-modal-details" style={{ padding: '30px' }}>
              <span className="shop-modal-cat" style={{ color: 'var(--accent-orange)' }}>Reference Chart</span>
              <h3 className="shop-modal-title" style={{ fontSize: '24px', marginBottom: '20px' }}>Nike Shoe Size Guide</h3>
              
              <div className="shop-size-guide-table-wrapper" style={{ overflowX: 'auto', marginBottom: '25px' }}>
                <table className="shop-size-guide-table">
                  <thead>
                    <tr>
                      <th>EU Size</th>
                      <th>US Men</th>
                      <th>US Women</th>
                      <th>UK Size</th>
                      <th>Foot Length (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>38</td><td>5.5</td><td>7</td><td>5</td><td>24.0 cm</td></tr>
                    <tr><td>39</td><td>6.5</td><td>8</td><td>6</td><td>24.5 cm</td></tr>
                    <tr><td>40</td><td>7</td><td>8.5</td><td>6</td><td>25.0 cm</td></tr>
                    <tr><td>41</td><td>8</td><td>9.5</td><td>7</td><td>26.0 cm</td></tr>
                    <tr><td>42</td><td>8.5</td><td>10</td><td>7.5</td><td>26.5 cm</td></tr>
                    <tr><td>43</td><td>9.5</td><td>11</td><td>8.5</td><td>27.5 cm</td></tr>
                    <tr><td>44</td><td>10</td><td>11.5</td><td>9</td><td>28.0 cm</td></tr>
                    <tr><td>45</td><td>11</td><td>12.5</td><td>10</td><td>29.0 cm</td></tr>
                    <tr><td>46</td><td>12</td><td>13.5</td><td>11</td><td>30.0 cm</td></tr>
                  </tbody>
                </table>
              </div>

              <h4 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px', color: '#fff' }}>How to Measure</h4>
              <ol className="shop-size-guide-tips">
                <li>Place a sheet of paper on the floor flat against a wall.</li>
                <li>Stand on the paper with your heel lightly touching the wall behind you.</li>
                <li>Mark the longest part of your foot (heel-to-toe length) on the paper.</li>
                <li>Measure the length with a ruler in centimeters and compare with the table above.</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
