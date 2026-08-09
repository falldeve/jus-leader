// =============================================================================
// FICHIER : src/data/products.ts
// RÔLE    : Source unique de vérité pour les données des produits Leader
//
// PRINCIPE "Single Source of Truth" :
// Toutes les infos sur les produits sont définies ICI, une seule fois.
// Quand on veut les afficher (sur la page Saveurs, la page Contact, l'Accueil),
// on importe simplement ce tableau → pas de duplication, pas d'incohérence.
// Si on ajoute un nouveau jus, on l'ajoute ici et il apparaît partout.
// =============================================================================

// On importe le type Product défini dans src/types/index.ts
// "type" signifie qu'on importe uniquement la définition TypeScript,
// pas de code JavaScript → optimisation du bundle final
import type { Product } from "@/types";
// "@/types" est un alias configuré dans tsconfig.json qui pointe vers "src/types"
// Évite d'écrire "../../types" qui change selon l'emplacement du fichier

// -----------------------------------------------------------------------------
// Tableau de tous les produits — exporté pour être utilisé partout dans l'app
// "export const" = variable accessible depuis d'autres fichiers
// "Product[]" = tableau d'objets respectant l'interface Product
// -----------------------------------------------------------------------------
export const products: Product[] = [
  // --------------------------------------------------------------------------
  // PRODUIT 1 : Jus d'Ananas
  // --------------------------------------------------------------------------
  {
    id: "ananas",                    // Clé unique — utilisée pour les filtres
    name: "Jus d'Ananas",           // Nom complet affiché dans l'UI
    category: "ananas",             // Doit correspondre à l'union dans types/index.ts
    emoji: "🍍",                    // Affiché dans les cartes "mini" et les filtres
    description:
      // Description longue — affichée sur la page Saveurs (carte détaillée)
      "Un jus d'ananas frais et tropical, pressé à partir d'ananas africains mûrs à point. Riche en vitamines C et B, il apporte une fraîcheur incomparable et une énergie naturelle pour votre journée.",
    ingredients: [
      "100% Ananas",       // Premier tag affiché (utilisé aussi dans carte mini)
      "Vit. C & B",        // Vitamines mentionnées sur l'étiquette réelle
      "300ml",             // Volume officiel de la bouteille
      "Sans sucre ajouté", // Argument marketing mis en avant
    ],
    volume: "300ml",
    badge: "Jus de fruit",  // Label de catégorie affiché en haut de la carte
    image: "/images/ananas-nature.png", // Photo réelle fournie par le client
    // Classes Tailwind pour le dégradé — du jaune clair au jaune doré
    gradient: "from-[#F5C842] to-[#E8A800]",
    // Classes pour le badge coloré sur la carte détaillée
    badgeColor: "bg-yellow-100 text-yellow-800",
  },

  // --------------------------------------------------------------------------
  // PRODUIT 2 : Bissap Jus d'Hibiscus
  // --------------------------------------------------------------------------
  {
    id: "bissap",
    name: "Bissap Jus d'Hibiscus",
    category: "bissap",
    emoji: "🌺",
    description:
      "Le goût authentique de la fleur d'hibiscus africaine, trésor de notre continent. Ce jus profond et légèrement acidulé est une tradition revisitée, sans additifs ni conservateurs.",
    ingredients: [
      "Fleur d'hibiscus", // Ingrédient principal — fleur séchée d'Afrique de l'Ouest
      "Antioxydants",     // Propriété naturelle du bissap (richesse en polyphénols)
      "300ml",
      "Traditionnel",     // Clin d'œil à la boisson traditionnelle ouest-africaine
    ],
    volume: "300ml",
    badge: "Fleur africaine",
    image: "/images/bissap-bottles.png", // Photo des bouteilles de bissap groupées
    // Dégradé bordeaux profond — couleur signature du bissap
    gradient: "from-[#8B1A2E] to-[#5a0f1d]",
    badgeColor: "bg-red-100 text-red-900",
  },

  // --------------------------------------------------------------------------
  // PRODUIT 3 : Jus d'Orange
  // --------------------------------------------------------------------------
  {
    id: "orange",
    name: "Jus d'Orange",
    category: "orange",
    emoji: "🍊",
    description:
      "Un classique revisité avec des oranges africaines gorgées de soleil. Vif, sucré et naturellement riche en vitamine C, ce jus ensoleillé est parfait pour commencer la journée du bon pied.",
    ingredients: [
      "100% Orange",
      "Vit. C",              // La vitamine C est l'argument clé de l'orange
      "300ml",
      "Naturellement sucré", // Pas de sucre ajouté → le sucre vient du fruit
    ],
    volume: "300ml",
    badge: "Jus de fruit",
    image: "/images/orange-yellow.png", // Photo main tenant bouteille fond jaune
    // Dégradé orange vif — reprend la couleur du bouchon orange de la vraie bouteille
    gradient: "from-[#F07B1D] to-[#c55a00]",
    badgeColor: "bg-orange-100 text-orange-800",
  },

  // --------------------------------------------------------------------------
  // PRODUIT 4 : Nzinga (mélange signature)
  // --------------------------------------------------------------------------
  {
    id: "nzinga",
    name: "Nzinga",           // Nom propre — pas de "Jus de" car c'est une création
    category: "nzinga",
    emoji: "🍉",
    description:
      // On explique l'origine du nom (reine africaine) pour valoriser l'identité culturelle
      "Notre création signature : un mélange audacieux de 60% d'ananas et 40% de pastèque. Nzinga, du nom d'une reine africaine légendaire, est un jus courageux, frais et unique en son genre.",
    ingredients: [
      "60% Ananas",    // Ratio exact indiqué sur l'étiquette officielle du produit
      "40% Pastèque",  // Ratio exact — pastèque = watermelon sur l'étiquette bilingue
      "300ml",
      "Édition spéciale", // Mis en avant pour créer de la rareté/désirabilité
    ],
    volume: "300ml",
    badge: "Édition Spéciale",
    image: "/images/label-nzinga.png", // Photo de l'étiquette dépliée (design panoramique)
    // Dégradé corail/pêche — mélange visuel ananas (jaune) + pastèque (rouge)
    gradient: "from-[#E8714A] to-[#c04a25]",
    badgeColor: "bg-orange-100 text-orange-900",
  },
];
