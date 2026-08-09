// =============================================================================
// FICHIER : src/components/ui/SectionHeader.tsx
// RÔLE    : En-tête réutilisable pour toutes les sections du site
//
// PRINCIPE DRY (Don't Repeat Yourself) :
// Toutes les sections du site ont le même schéma :
//   1. Un "eyebrow" (petit texte en majuscules) ex: "▷▷◁ NOS PRODUITS"
//   2. Un titre principal (h2 en Playfair Display)
//   3. Optionnellement, un sous-titre descriptif
//
// Sans ce composant, on répéterait ces 10-15 lignes de JSX dans CHAQUE section.
// Avec ce composant, on écrit juste :
//   <SectionHeader eyebrow="Nos Produits" title="Quatre saveurs..." />
// → Uniformité garantie partout, modification en 1 seul endroit
//
// COMPOSANT SERVER : aucune interactivité → rendu côté serveur
// =============================================================================

// -----------------------------------------------------------------------------
// Interface Props — définit les propriétés acceptées par ce composant
//
// TypeScript force le parent à passer les bonnes props avec les bons types.
// Si on oublie "eyebrow" ou "title", TypeScript signale l'erreur immédiatement.
// -----------------------------------------------------------------------------
interface SectionHeaderProps {
  eyebrow: string;      // Petit texte au-dessus du titre (OBLIGATOIRE)
  title: string;        // Titre principal (OBLIGATOIRE) — peut contenir du HTML (<br/>)
  subtitle?: string;    // Sous-titre descriptif (OPTIONNEL — le "?" le rend facultatif)
  centered?: boolean;   // Centrer le texte ? (défaut: true) — false pour les layouts split
  light?: boolean;      // Mode clair ? false = textes foncés sur fond clair
                        //               true = textes clairs sur fond sombre (section cramoisie)
}

// -----------------------------------------------------------------------------
// COMPOSANT SectionHeader avec destructuration et valeurs par défaut
//
// { eyebrow, title, subtitle, centered = true, light = false }
// → Destructuration : extrait chaque prop directement en variable nommée
// → centered = true : valeur par défaut → si non précisée, le texte est centré
// → light = false : par défaut, on est en mode sombre sur fond clair
// -----------------------------------------------------------------------------
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    /*
      div conteneur
      mb-12 : marge basse 3rem → espace avant le contenu de la section
      ${centered ? "text-center" : ""} : centrage conditionnel
        → Sur l'accueil : centré (centered=true)
        → Dans une section split gauche/droite : non centré (centered=false)
    */
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      
      {/* === EYEBROW === */}
      {/*
        section-eyebrow : classe définie dans globals.css (text-xs uppercase tracking-wide)
        ${light ? "text-gold" : "text-orange-juice"} :
          → Sur fond rouge (light=true) : texte doré → contraste
          → Sur fond clair (light=false) : texte orange → couleur brand
      */}
      <p
        className={`section-eyebrow ${light ? "text-gold" : "text-orange-juice"}`}
      >
        ▷▷◁ {eyebrow}
        {/* Les triangles ▷▷◁ reproduisent le motif décoratif des vraies étiquettes Leader */}
      </p>

      {/* === TITRE PRINCIPAL === */}
      {/*
        section-title : classe de globals.css (font-playfair text-3xl md:text-4xl font-bold)
        ${light ? "text-white" : "text-crimson"} :
          → Sur fond rouge : titre blanc
          → Sur fond clair : titre rouge
        
        dangerouslySetInnerHTML : permet d'injecter du HTML brut
        → Utilisé ici pour supporter les <br/> dans les titres longs
          ex: title="Pour tous les moments,<br/>pour tous les goûts"
        ATTENTION : utiliser seulement avec du contenu qu'on contrôle
          (jamais avec du contenu utilisateur → risque XSS)
        __html est requis par React pour être explicite sur le risque
      */}
      <h2
        className={`section-title ${light ? "text-white" : "text-crimson"}`}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {/* === SOUS-TITRE (optionnel) === */}
      {/*
        {subtitle && <p>...} : rendu conditionnel
        → Si subtitle n'est pas passé (undefined), ce bloc n'est PAS rendu
        → Si subtitle est passé, le paragraphe s'affiche
        
        max-w-xl : largeur max 36rem → les sous-titres trop longs sont difficiles à lire
        ${centered ? "mx-auto" : ""} : centrage horizontal si mode centré
        ${light ? "text-white/70" : "text-gray-500"} : couleur adaptée au fond
      */}
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed max-w-xl ${centered ? "mx-auto" : ""} ${light ? "text-white/70" : "text-gray-500"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
