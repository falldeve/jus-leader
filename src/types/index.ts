// =============================================================================
// FICHIER : src/types/index.ts
// RÔLE    : Définition des types TypeScript partagés dans tout le projet
//
// TypeScript permet de définir la "forme" des données qu'on utilise.
// Au lieu d'avoir des objets dont on ne sait pas quels champs ils contiennent,
// on déclare des "interfaces" qui décrivent exactement leur structure.
// Si on essaie d'utiliser un champ qui n'existe pas, TypeScript signale l'erreur
// avant même qu'on lance le projet → moins de bugs en production.
// =============================================================================

// -----------------------------------------------------------------------------
// Interface Product : décrit la structure d'un produit (jus)
// Chaque propriété a un nom et un type précis.
// -----------------------------------------------------------------------------
export interface Product {
  id: string;           // Identifiant unique du produit ex: "ananas", "bissap"
  name: string;         // Nom affiché ex: "Jus d'Ananas"
  
  // "category" est un type union : la valeur ne peut être QUE l'une de ces 4 options
  // Si on écrit category: "mangue", TypeScript refusera de compiler → sécurité !
  category: "ananas" | "bissap" | "orange" | "nzinga";
  
  emoji: string;        // Emoji représentant le fruit ex: "🍍"
  description: string;  // Texte long affiché sur la carte produit
  ingredients: string[]; // Tableau de chaînes ex: ["100% Ananas", "Vit. C", "300ml"]
  volume: string;       // Contenance ex: "300ml"
  badge: string;        // Petit label affiché sur la carte ex: "Édition Spéciale"
  image: string;        // Chemin vers l'image ex: "/images/ananas-nature.png"
  
  // Classes Tailwind CSS pour le dégradé de couleur de fond de chaque carte
  // ex: "from-[#F5C842] to-[#E8A800]" pour l'ananas
  gradient: string;
  
  // Classes Tailwind pour la couleur du badge ex: "bg-yellow-100 text-yellow-800"
  badgeColor: string;
}

// -----------------------------------------------------------------------------
// Interface GalleryItem : décrit un élément de la galerie photo
// -----------------------------------------------------------------------------
export interface GalleryItem {
  id: string;           // Identifiant unique ex: "1", "2"
  src: string;          // Chemin de l'image ex: "/images/femme-tient.png"
  alt: string;          // Texte alternatif pour l'accessibilité (lecteurs d'écran)
  caption: string;      // Légende affichée au survol ex: "Élégance naturelle"
  
  // Type union : soit "produit" soit "lifestyle" → utilisé pour filtrer la galerie
  category: "produit" | "lifestyle";
}

// -----------------------------------------------------------------------------
// Interface NavItem : décrit un lien de navigation
// (actuellement utilisé comme référence — la Navbar utilise son propre tableau)
// -----------------------------------------------------------------------------
export interface NavItem {
  label: string;  // Texte affiché dans le menu ex: "Nos Saveurs"
  href: string;   // URL de destination ex: "/saveurs"
}
