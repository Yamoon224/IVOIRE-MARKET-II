"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

type PaymentMethod = "orange-money" | "mtn-money" | "moov-money" | "carte-bancaire";
type DeliveryMethod = "livraison-domicile" | "click-collect";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  commune: string;
  notes: string;
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  mobileNumber: string;
}

const CITIES = ["Abidjan", "Bouaké", "Daloa", "San-Pédro", "Korhogo", "Yamoussoukro"];
const COMMUNES_ABIDJAN = ["Cocody", "Plateau", "Marcory", "Treichville", "Adjamé", "Yopougon", "Abobo", "Koumassi", "Port-Bouët", "Attécoubé"];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "Abidjan",
    commune: "",
    notes: "",
    paymentMethod: "orange-money",
    deliveryMethod: "livraison-domicile",
    mobileNumber: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fr-CI", { style: "decimal" }).format(price) + " FCFA";

  const deliveryFee = form.deliveryMethod === "click-collect" ? 0 : (totalPrice >= 25000 ? 0 : 2500);
  const grandTotal = totalPrice + deliveryFee;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!form.firstName.trim()) newErrors.firstName = "Le prénom est requis";
      if (!form.lastName.trim()) newErrors.lastName = "Le nom est requis";
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newErrors.email = "Email invalide";
      }
      if (!form.phone.trim() || !/^\+?[\d\s\-]{8,15}$/.test(form.phone)) {
        newErrors.phone = "Numéro de téléphone invalide";
      }
      if (form.deliveryMethod === "livraison-domicile") {
        if (!form.address.trim()) newErrors.address = "L'adresse est requise";
        if (!form.commune && form.city === "Abidjan") newErrors.commune = "La commune est requise";
      }
    }

    if (step === 2) {
      if (
        (form.paymentMethod === "orange-money" ||
          form.paymentMethod === "mtn-money" ||
          form.paymentMethod === "moov-money") &&
        (!form.mobileNumber.trim() || !/^\+?[\d\s\-]{8,15}$/.test(form.mobileNumber))
      ) {
        newErrors.mobileNumber = "Numéro Mobile Money invalide";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleNextStep = () => {
    if (validate()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    // Simuler un délai de traitement
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Sauvegarder la commande dans localStorage
    const order = {
      id: `IM-${Date.now()}`,
      date: new Date().toISOString(),
      items,
      form,
      totalPrice,
      deliveryFee,
      grandTotal,
    };
    try {
      localStorage.setItem("ivoirmarket_last_order", JSON.stringify(order));
    } catch {
      // Silently fail
    }

    clearCart();
    router.push("/checkout/confirmation");
  };

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="text-xl font-bold text-gray-700 mb-4">Votre panier est vide</h1>
        <Link href="/" className="inline-block bg-orange-500 text-white font-bold px-8 py-3 rounded-full hover:bg-orange-600 transition-colors">
          Retour aux achats
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/cart" className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Finaliser ma commande</h1>
      </div>

      {/* Étapes */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-8 text-sm">
        <span className="flex items-center gap-1 sm:gap-1.5 text-gray-400">
          <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
          <span className="hidden sm:inline">Panier</span>
        </span>
        <div className="flex-1 h-px bg-gray-200 max-w-8 sm:max-w-16"></div>
        <span className={`flex items-center gap-1 sm:gap-1.5 ${step >= 1 ? "text-orange-600 font-semibold" : "text-gray-400"}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"}`}>2</span>
          <span className="hidden sm:inline">Livraison</span>
        </span>
        <div className="flex-1 h-px bg-gray-200 max-w-8 sm:max-w-16"></div>
        <span className={`flex items-center gap-1 sm:gap-1.5 ${step === 2 ? "text-orange-600 font-semibold" : "text-gray-400"}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"}`}>3</span>
          <span className="hidden sm:inline">Paiement</span>
        </span>
        <div className="flex-1 h-px bg-gray-200 max-w-8 sm:max-w-16"></div>
        <span className="flex items-center gap-1 sm:gap-1.5 text-gray-400">
          <span className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          <span className="hidden sm:inline">Confirmation</span>
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2 space-y-6">

            {/* ===== ÉTAPE 1 : LIVRAISON ===== */}
            {step === 1 && (
              <>
                {/* Mode de livraison */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Mode de livraison</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        value: "livraison-domicile" as const,
                        icon: "🚚",
                        label: "Livraison à domicile",
                        desc: "24h à Abidjan, 3-5j en région",
                      },
                      {
                        value: "click-collect" as const,
                        icon: "🏪",
                        label: "Click & Collect",
                        desc: "Retrait gratuit en 2h",
                      },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          form.deliveryMethod === opt.value
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value={opt.value}
                          checked={form.deliveryMethod === opt.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="text-2xl mt-0.5">{opt.icon}</span>
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">{opt.label}</div>
                          <div className="text-xs text-gray-500">{opt.desc}</div>
                        </div>
                        {form.deliveryMethod === opt.value && (
                          <span className="ml-auto text-orange-500">✓</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Informations personnelles */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Vos informations</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Prénom *"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      error={errors.firstName}
                      placeholder="Ex: Konan"
                    />
                    <Field
                      label="Nom *"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      error={errors.lastName}
                      placeholder="Ex: Kouamé"
                    />
                    <Field
                      label="Email *"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="konan@exemple.ci"
                    />
                    <Field
                      label="Téléphone *"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      placeholder="+225 07 00 00 00 00"
                    />
                  </div>
                </div>

                {/* Adresse de livraison */}
                {form.deliveryMethod === "livraison-domicile" && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Adresse de livraison</h2>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Ville *</label>
                          <select
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors bg-white"
                          >
                            {CITIES.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                        {form.city === "Abidjan" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Commune *</label>
                            <select
                              name="commune"
                              value={form.commune}
                              onChange={handleChange}
                              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors bg-white ${errors.commune ? "border-red-400" : "border-gray-200"}`}
                            >
                              <option value="">Sélectionner...</option>
                              {COMMUNES_ABIDJAN.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                            {errors.commune && <p className="text-red-500 text-xs mt-1">{errors.commune}</p>}
                          </div>
                        )}
                      </div>
                      <Field
                        label="Adresse précise *"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        error={errors.address}
                        placeholder="Rue, quartier, point de repère..."
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes (optionnel)</label>
                        <textarea
                          name="notes"
                          value={form.notes}
                          onChange={handleChange}
                          rows={2}
                          placeholder="Instructions particulières pour la livraison..."
                          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors shadow-md"
                >
                  Passer au paiement →
                </button>
              </>
            )}

            {/* ===== ÉTAPE 2 : PAIEMENT ===== */}
            {step === 2 && (
              <>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Mode de paiement</h2>

                  <div className="space-y-3">
                    {[
                      { value: "orange-money" as const, icon: "🟠", label: "Orange Money", color: "orange" },
                      { value: "mtn-money" as const, icon: "🟡", label: "MTN Mobile Money", color: "yellow" },
                      { value: "moov-money" as const, icon: "🔵", label: "Moov Money", color: "blue" },
                      { value: "carte-bancaire" as const, icon: "💳", label: "Carte Visa / Mastercard", color: "gray" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          form.paymentMethod === opt.value
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={opt.value}
                          checked={form.paymentMethod === opt.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="font-semibold text-gray-800 text-sm flex-1">{opt.label}</span>
                        {form.paymentMethod === opt.value && (
                          <span className="text-orange-500 font-bold">✓</span>
                        )}
                      </label>
                    ))}
                  </div>

                  {/* Numéro Mobile Money */}
                  {form.paymentMethod !== "carte-bancaire" && (
                    <div className="mt-5">
                      <Field
                        label={`Numéro ${form.paymentMethod === "orange-money" ? "Orange" : form.paymentMethod === "mtn-money" ? "MTN" : "Moov"} Money *`}
                        name="mobileNumber"
                        type="tel"
                        value={form.mobileNumber}
                        onChange={handleChange}
                        error={errors.mobileNumber}
                        placeholder="+225 07 00 00 00 00"
                      />
                      <p className="text-xs text-gray-500 mt-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                        💡 Après validation, vous recevrez une demande de paiement sur ce numéro. Confirmez avec votre code PIN.
                      </p>
                    </div>
                  )}

                  {form.paymentMethod === "carte-bancaire" && (
                    <div className="mt-5 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
                      💳 Vous serez redirigé vers notre interface de paiement sécurisée 3D Secure après confirmation.
                    </div>
                  )}
                </div>

                {/* Récapitulatif livraison */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-gray-800">Récapitulatif livraison</h2>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm text-orange-600 hover:underline font-medium"
                    >
                      Modifier
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>{form.firstName} {form.lastName}</strong></p>
                    <p>{form.phone} · {form.email}</p>
                    {form.deliveryMethod === "livraison-domicile" ? (
                      <p>🚚 {form.address}{form.commune ? `, ${form.commune}` : ""}, {form.city}</p>
                    ) : (
                      <p>🏪 Click & Collect – Retrait en 2h</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-xl transition-colors"
                  >
                    ← Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-colors shadow-md"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Traitement...
                      </span>
                    ) : (
                      `Confirmer et payer ${formatPrice(grandTotal)}`
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Résumé commande */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h2 className="text-base font-bold text-gray-800 mb-4">
                Ma commande ({items.length} article{items.length > 1 ? "s" : ""})
              </h2>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 line-clamp-2 leading-snug">{product.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">×{quantity}</span>
                        <span className="text-xs font-bold text-gray-800">
                          {formatPrice(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-medium">Gratuit</span>
                  ) : (
                    <span>{formatPrice(deliveryFee)}</span>
                  )}
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
                  <span>Total TTC</span>
                  <span className="text-orange-600">{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

// Composant champ de formulaire réutilisable
function Field({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors ${
          error ? "border-red-400 bg-red-50" : "border-gray-200"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
