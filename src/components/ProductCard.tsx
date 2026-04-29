"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fr-CI", { style: "decimal" }).format(price) + " FCFA";

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden border border-gray-100 group">
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {product.badge && (
          <span className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
        {product.discount && (
          <span className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{product.discount}%
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Infos */}
      <div className="flex flex-col flex-1 p-3">
        <p className="text-xs text-gray-500 mb-0.5">{product.brand}</p>
        <h3 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 mb-2 flex-1">
          {product.name}
        </h3>

        {/* Étoiles */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-3.5 h-3.5 ${i < product.rating ? "text-yellow-400" : "text-gray-200"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Prix */}
        <div className="mb-3">
          <div className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</div>
          {product.originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              <span className="text-xs text-red-500 font-medium">
                -{formatPrice(product.originalPrice - product.price)}
              </span>
            </div>
          )}
        </div>

        {/* Bouton */}
        <button
          onClick={handleAdd}
          className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
            added
              ? "bg-green-500 text-white scale-95"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          {added ? "✓ Ajouté !" : "Ajouter au panier"}
        </button>
      </div>
    </div>
  );
}
