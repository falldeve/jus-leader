// =============================================================================
// FICHIER : src/components/layout/Navbar.tsx
// RÔLE    : Barre de navigation principale — fixée en haut de toutes les pages
//
// "use client" — DIRECTIVE OBLIGATOIRE car ce composant utilise :
//   1. usePathname() : hook Next.js pour lire l'URL active (côté client uniquement)
//   2. useState()    : hook React pour gérer l'état du menu mobile (ouvert/fermé)
//
// COMPOSANT CLIENT vs SERVEUR :
// - Server Component (défaut) : rendu côté serveur, pas d'interactivité JS
// - Client Component ("use client") : rendu côté client, accès aux hooks React,
//   aux événements DOM, à window, etc.
// Règle : utiliser "use client" SEULEMENT quand nécessaire → meilleure performance
// =============================================================================
"use client";

// Image : composant Next.js optimisé pour les images
// → Optimisation automatique (WebP/AVIF), lazy loading, taille responsive
// → TOUJOURS utiliser ce composant plutôt que <img> dans Next.js
import Image from "next/image";

// Link : composant Next.js pour la navigation interne
// → Préchargement automatique des pages au survol (prefetching)
// → Navigation côté client sans rechargement complet de la page (SPA)
// → TOUJOURS utiliser Link plutôt que <a> pour les liens internes
import Link from "next/link";

// usePathname : hook Next.js qui retourne l'URL actuelle ex: "/saveurs"
// → Permet de mettre en évidence le lien actif dans la navigation
import { usePathname } from "next/navigation";

// useState : hook React pour gérer un état local dans le composant
// → Ici utilisé pour savoir si le menu mobile est ouvert ou fermé
import { useState } from "react";

// -----------------------------------------------------------------------------
// Données de navigation — défini EN DEHORS du composant
// → Évite de recréer ce tableau à chaque rendu du composant
// → "as const" rendrait les valeurs immuables (non utilisé ici pour simplicité)
// -----------------------------------------------------------------------------
const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Nos Saveurs", href: "/saveurs" },
  { label: "Galerie", href: "/galerie" },
  { label: "Notre Histoire", href: "/histoire" },
  { label: "Contact", href: "/contact" },
];

// -----------------------------------------------------------------------------
// COMPOSANT Navbar
// Pas de props nécessaires → la Navbar se configure elle-même via usePathname
// -----------------------------------------------------------------------------
export default function Navbar() {
  // usePathname() retourne l'URL courante ex: "/saveurs"
  // → Utilisé pour comparer avec href de chaque lien et appliquer le style "actif"
  const pathname = usePathname();

  // État local : menu mobile ouvert (true) ou fermé (false)
  // useState<boolean>(false) → valeur initiale : fermé
  // setMenuOpen : fonction pour mettre à jour l'état → déclenche un re-render
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    /*
      <nav> : balise sémantique HTML5 pour la navigation
      
      Classes Tailwind :
      - fixed top-0 left-0 right-0 : fixée en haut, couvre toute la largeur
      - z-50 : z-index 50 → toujours au-dessus du contenu des pages
      - bg-crimson : fond rouge #8B0000 (couleur brand Leader)
      - shadow-lg : ombre portée vers le bas → effet de profondeur
    */
    <nav className="fixed top-0 left-0 right-0 z-50 bg-crimson shadow-lg">
      {/* 
        Conteneur principal de la Navbar
        - flex items-center justify-between : logo à gauche, liens au centre, CTA à droite
        - px-[5%] : padding horizontal de 5% → marges cohérentes avec le reste du site
        - h-[72px] : hauteur fixe → correspond au pt-[72px] dans layout.tsx
      */}
      <div className="flex items-center justify-between px-[5%] h-[72px]">
        
        {/* === LOGO === */}
        {/* Link vers "/" → cliquer sur le logo revient à l'accueil */}
        <Link href="/" className="flex-shrink-0">
          {/*
            Image Next.js :
            - src : chemin dans le dossier /public (accessible publiquement)
            - alt : texte alternatif pour accessibilité / SEO
            - width/height : dimensions en pixels (obligatoires avec Image Next.js)
            - className rounded-lg : coins légèrement arrondis
            - object-contain : garde les proportions sans rogner l'image
            - priority : charge cette image en PRIORITÉ (above the fold = visible sans scroll)
          */}
          <Image
            src="/images/logo.png"
            alt="Leader Jus Naturel"
            width={52}
            height={52}
            className="rounded-lg object-contain"
            priority
          />
        </Link>

        {/* === LIENS DE NAVIGATION (version desktop) === */}
        {/*
          hidden md:flex : masqué sur mobile, visible à partir de "md" (768px)
          → Responsive Design : sur mobile on utilise le burger menu à la place
          list-none : supprime les puces de la liste
        */}
        <ul className="hidden md:flex items-center gap-1 list-none">
          {/*
            .map() : on itère sur le tableau navLinks pour créer les liens dynamiquement
            → Évite de dupliquer le même code JSX 5 fois
            key={link.href} : propriété obligatoire dans les listes React
              → Aide React à identifier quel élément a changé lors d'un re-render
          */}
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    // LIEN ACTIF : si l'URL actuelle correspond à ce lien
                    pathname === link.href
                      // Style actif : fond semi-transparent blanc → en évidence
                      ? "bg-white/20 text-white"
                      // Style inactif : blanc à 90% d'opacité + effet au survol
                      : "text-white/90 hover:bg-white/15 hover:text-white"
                  }
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* === BOUTON CTA "Commander" (desktop) === */}
        {/*
          hidden md:block : invisible sur mobile (le menu mobile a son propre CTA)
          bg-gold : fond jaune doré — contraste fort sur le fond rouge
          text-crimson : texte rouge — cohérence avec la couleur brand
          hover:scale-105 : légère mise à l'échelle au survol (105%)
        */}
        <Link
          href="/contact"
          className="hidden md:block bg-gold text-crimson px-5 py-2.5 rounded-full font-bold text-sm transition-transform duration-200 hover:scale-105"
        >
          Commander
        </Link>

        {/* === BOUTON BURGER (mobile uniquement) === */}
        {/*
          md:hidden : visible seulement sur mobile (disparaît à partir de 768px)
          onClick={() => setMenuOpen(!menuOpen) : toggle l'état — ouvre si fermé, ferme si ouvert
          aria-label : indispensable pour l'accessibilité (les lecteurs d'écran l'annoncent)
          
          {menuOpen ? "✕" : "☰"} : affiche ✕ si ouvert, ☰ (hamburger) si fermé
          → Feedback visuel immédiat de l'état du menu
        */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* === MENU MOBILE (déroulant) === */}
      {/*
        Rendu CONDITIONNEL : {menuOpen && <div>...} 
        → Si menuOpen est false, ce bloc n'est pas rendu dans le DOM
        → Quand setMenuOpen(true) est appelé, React re-render et affiche ce bloc
        
        md:hidden : sur desktop ce bloc est masqué (on utilise la nav horizontale)
        bg-crimson-dark : fond légèrement plus foncé que la navbar → distinction visuelle
      */}
      {menuOpen && (
        <div className="md:hidden bg-crimson-dark px-6 pb-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // onClick={() => setMenuOpen(false) : ferme le menu quand on clique un lien
              // → UX : l'utilisateur voit la page s'afficher, le menu se referme proprement
              onClick={() => setMenuOpen(false)}
              className={`
                py-2.5 text-sm font-medium border-b border-white/10
                ${pathname === link.href ? "text-gold" : "text-white/90"}
              `}
            >
              {link.label}
            </Link>
          ))}
          {/* CTA Commander dans le menu mobile */}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-gold text-crimson px-5 py-2.5 rounded-full font-bold text-sm text-center"
          >
            Commander
          </Link>
        </div>
      )}
    </nav>
  );
}
