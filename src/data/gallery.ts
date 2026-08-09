// =============================================================================
// FICHIER : src/data/gallery.ts
// RÔLE    : Données de la galerie photo — même principe que products.ts
//
// Centraliser les données de la galerie ici permet de :
// - Ajouter facilement une nouvelle photo (1 objet à ajouter)
// - Changer une légende ou une catégorie sans toucher aux composants
// - Réutiliser la galerie dans plusieurs pages si besoin
// =============================================================================

// Import du type GalleryItem depuis notre fichier de types centralisé
import type { GalleryItem } from "@/types";

// -----------------------------------------------------------------------------
// Tableau de toutes les photos de la galerie
// Chaque objet correspond à une photo avec ses métadonnées
// -----------------------------------------------------------------------------
export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    src: "/images/femme-tient.png",   // Photo : femme en tenue africaine tenant bissap
    alt: "Femme tenant un Leader Bissap", // Texte lu par les lecteurs d'écran (accessibilité)
    caption: "Élégance naturelle",    // Légende affichée au survol de la photo
    category: "lifestyle",            // "lifestyle" = photos avec des personnes/ambiance
  },
  {
    id: "2",
    src: "/images/bottles3.png",      // Photo : les 3 bouteilles sur fond blanc (photo pro)
    alt: "Gamme complète Leader",
    caption: "La gamme complète",
    category: "produit",              // "produit" = photos centrées sur les bouteilles
  },
  {
    id: "3",
    src: "/images/femme-boit.png",    // Photo : femme en rouge buvant le bissap
    alt: "Femme buvant Leader Bissap",
    caption: "Plaisir authentique",
    category: "lifestyle",
  },
  {
    id: "4",
    src: "/images/amis1.png",         // Photo : deux amis tenant bouteilles orange et ananas
    alt: "Deux amis avec Leader",
    caption: "Entre amis",
    category: "lifestyle",
  },
  {
    id: "5",
    src: "/images/bissap-bottles.png", // Photo : plusieurs bouteilles bissap empilées
    alt: "Bouteilles Bissap Leader",
    caption: "Bissap Hibiscus",
    category: "produit",
  },
  {
    id: "6",
    src: "/images/amis2.png",          // Photo : deux amis avec la bouteille bissap
    alt: "Amis avec Bissap Leader",
    caption: "Convivialité",
    category: "lifestyle",
  },
  {
    id: "7",
    src: "/images/ananas-nature.png",  // Photo : bouteille ananas + verre sur bois en plein air
    alt: "Jus Ananas Leader en nature",
    caption: "Fraîcheur naturelle",
    category: "produit",
  },
  {
    id: "8",
    src: "/images/orange-yellow.png",  // Photo : main tenant la bouteille orange sur fond jaune vif
    alt: "Jus Orange Leader fond jaune",
    caption: "Couleurs d'Afrique",
    category: "produit",
  },
  {
    id: "9",
    src: "/images/label-nzinga.png",   // Photo : étiquette Nzinga dépliée (format panoramique)
    alt: "Étiquette Nzinga",
    caption: "Nzinga — Édition spéciale",
    category: "produit",
  },
];
