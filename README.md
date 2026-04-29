# Ivoir Market

Marketplace e-commerce destinée à la Côte d'Ivoire, développée avec Next.js 16, React 19 et Tailwind CSS v4.

## Fonctionnalités

- **Page d'accueil** — Carrousel de bannières promotionnelles, filtre par catégorie, section meilleures offres
- **Catalogue produits** — 8 catégories (High-Tech, Alimentation, Électroménager, Mode & Beauté, Maison & Jardin, Sport & Loisirs, Culture & Jeux, Santé & Beauté)
- **Panier** — Ajout/suppression/modification des quantités, persistance via `localStorage`
- **Checkout** — Formulaire en 2 étapes avec validation, choix du mode de paiement et de livraison
- **Paiements mobile money** — Orange Money, MTN Money, Moov Money, Carte bancaire
- **Livraison** — Livraison à domicile (gratuite dès 25 000 FCFA à Abidjan) ou Click & Collect
- **Responsive** — Interface adaptée mobile et desktop

## Stack technique

| Technologie | Version |
|---|---|
| Next.js | 16.2.4 |
| React | 19.2.4 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |

## Structure du projet

```
src/
├── app/
│   ├── page.tsx          # Page d'accueil
│   ├── cart/page.tsx     # Page panier
│   └── checkout/page.tsx # Page commande
├── components/
│   ├── Header.tsx        # En-tête avec barre de recherche et panier
│   ├── Footer.tsx        # Pied de page
│   └── ProductCard.tsx   # Carte produit
├── context/
│   └── CartContext.tsx   # État global du panier (useReducer + localStorage)
└── data/
    └── products.ts       # Données produits et catégories
```

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Scripts disponibles

```bash
npm run dev    # Serveur de développement
npm run build  # Build de production
npm run start  # Démarrer la production
npm run lint   # Vérification du code
```

# IVOIRE-MARKET-II
