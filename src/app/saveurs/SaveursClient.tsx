// =============================================================================
// FICHIER : src/app/saveurs/SaveursClient.tsx
// RÔLE    : Logique interactive de la page Saveurs (filtre par catégorie)
//
// POURQUOI un fichier séparé "SaveursClient" ?
// → La page Saveurs a besoin de deux choses :
//   1. Métadonnées SEO (title, description) → doit être un Server Component
//   2. Filtre interactif avec useState → doit être un Client Component
//
// On ne peut PAS avoir les deux dans le même fichier !
// Solution : "use client" dans SaveursClient.tsx pour l'interactivité,
// et page.tsx reste Server Component pour les métadonnées SEO.
// page.tsx importe et rend SaveursClient → les deux cohabitent proprement.
//
// PATTERN : Server Component (page.tsx) → importe → Client Component (SaveursClient.tsx)
// =============================================================================
"use client"; // Directive nécessaire pour useState et les onClick

import { useState } from "react";

// Link et Image pour la navigation et les images
import Link from "next/link";

// Composants réutilisables
import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";

// Données centralisées des produits
import { products } from "@/data/products";

// Types TypeScript
import type { Product } from "@/types";

// -----------------------------------------------------------------------------
// Type FilterKey : union des valeurs possibles pour le filtre
// "all" = afficher tous les produits
// Product["category"] = reprend exactement l'union définie dans l'interface Product
//   → "ananas" | "bissap" | "orange" | "nzinga"
// Résultat : FilterKey = "all" | "ananas" | "bissap" | "orange" | "nzinga"
// -----------------------------------------------------------------------------
type FilterKey = "all" | Product["category"];

// -----------------------------------------------------------------------------
// Tableau des boutons de filtre — défini en dehors du composant
// pour éviter une recréation à chaque rendu
// -----------------------------------------------------------------------------
const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "ananas", label: "🍍 Ananas" },
  { key: "bissap", label: "🌺 Bissap" },
  { key: "orange", label: "🍊 Orange" },
  { key: "nzinga", label: "🍉 Nzinga" },
];

// -----------------------------------------------------------------------------
// COMPOSANT SaveursClient
// -----------------------------------------------------------------------------
export default function SaveursClient() {
  
  // ---------------------------------------------------------------------------
  // ÉTAT : filtre actif
  // useState<FilterKey>("all") :
  //   - Type générique <FilterKey> : TypeScript garantit que la valeur
  //     est toujours une des options valides
  //   - "all" : valeur initiale → au chargement, tous les produits s'affichent
  //   - activeFilter : valeur courante du filtre (lecture)
  //   - setActiveFilter : fonction pour changer le filtre (écriture)
  //     → Appeler setActiveFilter() déclenche un re-render du composant
  // ---------------------------------------------------------------------------
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  // ---------------------------------------------------------------------------
  // FILTRAGE DES PRODUITS
  // Calculé à chaque render automatiquement quand activeFilter change
  //
  // Si "all" → on retourne tous les produits tel quel
  // Sinon    → .filter() garde uniquement les produits dont la catégorie correspond
  //
  // .filter(callback) : crée un nouveau tableau avec les éléments pour lesquels
  //   callback retourne true
  //   p.category === activeFilter : comparaison de chaînes
  // ---------------------------------------------------------------------------
  const filtered =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* <> </> : Fragment React → permet de retourner plusieurs éléments
          sans ajouter un div inutile dans le DOM */}

      {/* === SECTION HERO DE LA PAGE SAVEURS === */}
      {/*
        Fond rouge, centré, sans image
        Présente la page et son contenu
      */}
      <section className="bg-crimson py-24 px-[5%] text-center">
        <p className="section-eyebrow text-gold">▷▷◁ Nos Produits</p>
        {/* h1 : titre principal de la PAGE (SEO — une seule balise h1 par page) */}
        <h1 className="section-title text-white mb-4">Nos Saveurs</h1>
        <p className="text-white/70 max-w-xl mx-auto text-base leading-relaxed">
          Quatre jus uniques, tous issus de fruits africains sélectionnés avec
          soin. Sans conservateurs, sans colorants.
        </p>
      </section>

      {/* === BARRE DE FILTRES === */}
      {/*
        sticky top-[72px] : la barre de filtres reste visible quand on scroll
          → top-[72px] = juste en-dessous de la Navbar fixe (72px de hauteur)
        z-40 : au-dessus du contenu mais en-dessous de la Navbar (z-50)
        bg-[#f5ede0] : beige légèrement plus foncé que la cream → séparation visuelle
        flex flex-wrap gap-2 justify-center : centré, les boutons passent à la ligne si besoin
      */}
      <div className="bg-[#f5ede0] py-4 px-[5%] flex flex-wrap gap-2 justify-center sticky top-[72px] z-40">
        {filters.map((f) => (
          <button
            key={f.key}
            // onClick : quand on clique, on met à jour le filtre actif
            // → React re-rend le composant → "filtered" est recalculé → les cartes changent
            onClick={() => setActiveFilter(f.key)}
            className={`
              px-5 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-200
              ${
                // Style conditionnel : actif ou inactif
                activeFilter === f.key
                  // ACTIF : fond rouge plein → en évidence
                  ? "bg-crimson border-crimson text-white"
                  // INACTIF : transparent avec bordure → cliquable mais secondaire
                  : "border-crimson text-crimson hover:bg-crimson hover:text-white"
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* === GRILLE DE PRODUITS === */}
      <section className="py-16 px-[5%]">
        {/*
          grid grid-cols-1 md:grid-cols-2 : 1 colonne mobile, 2 colonnes desktop
          gap-8 : espace de 2rem entre les cartes
          max-w-5xl mx-auto : centré, largeur max 64rem
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/*
            .map() sur "filtered" (tableau dynamique selon le filtre actif)
            → Quand le filtre change, "filtered" change, les cartes changent
            key={product.id} : identifiant stable pour React
              → React réutilise les éléments existants au lieu de tout recréer
              → Animation plus fluide, meilleure performance
          */}
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              // variant non précisé → valeur par défaut "grid" → carte détaillée
            />
          ))}
        </div>
      </section>

      {/* === CTA VERS LA COMMANDE === */}
      <div className="text-center pb-20">
        {/* btn-primary : classe de globals.css → bouton rouge plein */}
        <Link href="/contact" className="btn-primary">
          Commander nos jus →
        </Link>
      </div>
    </>
  );
}
