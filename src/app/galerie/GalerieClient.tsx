// =============================================================================
// FICHIER : src/app/galerie/GalerieClient.tsx
// RÔLE    : Galerie photo interactive avec filtre par catégorie
//
// Même architecture que SaveursClient.tsx :
// → "use client" car utilise useState pour le filtre (produit/lifestyle)
// → La page (page.tsx) reste Server Component pour les métadonnées SEO
// =============================================================================
"use client";

import { useState } from "react";
import Image from "next/image";

// Données centralisées de la galerie
import { galleryItems } from "@/data/gallery";

// Type GalleryItem pour TypeScript
import type { GalleryItem } from "@/types";

// -----------------------------------------------------------------------------
// Type FilterKey pour la galerie
// "all" | "produit" | "lifestyle"
// GalleryItem["category"] extrait le type de la propriété "category" de GalleryItem
// → Si on modifie les catégories dans types/index.ts, ce filtre se met à jour auto
// -----------------------------------------------------------------------------
type FilterKey = "all" | GalleryItem["category"];

// Boutons de filtre de la galerie
const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Tout voir" },
  { key: "produit", label: "Produits" },
  { key: "lifestyle", label: "Lifestyle" },
];

export default function GalerieClient() {
  // État du filtre actif — "all" par défaut (toutes les photos visibles)
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  // Filtrage des photos selon la catégorie sélectionnée
  // Même logique que SaveursClient — recalculé automatiquement à chaque render
  const filtered =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeFilter);

  return (
    <>
      {/* === HERO DE LA PAGE GALERIE === */}
      <section className="bg-crimson py-24 px-[5%] text-center">
        <p className="section-eyebrow text-gold">▷▷◁ Notre Univers</p>
        <h1 className="section-title text-white mb-4">Galerie</h1>
        <p className="text-white/70 max-w-xl mx-auto text-base leading-relaxed">
          Découvrez Leader en images — nos produits, nos moments, notre identité
          africaine.
        </p>
      </section>

      {/* === BARRE DE FILTRES (identique à la page Saveurs) === */}
      {/*
        sticky top-[72px] z-40 : reste visible au scroll, sous la Navbar
      */}
      <div className="bg-[#f5ede0] py-4 px-[5%] flex flex-wrap gap-2 justify-center sticky top-[72px] z-40">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`
              px-5 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-200
              ${
                activeFilter === f.key
                  ? "bg-crimson border-crimson text-white"
                  : "border-crimson text-crimson hover:bg-crimson hover:text-white"
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* === GRILLE PHOTOS EN COLONNES (Masonry layout) === */}
      <section className="py-12 px-[5%]">
        {/*
          LAYOUT MASONRY avec CSS Columns :
          "columns-2 md:columns-3" → 2 colonnes sur mobile, 3 sur desktop
          
          Contrairement à grid, le layout en colonnes CSS permet aux éléments
          d'avoir des hauteurs différentes sans laisser d'espace vide.
          C'est l'effet "Pinterest" où les images se tassent vers le haut.
          
          gap-4 : espace de 1rem entre les colonnes
          space-y-4 : espace de 1rem entre les photos dans chaque colonne
        */}
        <div className="columns-2 md:columns-3 gap-4 max-w-5xl mx-auto space-y-4">
          {filtered.map((item) => (
            /*
              break-inside-avoid : CRUCIAL pour le layout masonry
              → Empêche une photo d'être coupée entre deux colonnes
              → Sans cette règle, une image pourrait commencer en bas
                d'une colonne et continuer en haut de la suivante
              
              group : classe parent pour les effets "group-hover"
              → Permet d'activer des styles sur un enfant quand le PARENT est survolé
                (overlay visible au survol du conteneur entier)
            */
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl break-inside-avoid cursor-pointer"
            >
              {/*
                Image Next.js sans fill (largeur/hauteur explicites)
                width={500} height={600} : dimensions "naturelles" de l'image
                  → Next.js les utilise pour calculer le ratio et éviter le CLS
                    (Cumulative Layout Shift — déplacement de contenu au chargement)
                
                className="w-full object-cover" :
                  → w-full : prend toute la largeur de sa colonne
                  → object-cover : rogne proprement si les proportions diffèrent
                
                group-hover:scale-105 : l'image grossit légèrement au survol du parent
                  → Possible grâce à la classe "group" sur le parent
                transition-transform duration-500 : animation douce 500ms
              */}
              <Image
                src={item.src}
                alt={item.alt}
                width={500}
                height={600}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/*
                OVERLAY AU SURVOL
                opacity-0 : invisible par défaut
                group-hover:opacity-100 : visible quand le parent (group) est survolé
                transition-opacity duration-300 : apparition/disparition douce
                
                bg-gradient-to-t from-crimson/65 to-transparent :
                  dégradé de bas en haut, du rouge à transparent
                  → La légende en bas reste lisible sur fond rouge
              */}
              <div className="absolute inset-0 bg-gradient-to-t from-crimson/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-semibold text-sm">
                  {item.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
