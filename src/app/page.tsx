// =============================================================================
// FICHIER : src/app/page.tsx
// RÔLE    : Page d'Accueil (route "/")
//
// Dans Next.js App Router, chaque "page.tsx" définit une route :
//   src/app/page.tsx           → "/"          (Accueil)
//   src/app/saveurs/page.tsx   → "/saveurs"
//   src/app/galerie/page.tsx   → "/galerie"
//   etc.
//
// SERVER COMPONENT : pas de "use client"
// → La page d'accueil est entièrement statique (pas d'état, pas d'événements)
// → Rendu côté serveur → excellent SEO, chargement rapide
// → Les métadonnées globales de layout.tsx s'appliquent ici (pas de metadata export)
// =============================================================================

import Image from "next/image";
import Link from "next/link";

// Composants réutilisables définis dans src/components/
import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";

// Données centralisées — on importe le tableau, pas les données en dur
import { products } from "@/data/products";

export default function HomePage() {
  return (
    // Fragment React → pas de div wrapper inutile dans le DOM
    <>
      {/* ================================================================
          SECTION 1 : HERO
          Première impression — doit captiver immédiatement
          Layout 2 colonnes : texte à gauche, image à droite
          ================================================================ */}
      <section className="min-h-[calc(100vh-72px)] grid md:grid-cols-2 items-center bg-cream overflow-hidden">
        {/*
          min-h-[calc(100vh-72px)] :
          → 100vh = hauteur totale de la fenêtre
          → -72px = hauteur de la Navbar (on l'enlève car la page commence sous la Navbar)
          → Résultat : le hero remplit exactement l'écran visible
          
          grid md:grid-cols-2 :
          → Mobile : 1 colonne (texte au-dessus, image en dessous)
          → Desktop (≥768px) : 2 colonnes côte à côte
          
          items-center : centrage vertical des colonnes
          overflow-hidden : empêche le blob décoratif de créer un scroll horizontal
        */}

        {/* === COLONNE GAUCHE : TEXTE === */}
        <div className="px-[8%] py-16 md:py-0">
          {/* px-[8%] : plus de marge à gauche que le reste du site (5%) → impression de profondeur */}
          
          {/* Badge "eyebrow" au-dessus du titre principal */}
          <span className="inline-flex items-center gap-2 bg-crimson/10 text-crimson px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6">
            🌿 100% Naturel & Africain
          </span>

          {/*
            h1 : SEUL titre h1 de la page (règle SEO fondamentale)
            Taille dynamique : clamp via les classes Tailwind
            text-5xl → 48px, md:text-6xl → 60px sur desktop
            font-black → épaisseur 900 (maximum) pour l'impact visuel
          */}
          <h1 className="font-playfair text-5xl md:text-6xl font-black leading-[1.05] text-crimson mb-5">
            Le goût vrai<br />
            de{" "}
            {/* {" "} : espace insécable entre "de" et le span — évite un retour à la ligne indésirable */}
            <span className="text-orange-juice">l&apos;Afrique</span>
            {/* l&apos; : entité HTML pour l'apostrophe → évite l'erreur ESLint "unescaped entity" */}
          </h1>

          {/* Sous-titre descriptif */}
          <p className="text-gray-500 text-lg leading-relaxed max-w-md mb-8">
            Jus pressés à partir de fruits africains authentiques. Sans
            conservateurs, riches en vitamines C & B. Chaque gorgée raconte
            notre terre.
          </p>

          {/* Boutons d'action */}
          <div className="flex gap-4 flex-wrap mb-10">
            {/* btn-primary : classe de globals.css → bouton rouge plein */}
            <Link href="/saveurs" className="btn-primary">
              Découvrir nos saveurs
            </Link>
            {/* btn-outline : classe de globals.css → bouton transparent avec bordure */}
            <Link href="/contact" className="btn-outline">
              Commander
            </Link>
          </div>

          {/* Statistiques clés — chiffres impactants en bas du texte hero */}
          <div className="flex gap-8 flex-wrap">
            {/*
              .map() sur un tableau anonyme défini en ligne
              → Crée 3 blocs "stat" avec le même layout
              → Évite de répéter le même JSX 3 fois
            */}
            {[
              { num: "4", label: "Saveurs uniques" },
              { num: "100%", label: "Naturel" },
              { num: "300ml", label: "Par bouteille" },
            ].map((stat) => (
              <div key={stat.label}>
                {/* Chiffre en Playfair Display → typographie signature de la marque */}
                <div className="font-playfair text-3xl font-bold text-crimson">
                  {stat.num}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* === COLONNE DROITE : IMAGE === */}
        {/*
          hidden md:flex : masquée sur mobile (l'image prendrait trop de place)
          items-center justify-center : image centrée dans la colonne
          h-[calc(100vh-72px)] : même hauteur que la section hero
          overflow-hidden : empêche le blob de déborder
        */}
        <div className="relative hidden md:flex items-center justify-center h-[calc(100vh-72px)] overflow-hidden">
          {/* Blob décoratif : cercle transparent doré derrière l'image */}
          <div className="absolute w-[560px] h-[560px] rounded-full bg-gold/10" />
          
          {/*
            Image principale du hero : les 3 bouteilles
            priority : charge immédiatement (image visible sans scroll = LCP critique)
            z-10 : au-dessus du blob (z-index relative)
          */}
          <Image
            src="/images/bottles3.png"
            alt="Gamme Leader Jus Naturel"
            width={500}
            height={580}
            className="relative z-10 rounded-3xl shadow-2xl object-cover"
            priority
          />
        </div>
      </section>

      {/* ================================================================
          SECTION 2 : APERÇU DES SAVEURS
          Fond rouge → rupture visuelle forte après la section cream
          4 petites cartes "mini" cliquables → pousse vers la page Saveurs
          ================================================================ */}
      <section className="bg-crimson py-24 px-[5%]">
        {/*
          SectionHeader avec light=true (textes clairs sur fond rouge)
          → "Quatre saveurs, une seule promesse"
        */}
        <SectionHeader
          eyebrow="Nos Produits"
          title="Quatre saveurs, une seule promesse"
          light
          // "light" sans valeur = shorthand pour light={true} en JSX
        />
        
        {/*
          Grille 2x2 sur mobile, 4 colonnes sur desktop
          max-w-5xl mx-auto : grille centrée
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/*
            products.map() : les 4 produits du fichier src/data/products.ts
            Chaque carte est enveloppée dans un Link → clic → page Saveurs
          */}
          {products.map((p) => (
            <Link key={p.id} href="/saveurs">
              {/* variant="mini" → carte compacte sans description longue */}
              <ProductCard product={p} variant="mini" />
            </Link>
          ))}
        </div>

        {/* CTA en dessous de la grille → invite à explorer la page Saveurs */}
        <div className="text-center mt-10">
          <Link
            href="/saveurs"
            className="bg-gold text-crimson px-8 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-transform inline-block"
          >
            Voir tous nos produits →
          </Link>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 : APERÇU DE LA GALERIE
          3 photos lifestyle avec overlay → clique vers la page Galerie
          ================================================================ */}
      <section className="py-24 px-[5%] bg-cream">
        <SectionHeader
          eyebrow="Notre Univers"
          // <br/> dans le titre → géré par dangerouslySetInnerHTML dans SectionHeader
          title="Pour tous les moments,<br/>pour tous les goûts"
          subtitle="De la fraîcheur en plein air aux instants de convivialité, Leader accompagne chaque moment de votre journée."
        />
        
        {/* Grille 3 photos (1 colonne mobile, 3 colonnes desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            { src: "/images/amis1.png", caption: "Énergie & convivialité" },
            { src: "/images/femme-boit.png", caption: "Plaisir pur & naturel" },
            { src: "/images/ananas-nature.png", caption: "Fraîcheur de la nature" },
          ].map((item) => (
            /*
              Link cliquable → amène vers la page Galerie
              group : active group-hover sur les descendants
            */
            <Link
              key={item.src}
              href="/galerie"
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] block"
              // aspect-[3/4] : ratio largeur/hauteur 3:4 → format "portrait"
              // block : nécessaire car Link est inline par défaut
            >
              {/*
                Image avec fill → remplit le conteneur (position: relative sur le parent)
                group-hover:scale-105 → zoom subtil au survol du Link parent
              */}
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay gradient → légende lisible sur l'image */}
              <div className="absolute inset-0 bg-gradient-to-t from-crimson/65 to-transparent flex items-end p-5">
                <span className="text-white font-semibold">{item.caption}</span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/galerie" className="btn-outline">
            Voir toute la galerie →
          </Link>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 : VALEURS (Pourquoi Leader ?)
          3 cartes avec icône, titre, description
          Fond blanc → contraste avec le cream de la section précédente
          ================================================================ */}
      <section className="py-24 px-[5%] bg-white">
        <SectionHeader
          eyebrow="Notre Engagement"
          title="Pourquoi choisir Leader ?"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: "🌿",
              title: "100% Africain",
              text: "Fruits cultivés sur le sol africain, sélectionnés pour leur authenticité et leur richesse naturelle.",
            },
            {
              icon: "🚫",
              title: "Sans Conservateurs",
              text: "Pressés et mis en bouteille naturellement. Aucun additif, aucun colorant artificiel. Juste le fruit.",
            },
            {
              icon: "💪",
              title: "Riche en Vitamines",
              text: "Vitamines C & B pour votre énergie quotidienne. Boire Leader, c'est prendre soin de soi.",
            },
          ].map((v) => (
            /*
              Carte sur fond cream → légère différenciation avec le fond blanc de la section
              rounded-2xl : coins arrondis harmonieux
              p-8 : padding généreux pour les cartes
            */
            <div key={v.title} className="text-center p-8 bg-cream rounded-2xl">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-playfair text-lg font-bold text-crimson mb-2">
                {v.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
