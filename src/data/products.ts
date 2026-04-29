export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { id: "alimentation", name: "Alimentation", icon: "🛒", color: "bg-green-100 text-green-700" },
  { id: "high-tech", name: "High-Tech", icon: "📱", color: "bg-blue-100 text-blue-700" },
  { id: "electromenager", name: "Électroménager", icon: "🏠", color: "bg-purple-100 text-purple-700" },
  { id: "mode", name: "Mode & Beauté", icon: "👗", color: "bg-pink-100 text-pink-700" },
  { id: "maison", name: "Maison & Jardin", icon: "🌿", color: "bg-emerald-100 text-emerald-700" },
  { id: "sport", name: "Sport & Loisirs", icon: "⚽", color: "bg-orange-100 text-orange-700" },
  { id: "culture", name: "Culture & Jeux", icon: "🎮", color: "bg-red-100 text-red-700" },
  { id: "sante", name: "Santé & Beauté", icon: "💊", color: "bg-teal-100 text-teal-700" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Smartphone Samsung Galaxy A55 5G 256GB",
    brand: "Samsung",
    price: 179000,
    originalPrice: 219000,
    discount: 18,
    category: "high-tech",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    rating: 4,
    reviews: 230,
    badge: "BON PLAN",
    description: "Smartphone 5G avec écran AMOLED 6.6\", 256Go de stockage",
  },
  {
    id: 2,
    name: "Casque Audio Bluetooth Sony WH-1000XM5",
    brand: "Sony",
    price: 89000,
    originalPrice: 149000,
    discount: 40,
    category: "high-tech",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 412,
    badge: "EXCLU WEB",
    description: "Casque à réduction de bruit active leader du marché",
  },
  {
    id: 3,
    name: "Aspirateur Robot iRobot Roomba j7+",
    brand: "iRobot",
    price: 129000,
    originalPrice: 179000,
    discount: 28,
    category: "electromenager",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rating: 4,
    reviews: 156,
    badge: "BON PLAN",
    description: "Robot aspirateur avec auto-vidage et cartographie intelligente",
  },
  {
    id: 4,
    name: "Tablette Apple iPad 10e génération 64Go WiFi",
    brand: "Apple",
    price: 219000,
    originalPrice: 259000,
    discount: 15,
    category: "high-tech",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 389,
    description: "Tablette avec écran Liquid Retina 10.9\", puce A14 Bionic",
  },
  {
    id: 5,
    name: "Machine à café Nespresso Vertuo Pop",
    brand: "Nespresso",
    price: 45000,
    originalPrice: 65000,
    discount: 31,
    category: "electromenager",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    rating: 4,
    reviews: 88,
    badge: "BON PLAN",
    description: "Machine à café à capsules avec 5 tailles de tasses",
  },
  {
    id: 6,
    name: "Nike Air Max 270 Homme Blanc/Noir",
    brand: "Nike",
    price: 52000,
    originalPrice: 69000,
    discount: 25,
    category: "mode",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4,
    reviews: 521,
    description: "Chaussures de sport avec amorti Air Max visible",
  },
  {
    id: 7,
    name: "Livre \"Le Retour du Peuple\" - Bestseller",
    brand: "Éditions du Seuil",
    price: 8500,
    originalPrice: 12000,
    discount: 29,
    category: "culture",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    rating: 4,
    reviews: 67,
    description: "Roman africain contemporain, lauréat du Prix du Livre 2025",
  },
  {
    id: 8,
    name: "Barbecue à gaz Campingaz 3 Series Classic",
    brand: "Campingaz",
    price: 89000,
    originalPrice: 115000,
    discount: 23,
    category: "maison",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop",
    rating: 4,
    reviews: 44,
    badge: "BON PLAN",
    description: "Barbecue 3 brûleurs, 9000W, grille en fonte émaillée",
  },
  {
    id: 9,
    name: "Complément alimentaire Oméga-3 x90 gélules",
    brand: "Nutri&Co",
    price: 12000,
    category: "sante",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 203,
    description: "Oméga-3 d'origine marine, haute concentration en EPA/DHA",
  },
  {
    id: 10,
    name: "PlayStation 5 + Manette DualSense",
    brand: "Sony",
    price: 279000,
    originalPrice: 319000,
    discount: 13,
    category: "culture",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 1024,
    badge: "BON PLAN",
    description: "Console next-gen avec SSD ultra-rapide et ray-tracing",
  },
  {
    id: 11,
    name: "Lave-linge Samsung 9kg EcoBubble",
    brand: "Samsung",
    price: 185000,
    originalPrice: 229000,
    discount: 19,
    category: "electromenager",
    image: "https://images.unsplash.com/photo-1626806787461-102c1a7f1b8f?w=400&h=400&fit=crop",
    rating: 4,
    reviews: 172,
    description: "Lave-linge frontal 9kg, classe énergétique A, 1400 tr/min",
  },
  {
    id: 12,
    name: "Vélo électrique Decathlon E-STILUS Gris",
    brand: "Decathlon",
    price: 349000,
    originalPrice: 429000,
    discount: 19,
    category: "sport",
    image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=400&h=400&fit=crop",
    rating: 4,
    reviews: 89,
    description: "Vélo électrique urbain, batterie 500Wh, autonomie 100km",
  },
];

export const banners = [
  {
    id: 1,
    title: "French Days Ivoir Market",
    subtitle: "Jusqu'à -50% sur une sélection de produits",
    cta: "Voir les offres",
    bg: "from-orange-500 to-red-600",
    badge: "OFFRES LIMITÉES",
  },
  {
    id: 2,
    title: "High-Tech & Multimédia",
    subtitle: "Les meilleures marques au meilleur prix",
    cta: "Découvrir",
    bg: "from-blue-600 to-indigo-700",
    badge: "NOUVEAUTÉS",
  },
  {
    id: 3,
    title: "Livraison rapide en Côte d'Ivoire",
    subtitle: "Commandez avant 15h, livré demain à Abidjan",
    cta: "Commander maintenant",
    bg: "from-green-500 to-teal-600",
    badge: "SERVICE PREMIUM",
  },
];
