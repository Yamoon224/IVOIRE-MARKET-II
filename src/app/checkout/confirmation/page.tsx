"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface OrderItem {
  product: { name: string; price: number };
  quantity: number;
}

interface LastOrder {
  id: string;
  date: string;
  items: OrderItem[];
  grandTotal: number;
  deliveryFee: number;
  form: {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    commune?: string;
    deliveryMethod: string;
    paymentMethod: string;
  };
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-CI", { style: "decimal" }).format(price) + " FCFA";

const paymentLabels: Record<string, string> = {
  "orange-money": "Orange Money 🟠",
  "mtn-money": "MTN Money 🟡",
  "moov-money": "Moov Money 🔵",
  "carte-bancaire": "Carte Bancaire 💳",
};

export default function ConfirmationPage() {
  const [order, setOrder] = useState<LastOrder | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ivoirmarket_last_order");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch {
      // Silently fail
    }
  }, []);

  const handleCopyOrderId = () => {
    if (order) {
      navigator.clipboard.writeText(order.id).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const estimatedDelivery = () => {
    if (!order) return "";
    const d = new Date();
    if (order.form.deliveryMethod === "click-collect") {
      d.setHours(d.getHours() + 2);
      return `Prêt dans ~2h (${d.toLocaleTimeString("fr-CI", { hour: "2-digit", minute: "2-digit" })})`;
    }
    if (order.form.city === "Abidjan") {
      d.setDate(d.getDate() + 1);
      return `Livraison le ${d.toLocaleDateString("fr-CI", { weekday: "long", day: "numeric", month: "long" })}`;
    }
    const d2 = new Date();
    d2.setDate(d2.getDate() + 4);
    return `Livraison entre le ${d.toLocaleDateString("fr-CI", { day: "numeric", month: "short" })} et le ${d2.toLocaleDateString("fr-CI", { day: "numeric", month: "short" })}`;
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      {/* Étapes complétées */}
      <div className="flex items-center justify-center gap-2 mb-10 text-sm">
        {["Panier", "Livraison", "Paiement", "Confirmation"].map((label, i) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="flex items-center gap-1.5 text-green-600 font-semibold">
              <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
              <span className="hidden sm:inline">{label}</span>
            </span>
            {i < 3 && <div className="w-8 h-px bg-green-300"></div>}
          </div>
        ))}
      </div>

      {/* Icône succès */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Commande confirmée ! 🎉</h1>
        <p className="text-gray-500">
          Merci pour votre achat. Vous recevrez un SMS de confirmation.
        </p>
      </div>

      {/* Numéro commande */}
      {order && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center mb-6">
          <p className="text-sm text-gray-600 mb-1">Numéro de commande</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-bold text-orange-600 tracking-wide font-mono">
              {order.id}
            </span>
            <button
              onClick={handleCopyOrderId}
              className="text-orange-400 hover:text-orange-600 transition-colors"
              title="Copier"
            >
              {copied ? (
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {order.date && new Date(order.date).toLocaleDateString("fr-CI", {
              day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
            })}
          </p>
        </div>
      )}

      {/* Infos livraison */}
      {order && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-lg">Détails de la commande</h2>

          {/* Livraison estimée */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
            <span className="text-2xl">
              {order.form.deliveryMethod === "click-collect" ? "🏪" : "🚚"}
            </span>
            <div>
              <div className="font-semibold text-gray-800 text-sm">
                {order.form.deliveryMethod === "click-collect" ? "Click & Collect" : "Livraison à domicile"}
              </div>
              <div className="text-sm text-blue-700 font-medium">{estimatedDelivery()}</div>
            </div>
          </div>

          {/* Paiement */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
              💳
            </div>
            <div>
              <p className="text-xs text-gray-500">Paiement par</p>
              <p className="text-sm font-semibold text-gray-800">
                {paymentLabels[order.form.paymentMethod] || order.form.paymentMethod}
              </p>
            </div>
          </div>

          {/* Destinataire */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
              👤
            </div>
            <div>
              <p className="text-xs text-gray-500">Destinataire</p>
              <p className="text-sm font-semibold text-gray-800">
                {order.form.firstName} {order.form.lastName} · {order.form.phone}
              </p>
              {order.form.deliveryMethod !== "click-collect" && (
                <p className="text-xs text-gray-500">
                  {order.form.commune ? `${order.form.commune}, ` : ""}{order.form.city}
                </p>
              )}
            </div>
          </div>

          {/* Articles */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Articles ({order.items.length})</p>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.product.name} <span className="text-gray-400">×{item.quantity}</span>
                  </span>
                  <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold">
              <span>Total payé</span>
              <span className="text-orange-600">{formatPrice(order.grandTotal)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Message si pas de commande */}
      {!order && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center mb-6">
          <p className="text-gray-500">Aucune commande trouvée. Peut-être avez-vous déjà effacé vos données.</p>
        </div>
      )}

      {/* Info SMS */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-sm text-yellow-800 mb-8 text-center">
        📱 Un SMS de confirmation vous a été envoyé. Conservez votre numéro de commande pour le suivi.
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-center transition-colors shadow-md"
        >
          🏠 Retourner à l'accueil
        </Link>
        <Link
          href="/"
          onClick={() => {
            // Réinitialiser le scroll
          }}
          className="flex-1 border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold py-4 rounded-xl text-center transition-colors"
        >
          Continuer mes achats
        </Link>
      </div>
    </main>
  );
}
