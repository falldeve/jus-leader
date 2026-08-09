// =============================================================================
// FICHIER : src/components/layout/Footer.tsx
// RÔLE    : Pied de page — affiché sur toutes les pages via layout.tsx
//
// COMPOSANT SERVER (pas de "use client") :
// → Le Footer ne nécessite aucune interactivité JavaScript côté client
// → Il est rendu côté serveur, envoyé en HTML statique → plus rapide
// → Règle d'or : rester Server Component par défaut, passer en Client uniquement
//   si on a besoin de hooks (useState, useEffect) ou d'événements (onClick, etc.)
// =============================================================================

// Image : composant Next.js optimisé (même logique que dans Navbar.tsx)
import Image from "next/image";

// Link : navigation interne Next.js (préchargement automatique)
import Link from "next/link";

export default function Footer() {
  return (
    /*
      <footer> : balise sémantique HTML5 pour le pied de page
      bg-crimson-dark : couleur définie dans tailwind.config.ts
        → #5a0000 = rouge plus foncé que la Navbar → hiérarchie visuelle
      py-8 : padding vertical 2rem (haut et bas)
      px-[5%] : padding horizontal 5% → cohérent avec le reste du site
    */
    <footer className="bg-crimson-dark py-8 px-[5%]">
      {/*
        Conteneur interne centré
        - max-w-6xl mx-auto : largeur max 72rem (1152px), centré horizontalement
        - flex flex-col md:flex-row : colonne sur mobile, ligne sur desktop
        - items-center : centrage vertical (desktop) / horizontal (mobile)
        - justify-between : espace maximum entre logo, texte et liens
        - gap-4 : espace de 1rem entre les 3 blocs
      */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* === LOGO === */}
        {/* Cliquable → retour à l'accueil */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Leader Jus Naturel"
            width={48}     // Plus petit que dans la Navbar (52px) → hiérarchie
            height={48}
            className="rounded-lg"
          />
        </Link>

        {/* === MENTION LÉGALE / COPYRIGHT === */}
        {/*
          text-white/40 : blanc à 40% d'opacité → discret, secondaire
          text-xs : 12px → petit, ne doit pas attirer l'attention
          text-center : centré sur mobile, ignoré quand flex-row sur desktop
        */}
        <p className="text-white/40 text-xs text-center">
          © 2025 Leader Jus Naturel · Issu de produits Bio & 100% Africains ·
          Tous droits réservés
        </p>

        {/* === LIENS RAPIDES === */}
        {/*
          gap-4 : espace de 1rem entre les liens
          text-xs : petite taille → discrèt
          text-white/50 : blanc à 50% → légèrement plus visible que le copyright
          hover:text-gold : au survol, couleur or → cohérence avec la brand
          transition-colors : animation douce de la couleur au survol
        */}
        <div className="flex gap-4 text-xs text-white/50">
          <Link href="/saveurs" className="hover:text-gold transition-colors">
            Saveurs
          </Link>
          <Link href="/galerie" className="hover:text-gold transition-colors">
            Galerie
          </Link>
          <Link href="/contact" className="hover:text-gold transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
