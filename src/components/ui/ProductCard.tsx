// =============================================================================
// FICHIER : src/components/ui/ProductCard.tsx
// RÔLE    : Carte produit réutilisable avec deux variantes d'affichage
//
// Ce composant est utilisé à 3 endroits différents :
//   1. Page Accueil → variante "mini" (4 petites cartes dans la grille aperçu)
//   2. Page Saveurs → variante "grid" (cartes détaillées avec description complète)
//   3. Page Contact → variante "mini" (sélecteur de saveur pour commander)
//
// PATTERN "variante" :
// Une prop "variant" contrôle quel rendu est utilisé → un seul composant,
// plusieurs apparences → évite de créer ProductCardMini et ProductCardGrid séparément
//
// COMPOSANT SERVER : pas d'interactivité → rendu côté serveur
// =============================================================================

// Image Next.js pour les photos de produits
import Image from "next/image";

// Import du type Product depuis notre fichier de types centralisé
import type { Product } from "@/types";

// -----------------------------------------------------------------------------
// Interface des props du composant
// -----------------------------------------------------------------------------
interface ProductCardProps {
  product: Product;   // L'objet produit complet (défini dans src/types/index.ts)
  
  // variant : détermine quel layout afficher
  // "grid"  = carte détaillée avec image, description, ingrédients (page Saveurs)
  // "mini"  = carte compacte avec juste emoji + nom (Accueil, Contact)
  // "grid" est la valeur par défaut → si on ne précise pas, la carte complète s'affiche
  variant?: "grid" | "mini";
}

// -----------------------------------------------------------------------------
// COMPOSANT ProductCard
// -----------------------------------------------------------------------------
export default function ProductCard({
  product,
  variant = "grid", // Valeur par défaut : carte détaillée
}: ProductCardProps) {

  // ===========================================================================
  // VARIANTE "mini" : carte compacte
  // Utilisée sur la page d'Accueil et Contact
  // Affiche : dégradé de couleur + emoji + nom + premier ingrédient
  // ===========================================================================
  if (variant === "mini") {
    return (
      /*
        bg-gradient-to-br : dégradé de gauche-haut vers droite-bas
        ${product.gradient} : classes Tailwind dynamiques depuis les données
          ex: "from-[#F5C842] to-[#E8A800]" pour l'ananas
        rounded-2xl : coins très arrondis (16px)
        p-6 : padding 1.5rem dans tous les sens
        text-center : tout centré
        cursor-pointer : change le curseur → indique que c'est cliquable
        card-hover : classe custom de globals.css → effet de levée au survol
      */
      <div
        className={`bg-gradient-to-br ${product.gradient} rounded-2xl p-6 text-center cursor-pointer card-hover`}
      >
        {/* Emoji grand format — représentation visuelle rapide du fruit */}
        <span className="text-4xl block mb-3">{product.emoji}</span>
        
        {/* Nom du produit en Playfair Display */}
        <p className="font-playfair font-bold text-white text-lg">
          {product.name}
        </p>
        
        {/* Premier ingrédient → information rapide */}
        {/* product.ingredients[0] : accès au premier élément du tableau */}
        <p className="text-white/75 text-xs mt-1">{product.ingredients[0]}</p>
      </div>
    );
  }

  // ===========================================================================
  // VARIANTE "grid" : carte détaillée (valeur par défaut)
  // Utilisée sur la page Saveurs
  // Affiche : photo, badge, nom, description, tags ingrédients
  // ===========================================================================
  return (
    /*
      bg-white : fond blanc → contraste avec le fond crème de la page
      rounded-3xl : coins très arrondis (24px) → style "soft"
      overflow-hidden : empêche les enfants de dépasser les coins arrondis
        → Important pour que l'image garde les coins arrondis du parent
      shadow-md : ombre légère par défaut
      hover:shadow-xl : ombre plus prononcée au survol → feedback interactif
      transition-shadow : animation douce de l'ombre (pas toute la carte)
      flex flex-col : les enfants s'empilent verticalement
        → Permet à flex-1 sur le body de pousser les ingrédients en bas
    */
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      
      {/* === ZONE IMAGE === */}
      {/*
        relative : position relative OBLIGATOIRE pour que Image fill={true} fonctionne
        h-56 : hauteur fixe 224px → toutes les images ont la même hauteur
        bg-gradient-to-br ${product.gradient} : dégradé de secours si l'image ne charge pas
        flex items-center justify-content-center : centre le contenu si l'image fail
      */}
      <div
        className={`relative h-56 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}
      >
        {/*
          fill : l'image remplit tout le conteneur parent (position: absolute)
          → Requiert que le parent soit "position: relative" (voir ci-dessus)
          className="object-cover" : rogne l'image pour couvrir tout l'espace
            sans déformer les proportions (comme background-size: cover)
        */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* === CORPS DE LA CARTE === */}
      {/*
        p-6 : padding 1.5rem
        flex flex-col flex-1 : prend tout l'espace vertical restant
          → Avec flex-col sur le parent, flex-1 pousse les ingrédients en bas
          → Toutes les cartes ont la même hauteur même si les descriptions sont différentes
      */}
      <div className="p-6 flex flex-col flex-1">
        
        {/* --- BADGE DE CATÉGORIE --- */}
        {/*
          ${product.badgeColor} : classes Tailwind dynamiques depuis les données
            ex: "bg-yellow-100 text-yellow-800" pour l'ananas
          w-fit : largeur adaptée au contenu (pas toute la ligne)
          inline-block : accepte padding mais ne prend pas toute la largeur
        */}
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit ${product.badgeColor}`}
        >
          {product.badge}
        </span>

        {/* --- NOM DU PRODUIT --- */}
        <h3 className="font-playfair text-2xl font-bold text-crimson mb-2">
          {product.name}
        </h3>

        {/* --- DESCRIPTION --- */}
        {/*
          flex-1 : prend tout l'espace disponible entre le nom et les ingrédients
          → Les ingrédients restent toujours en bas de la carte
        */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        {/* --- TAGS INGRÉDIENTS --- */}
        {/*
          flex flex-wrap : les tags se mettent en ligne et passent à la ligne si nécessaire
          gap-2 : espace de 8px entre chaque tag
          mt-auto : pousse ce bloc tout en bas de la carte
        */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {/*
            .map() sur product.ingredients : crée un tag pour chaque ingrédient
            key={ing} : identifiant unique pour React (l'ingrédient lui-même est unique)
          */}
          {product.ingredients.map((ing) => (
            <span
              key={ing}
              className="bg-cream text-crimson text-xs font-medium px-3 py-1 rounded-full border border-crimson/20"
              // border-crimson/20 : bordure rouge à 20% d'opacité → très subtil
            >
              {ing}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
