"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fr-CI", { style: "decimal" }).format(price) + " FCFA";

  const deliveryFee = totalPrice >= 25000 ? 0 : 2500;
  const grandTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Votre panier est vide</h1>
        <p className="text-gray-500 mb-8">
          Découvrez nos offres et ajoutez des produits à votre panier.
        </p>
        <Link
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition-colors"
        >
          Continuer mes achats
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Titre */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">
          Mon panier
          <span className="ml-2 text-base font-normal text-gray-500">({totalItems} article{totalItems > 1 ? "s" : ""})</span>
        </h1>
      </div>

      {/* Étapes */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-8 text-sm">
        <span className="flex items-center gap-1 sm:gap-1.5 text-orange-600 font-semibold">
          <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
          <span className="hidden sm:inline">Panier</span>
        </span>
        <div className="flex-1 h-px bg-gray-200 max-w-8 sm:max-w-16"></div>
        <span className="flex items-center gap-1 sm:gap-1.5 text-gray-400">
          <span className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          <span className="hidden sm:inline">Livraison</span>
        </span>
        <div className="flex-1 h-px bg-gray-200 max-w-8 sm:max-w-16"></div>
        <span className="flex items-center gap-1 sm:gap-1.5 text-gray-400">
          <span className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          <span className="hidden sm:inline">Paiement</span>
        </span>
        <div className="flex-1 h-px bg-gray-200 max-w-8 sm:max-w-16"></div>
        <span className="flex items-center gap-1 sm:gap-1.5 text-gray-400">
          <span className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          <span className="hidden sm:inline">Confirmation</span>
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Liste articles */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4"
            >
              {/* Image */}
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-0.5">{product.brand}</p>
                <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 mb-2">
                  {product.name}
                </h3>

                {/* Prix unitaire */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Quantité + Supprimer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-semibold"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-semibold"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-orange-600">
                      {formatPrice(product.price * quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Supprimer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Code promo */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Code promo</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Entrez votre code..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 transition-colors"
              />
              <button className="bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
                Appliquer
              </button>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Continuer mes achats
          </Link>
        </div>

        {/* Résumé commande */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-28">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Résumé de la commande</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sous-total ({totalItems} article{totalItems > 1 ? "s" : ""})</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frais de livraison</span>
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-medium">Gratuit</span>
                ) : (
                  <span className="font-medium">{formatPrice(deliveryFee)}</span>
                )}
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                  🚀 Plus que {formatPrice(25000 - totalPrice)} pour la livraison gratuite !
                </p>
              )}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-orange-600">{formatPrice(grandTotal)}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">TVA incluse</p>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-center transition-colors shadow-md hover:shadow-lg"
            >
              Commander maintenant →
            </Link>

            {/* Paiements */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center mb-3">Paiements sécurisés acceptés</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Orange Money", "MTN Money", "Moov Money", "Visa/MC"].map((p) => (
                  <span key={p} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
