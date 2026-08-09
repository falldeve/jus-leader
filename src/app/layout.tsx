// =============================================================================
// FICHIER : src/app/layout.tsx
// RÔLE    : Layout racine — "coquille" partagée par TOUTES les pages
//
// CONCEPT CLÉ — App Router Next.js :
// Dans Next.js 13+, chaque dossier dans "app/" peut avoir un layout.tsx.
// Le layout racine (celui-ci) est OBLIGATOIRE et s'applique à toutes les pages.
// Il enveloppe chaque page comme une poupée russe :
//   layout.tsx → page.tsx (Accueil, Saveurs, Galerie, Histoire, Contact)
//
// Ce layout contient les éléments présents sur CHAQUE page :
//   → La Navbar (menu en haut)
//   → Le footer (bas de page)
//   → Les métadonnées SEO globales
//   → L'import du CSS global
// =============================================================================

// "Metadata" est un type Next.js pour typer les métadonnées SEO
import type { Metadata } from "next";

// Import du CSS global — fait UNE SEULE FOIS ici pour toute l'application
// C'est ce qui charge Tailwind CSS, les Google Fonts et nos classes custom
import "@/styles/globals.css";

// Import des composants de layout réutilisables
// Ces composants s'affichent sur TOUTES les pages automatiquement
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// -----------------------------------------------------------------------------
// MÉTADONNÉES SEO — exportées pour que Next.js les injecte dans le <head>
//
// Next.js gère automatiquement les balises <title>, <meta name="description">
// et <meta name="keywords"> grâce à cet objet "metadata".
// Chaque page peut avoir ses propres métadonnées (voir les pages individuelles)
// qui SURCHARGENT celles définies ici pour ce qui est spécifique.
// -----------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Leader Jus Naturel — Le goût vrai de l'Afrique",
  description:
    "Jus 100% naturels issus de fruits africains. Sans conservateurs, riches en vitamines C & B.",
  keywords: ["jus naturel", "africain", "bissap", "ananas", "orange", "Togo"],
};

// -----------------------------------------------------------------------------
// COMPOSANT RootLayout — Composant Server par défaut (pas de "use client")
//
// "children" est le contenu de la page active (page.tsx du dossier correspondant)
// TypeScript : on type explicitement children comme React.ReactNode
//   → ReactNode = n'importe quel contenu React valide (JSX, texte, null, etc.)
// "Readonly<>" = TypeScript empêche la modification accidentelle des props
// -----------------------------------------------------------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // La balise <html> DOIT être présente dans le layout racine
    // lang="fr" → indique la langue au navigateur et aux lecteurs d'écran (SEO + accessibilité)
    <html lang="fr">
      {/*
        <body> reçoit les classes Tailwind du globals.css automatiquement
        via la règle "body { @apply font-dm bg-cream text-gray-900 overflow-x-hidden }"
      */}
      <body>
        {/* 
          Navbar : barre de navigation fixe en haut de page
          Elle est rendue AVANT les children → toujours visible
          La Navbar est un Client Component ("use client") car elle utilise
          usePathname() pour détecter la page active
        */}
        <Navbar />

        {/*
          <main> : balise sémantique HTML5 qui englobe le contenu principal
          
          pt-[72px] : padding-top de 72px
          → Compense la hauteur de la Navbar qui est en "position: fixed"
            Une Navbar fixed sort du flux normal du document, donc sans ce padding
            le contenu de la page serait caché derrière la Navbar.
          
          {children} : ici Next.js injecte le contenu de la page active
          → Quand on va sur "/saveurs", children = <SaveursPage />
          → Quand on va sur "/", children = <HomePage />
        */}
        <main className="pt-[72px]">{children}</main>

        {/*
          Footer : pied de page — rendu APRÈS les children
          Composant Server simple (pas besoin d'interactivité)
        */}
        <Footer />
      </body>
    </html>
  );
}
