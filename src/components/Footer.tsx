import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Engagements */}
      <div className="border-b border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🚚", title: "Livraison rapide", desc: "En 24h à Abidjan" },
            { icon: "🔒", title: "Paiement sécurisé", desc: "Mobile Money & Carte" },
            { icon: "↩️", title: "Retour gratuit", desc: "30 jours pour changer d'avis" },
            { icon: "📞", title: "SAV 7j/7", desc: "Support client disponible" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="text-white font-semibold text-sm">{item.title}</div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Liens */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-semibold mb-4">Ivoir Market</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Qui sommes-nous</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Nos engagements</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Recrutement</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Presse</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Click & Collect</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Carte Fidélité</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Application mobile</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Bons de réduction</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Aide</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Suivi de commande</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Retours & échanges</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contactez-nous</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Paiements acceptés</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Orange Money", "MTN Money", "Moov Money", "Visa"].map((p) => (
                <span key={p} className="bg-gray-700 text-xs px-2 py-1 rounded text-gray-300">{p}</span>
              ))}
            </div>
            <h4 className="text-white font-semibold mb-2 mt-4">Suivez-nous</h4>
            <div className="flex gap-3">
              {["📘 Facebook", "📸 Instagram", "🐦 Twitter"].map((s) => (
                <Link key={s} href="#" className="text-xs hover:text-white transition-colors">{s}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© 2026 Ivoir Market – Côte d&apos;Ivoire. Tous droits réservés.</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">CGV</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
