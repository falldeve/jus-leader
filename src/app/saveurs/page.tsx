// =============================================================================
// FICHIER : src/app/saveurs/page.tsx
// RÔLE    : Page Saveurs — Server Component responsable du SEO
//
// ARCHITECTURE DE CETTE PAGE (pattern Server → Client) :
//
//   page.tsx (SERVER)          →  importe  →  SaveursClient.tsx (CLIENT)
//   ↓ Gère :                                   ↓ Gère :
//   - export metadata (SEO)                    - useState (filtre actif)
//   - Rendu statique côté serveur              - onClick (clic sur les filtres)
//   - Performance (pas de JS au load)          - Interactivité utilisateur
//
// POURQUOI cette séparation ?
// Next.js ne permet PAS d'exporter "metadata" depuis un Client Component.
// Donc on garde page.tsx comme Server Component pour les métadonnées,
// et on délègue tout le rendu interactif à SaveursClient.
//
// C'est le PATTERN recommandé par Next.js pour les pages avec SEO + interactivité.
// =============================================================================

// Metadata : type Next.js pour les métadonnées SEO
import { Metadata } from "next";

// Import du composant client qui gère tout le rendu de la page
import SaveursClient from "./SaveursClient";
// "./" = dossier courant (src/app/saveurs/)

// -----------------------------------------------------------------------------
// MÉTADONNÉES SEO spécifiques à la page Saveurs
// Ces métadonnées SURCHARGENT celles définies dans layout.tsx
// → Next.js génère automatiquement les balises <title> et <meta> correspondantes
// -----------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Nos Saveurs — Leader Jus Naturel",
  // Description spécifique → mentionne les 4 produits pour le référencement
  description:
    "Découvrez nos 4 jus naturels : Ananas, Bissap, Orange et Nzinga. 100% africains, sans conservateurs.",
};

// -----------------------------------------------------------------------------
// COMPOSANT PAGE — simple wrapper qui délègue à SaveursClient
// Ce composant est un Server Component (pas de "use client")
// Son seul rôle : rendre SaveursClient dans le contexte de la page
// -----------------------------------------------------------------------------
export default function SaveursPage() {
  return <SaveursClient />;
}
