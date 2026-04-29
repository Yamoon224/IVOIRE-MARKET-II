"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, categories, banners } from "@/data/products";

export default function HomePage() {
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [bannerIndex, setBannerIndex] = useState(0);

  const currentBanner = banners[bannerIndex];

  const filteredProducts = useMemo(() => {
    if (!activeCat) return products;
    return products.filter((p) => p.category === activeCat);
  }, [activeCat]);

  const promoProducts = products.filter((p) => p.discount && p.discount >= 20);

  return (
    <main>
      {/* ======================== HERO BANNER ======================== */}
      <section className={`bg-gradient-to-r ${currentBanner.bg} text-white`}>
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              {currentBanner.badge}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {currentBanner.title}
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">{currentBanner.subtitle}</p>
            <button className="bg-white text-gray-800 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
              {currentBanner.cta}
            </button>
          </div>
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex flex-row gap-3 items-center">
              {banners.map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => setBannerIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === bannerIndex ? "bg-white scale-125" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Indicateurs */}
        <div className="flex justify-center gap-2 pb-6">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setBannerIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === bannerIndex ? "w-8 bg-white" : "w-3 bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ======================== BANDE SERVICES ======================== */}
      <section className="bg-orange-50 border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🚚", text: "Livraison 24h à Abidjan" },
            { icon: "📦", text: "Click & Collect gratuit" },
            { icon: "💳", text: "Paiement Mobile Money" },
            { icon: "🔄", text: "Retour 30 jours offert" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* ======================== CATÉGORIES ======================== */}
        <section className="py-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos rayons</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 sm:grid sm:grid-cols-9 sm:overflow-visible sm:pb-0">
            <button
              onClick={() => setActiveCat(null)}
              className={`flex-shrink-0 w-16 sm:w-auto flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                activeCat === null
                  ? "bg-orange-500 text-white shadow-md scale-105"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-2xl">🏪</span>
              <span className="text-xs font-medium text-center leading-tight">Tout voir</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(activeCat === cat.id ? null : cat.id)}
                className={`flex-shrink-0 w-16 sm:w-auto flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                  activeCat === cat.id
                    ? "bg-orange-500 text-white shadow-md scale-105"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium text-center leading-tight">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ======================== OFFRES FLASH ======================== */}
        {!activeCat && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">French Days</h2>
                  <p className="text-sm text-orange-600 font-medium">Promotions jusqu&apos;à -40% – Offres limitées !</p>
                </div>
              </div>
              <Link
                href="#tous-les-produits"
                className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
              >
                Voir tout
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {promoProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* ======================== BANNIÈRE INTERMÉDIAIRE ======================== */}
        {!activeCat && (
          <section className="mb-12">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white flex flex-col justify-center">
                <span className="text-sm font-semibold bg-white/20 inline-block px-3 py-1 rounded-full mb-3 w-fit">
                  NOUVEAUTÉ
                </span>
                <h3 className="text-2xl font-bold mb-2">High-Tech & Gaming</h3>
                <p className="text-blue-100 mb-4">Smartphones, consoles, tablettes au meilleur prix</p>
                <button
                  onClick={() => setActiveCat("high-tech")}
                  className="bg-white text-blue-700 font-bold px-6 py-2.5 rounded-full hover:bg-blue-50 transition-colors w-fit text-sm"
                >
                  Explorer maintenant
                </button>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white flex flex-col justify-center">
                <span className="text-sm font-semibold bg-white/20 inline-block px-3 py-1 rounded-full mb-3 w-fit">
                  PROMO
                </span>
                <h3 className="text-2xl font-bold mb-2">Électroménager</h3>
                <p className="text-green-100 mb-4">Jusqu&apos;à -30% sur les gros appareils</p>
                <button
                  onClick={() => setActiveCat("electromenager")}
                  className="bg-white text-green-700 font-bold px-6 py-2.5 rounded-full hover:bg-green-50 transition-colors w-fit text-sm"
                >
                  Voir les offres
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ======================== TOUS LES PRODUITS ======================== */}
        <section id="tous-les-produits" className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeCat
                ? categories.find((c) => c.id === activeCat)?.name ?? "Produits"
                : "Tous nos produits"}
            </h2>
            <span className="text-sm text-gray-500">{filteredProducts.length} produit(s)</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-4">😕</p>
              <p className="text-lg">Aucun produit dans cette catégorie pour l&apos;instant.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        {/* ======================== ENGAGEMENT MARQUE ======================== */}
        {!activeCat && (
          <section className="mb-16 bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Nos engagements</h2>
            <p className="text-gray-500 text-center mb-8">Ivoir Market s&apos;engage pour vous offrir le meilleur</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: "🏆",
                  title: "Prix les plus bas",
                  desc: "Nous vérifions les prix chaque jour pour vous garantir les meilleures offres en Côte d'Ivoire.",
                },
                {
                  icon: "✅",
                  title: "Produits authentiques",
                  desc: "Tous nos produits sont 100% originaux, sourcés directement auprès des distributeurs officiels.",
                },
                {
                  icon: "🌍",
                  title: "Made for Côte d'Ivoire",
                  desc: "Une plateforme conçue pour les Ivoiriens, avec des moyens de paiement locaux adaptés.",
                },
              ].map((e) => (
                <div key={e.title} className="text-center">
                  <div className="text-4xl mb-3">{e.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{e.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
