"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { categories } from "@/data/products";

export default function Header() {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Barre supérieure */}
      <div className="bg-orange-600 text-white text-sm py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="hidden sm:block">🚀 Livraison gratuite à Abidjan dès 25 000 FCFA d&apos;achat</span>
          <div className="flex gap-4 ml-auto text-xs">
            <Link href="#" className="hover:underline">Mon compte</Link>
            <Link href="#" className="hover:underline">Aide</Link>
            <Link href="#" className="hover:underline">Magasins</Link>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              IM
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-gray-800 leading-tight">Ivoir</div>
              <div className="font-bold text-lg text-orange-500 leading-tight -mt-1">Market</div>
            </div>
          </div>
        </Link>

        {/* Barre de recherche */}
        <div className="flex-1 max-w-2xl">
          <div className="flex rounded-full border-2 border-orange-500 overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit, une marque..."
              className="flex-1 px-4 py-2 text-sm outline-none bg-white"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 transition-colors flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Favoris */}
          <button className="hidden sm:flex flex-col items-center text-gray-600 hover:text-orange-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs mt-0.5">Favoris</span>
          </button>

          {/* Compte */}
          <button className="hidden sm:flex flex-col items-center text-gray-600 hover:text-orange-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-0.5">Mon compte</span>
          </button>

          {/* Panier */}
          <Link href="/cart" className="relative flex flex-col items-center text-gray-700 hover:text-orange-500 transition-colors">
            <div className="relative">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </div>
            <span className="text-xs mt-0.5">Panier</span>
          </Link>
        </div>
      </div>

      {/* Navigation catégories */}
      <nav className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/?cat=${cat.id}`}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors whitespace-nowrap"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              </li>
            ))}
            <li className="ml-auto">
              <Link href="/cart" className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-orange-600 hover:bg-orange-50 rounded transition-colors whitespace-nowrap">
                🔥 French Days
              </Link>
            </li>
          </ul>

          {/* Mobile burger */}
          <div className="md:hidden flex items-center justify-between py-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 text-sm text-gray-700 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Toutes les catégories
            </button>
            <span className="text-xs text-orange-600 font-semibold">🔥 French Days</span>
          </div>

          {menuOpen && (
            <div className="md:hidden pb-3 grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/?cat=${cat.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
