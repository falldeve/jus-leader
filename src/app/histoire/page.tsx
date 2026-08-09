// =============================================================================
// FICHIER : src/app/histoire/page.tsx
// RÔLE    : Page "Notre Histoire" — Server Component pur (pas d'interactivité)
//
// Contrairement aux pages Saveurs et Galerie, cette page n'a PAS besoin
// d'un composant client séparé car il n'y a aucune interactivité.
// → Tout est statique : textes, images, structure
// → Server Component = rendu côté serveur, HTML envoyé directement au navigateur
//   → Meilleur SEO, chargement plus rapide, pas de JS superflu
// =============================================================================

import { Metadata } from "next";
import Image from "next/image";

// Métadonnées SEO spécifiques à cette page
export const metadata: Metadata = {
  title: "Notre Histoire — Leader Jus Naturel",
  description:
    "Découvrez l'histoire de Leader Jus Naturel, nos valeurs et notre engagement pour des jus 100% africains.",
};

// -----------------------------------------------------------------------------
// Données des sections narratives
// Définies EN DEHORS du composant → créées une seule fois, pas à chaque render
//
// POURQUOI mettre les données ici plutôt que dans src/data/ ?
// → Ces données ne sont utilisées que sur cette page → pas besoin de les partager
// → Les mettre dans src/data/ serait prématuré (YAGNI : You Ain't Gonna Need It)
// → Si un jour on les réutilise ailleurs, on pourra les déplacer facilement
// -----------------------------------------------------------------------------
const sections = [
  {
    title: "Nés de la terre africaine",
    text: [
      // Texte 1 — issu directement de l'étiquette officielle de la bouteille
      "Nous sommes spécialisés dans la production de jus à base de produits cultivés en Afrique, offrant des saveurs authentiques à un coût abordable. Notre mission est de rendre les délices africains accessibles à tous.",
      // Texte 2 — continuation du message de la marque
      "Partant de là, notre engagement envers la simplicité, la beauté et la naturalité se reflète dans chaque gorgée que vous prenez.",
    ],
    // quote : citation mise en évidence avec un style spécial (blockquote)
    quote: "Chaque gorgée raconte l'Afrique.",
    image: "/images/femme-tient.png",   // Photo lifestyle : élégance féminine
    imageAlt: "Leader Bissap",
  },
  {
    title: "Des produits qui nous ressemblent",
    text: [
      "De l'ananas doré au bissap profond, de l'orange solaire à la création Nzinga — chaque bouteille Leader est le fruit d'une sélection rigoureuse des meilleurs fruits du continent africain.",
      "Issu de produits Bio & 100% Africains, riches en vitamines C & B, nos jus sont pressés et mis en bouteille naturellement, sans additifs ni conservateurs.",
    ],
    // Pas de quote pour cette section (undefined → le bloc ne s'affiche pas)
    image: "/images/ananas-nature.png", // Photo produit : jus nature
    imageAlt: "Jus Ananas Leader",
  },
  {
    title: "Leader, c'est un état d'esprit",
    text: [
      "Nos ambassadeurs le disent mieux que quiconque : Leader, c'est la fierté de choisir africain. C'est la confiance dans ce que la nature offre, sans artifice, sans compromis.",
      "Nous sommes LEADER — et chaque bouteille que vous tenez est la preuve que l'Afrique a tout ce qu'il faut.",
    ],
    image: "/images/amis1.png",         // Photo lifestyle : deux amis ambassadeurs
    imageAlt: "Ambassadeurs Leader",
  },
];

// Valeurs affichées dans la section rouge en bas de page
const values = [
  {
    icon: "🌿",
    title: "100% Africain",
    text: "Fruits cultivés et sélectionnés sur le sol africain.",
  },
  {
    icon: "🚫",
    title: "Sans Conservateurs",
    text: "Pressés naturellement. Aucun additif, aucun colorant.",
  },
  {
    icon: "💪",
    title: "Riche en Vitamines",
    text: "Vitamines C & B pour votre énergie quotidienne.",
  },
];

// -----------------------------------------------------------------------------
// COMPOSANT PAGE Histoire
// Server Component : rendu côté serveur, statique
// -----------------------------------------------------------------------------
export default function HistoirePage() {
  return (
    <>
      {/* === HERO === */}
      <section className="bg-crimson py-24 px-[5%] text-center">
        <p className="section-eyebrow text-gold">▷▷◁ Notre Histoire</p>
        <h1 className="section-title text-white">Nous sommes LEADER</h1>
      </section>

      {/* === SECTIONS NARRATIVES === */}
      {/*
        max-w-5xl mx-auto : centré, largeur max 64rem
        py-20 : padding vertical confortable
        space-y-24 : 6rem d'espace entre chaque section narrative
      */}
      <div className="max-w-5xl mx-auto px-[5%] py-20 space-y-24">
        {sections.map((s, i) => (
          /*
            key={s.title} : identifiant unique pour React (le titre est unique)
            
            LAYOUT ALTERNÉ (zigzag) :
            grid md:grid-cols-2 : deux colonnes côte à côte sur desktop
            gap-12 : espace généreux entre texte et image
            
            ${i % 2 !== 0 ? "md:[direction:rtl]" : ""} :
            → i % 2 !== 0 → sections d'index impair (1, 3, 5...)
            → direction:rtl (Right-To-Left) inverse l'ordre des colonnes CSS
            → Résultat : sections paires = texte gauche, image droite
                         sections impaires = image gauche, texte droite
            → Crée un effet "zigzag" narratif visuellement dynamique
            → NOTE : on re-remet direction:ltr sur les enfants pour que le texte
              reste lisible de gauche à droite
          */
          <div
            key={s.title}
            className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "md:[direction:rtl]" : ""}`}
          >
            {/* --- COLONNE TEXTE --- */}
            <div className={i % 2 !== 0 ? "md:[direction:ltr]" : ""}>
              <h2 className="font-playfair text-3xl font-bold text-crimson mb-4">
                {s.title}
              </h2>
              {/*
                s.text est un tableau de paragraphes
                .map() crée un <p> pour chaque paragraphe
                key={j} : index comme clé (acceptable quand la liste est statique)
              */}
              {s.text.map((p, j) => (
                <p key={j} className="text-gray-500 leading-relaxed mb-4">
                  {p}
                </p>
              ))}
              {/*
                {s.quote && <blockquote>...} : rendu conditionnel
                → La quote n'existe pas dans toutes les sections
                → Si s.quote est undefined, le blockquote ne s'affiche pas
                
                border-l-4 border-gold : barre dorée sur le côté gauche
                  → Style typographique classique pour les citations
                pl-5 : espace entre la barre et le texte
              */}
              {s.quote && (
                <blockquote className="font-playfair text-xl italic text-crimson border-l-4 border-gold pl-5 mt-6 leading-relaxed">
                  {/* &ldquo; et &rdquo; : guillemets typographiques " " */}
                  &ldquo;{s.quote}&rdquo;
                </blockquote>
              )}
            </div>

            {/* --- COLONNE IMAGE --- */}
            {/*
              overflow-hidden : les coins arrondis du div s'appliquent à l'image
              shadow-xl : ombre prononcée → image flottante visuellement
            */}
            <div className={`rounded-2xl overflow-hidden shadow-xl ${i % 2 !== 0 ? "md:[direction:ltr]" : ""}`}>
              {/*
                width et height : proportions "naturelles" de l'image
                className="w-full object-cover" : s'adapte à la colonne
                display:block sur img → supprime l'espace blanc sous l'image (quirk HTML)
              */}
              <Image
                src={s.image}
                alt={s.imageAlt}
                width={600}
                height={700}
                className="w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* === SECTION VALEURS (fond rouge) === */}
      <section className="bg-crimson py-20 px-[5%]">
        <div className="text-center mb-12">
          <p className="section-eyebrow text-gold">▷▷◁ Nos Valeurs</p>
          <h2 className="section-title text-white">Ce qui nous guide</h2>
        </div>
        {/*
          Grille 3 colonnes (1 colonne sur mobile)
          max-w-4xl mx-auto : centré
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {values.map((v) => (
            /*
              Cartes semi-transparentes sur fond rouge :
              bg-white/10 : fond blanc à 10% d'opacité → légère teinte claire
              border border-white/15 : bordure blanche à 15% → très subtil
            */
            <div
              key={v.title}
              className="bg-white/10 border border-white/15 rounded-2xl p-8 text-center"
            >
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="font-playfair text-white font-bold text-lg mb-2">
                {v.title}
              </h3>
              {/* text-white/65 : blanc à 65% → hiérarchie sous le titre */}
              <p className="text-white/65 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
