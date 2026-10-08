/* =====================================================================
   CATALOGUE EDRIC VALMONT — DONNÉES
   ---------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour changer les prix ou ajouter
   des objets. La page (index.html) se met à jour toute seule.

   Chaque groupe :
     groupe    : titre affiché
     categorie : "Armes", "Armures lourdes", "Armures légères",
                 "Outils" ou "Services" (sert aux filtres)
     note      : (optionnel) petite remarque sous le titre
     items     : la liste des objets

   Chaque objet :
     nom   : nom de l'objet
     mat   : (optionnel) matériaux nécessaires
     mo    : main d'oeuvre      -> null si pas encore fixé
     prix  : prix en septims    -> null si pas encore fixé ("Sur devis")
     img   : (optionnel) nom du fichier image dans le dossier images/
             Si absent, la page cherche automatiquement :
             images/<groupe>-<nom>.png (ou .jpg / .webp)
             ex. "Armes en fer" + "Épée"  ->  images/armes-en-fer-epee.png

   Astuce : pour retirer un objet, supprime sa ligne. Pour en ajouter
   un, copie une ligne existante. Attention aux virgules en fin de ligne.
   ===================================================================== */

/* Recettes partagées par plusieurs groupes (variantes visuelles) */
const RECETTE_DWEMER = [
  { nom: "Armure",    mat: "3 bandes de cuir, 1 lingot d'acier, 1 lingot de fer, 3 lingots de métal dwemer", mo: null, prix: null },
  { nom: "Gantelets", mat: "2 bandes de cuir, 1 lingot d'acier, 1 lingot de fer, 1 lingot de métal dwemer",  mo: null, prix: null },
  { nom: "Bottes",    mat: "2 bandes de cuir, 1 lingot d'acier, 1 lingot de fer, 2 lingots de métal dwemer", mo: null, prix: null },
  { nom: "Casque",    mat: "2 bandes de cuir, 1 lingot d'acier, 1 lingot de fer, 2 lingots de métal dwemer", mo: null, prix: null },
  { nom: "Bouclier",  mat: "1 bande de cuir, 1 lingot d'acier, 1 lingot de fer, 2 lingots de métal dwemer",  mo: null, prix: null },
];

const CATALOGUE = [

  /* ----------------------------- ARMES ----------------------------- */

  { groupe: "Armes en fer", categorie: "Armes", items: [
    { nom: "Arc",               mo: 4,  prix: 21 },
    { nom: "Flèches x80",       mo: 2,  prix: 15 },
    { nom: "Dague",             mo: 3,  prix: 19 },
    { nom: "Épée",              mo: 4,  prix: 25 },
    { nom: "Hache",             mo: 5,  prix: 26 },
    { nom: "Masse",             mo: 6,  prix: 32 },
    { nom: "Espadon",           mo: 8,  prix: 38 },
    { nom: "Hache d'arme",      mo: 8,  prix: 38 },
    { nom: "Marteau de guerre", mo: 10, prix: 39 },
  ]},

  { groupe: "Armes en acier", categorie: "Armes", items: [
    { nom: "Arc",               mo: 8,  prix: 40 },
    { nom: "Flèches x80",       mo: 3,  prix: 19 },
    { nom: "Dague",             mo: 5,  prix: 28 },
    { nom: "Épée",              mo: 6,  prix: 37 },
    { nom: "Hache",             mo: 8,  prix: 39 },
    { nom: "Masse",             mo: 9,  prix: 47 },
    { nom: "Espadon",           mo: 12, prix: 65 },
    { nom: "Hache d'arme",      mo: 11, prix: 59 },
    { nom: "Marteau de guerre", mo: 11, prix: 59 },
  ]},

  { groupe: "Armes communes", categorie: "Armes", items: [
    { nom: "Arc",          mo: 7, prix: 37 },
    { nom: "Dague",        mo: 5, prix: 27 },
    { nom: "Épée",         mo: 6, prix: 35 },
    { nom: "Hache",        mo: 8, prix: 36 },
    { nom: "Espadon",      mo: 6, prix: 35 },
    { nom: "Hache d'arme", mo: 9, prix: 40 },
    { nom: "Masse",        mo: 9, prix: 43 },
  ]},

  /* ------------------------ ARMURES LOURDES ------------------------ */

  { groupe: "Armure en fer", categorie: "Armures lourdes", items: [
    { nom: "Casque",    mat: "2 bandes de cuir, 3 lingots de fer",                     mo: 6,  prix: 32 },
    { nom: "Armure",    mat: "3 bandes de cuir, 1 corindon raffiné, 5 lingots de fer", mo: 10, prix: 45 },
    { nom: "Gantelets", mat: "2 bandes de cuir, 2 lingots de fer",                     mo: 6,  prix: 32 },
    { nom: "Bottes",    mat: "2 bandes de cuir, 3 lingots de fer",                     mo: 8,  prix: 38 },
    { nom: "Bouclier",  mat: "1 bande de cuir, 4 lingots de fer",                      mo: 7,  prix: 37 },
  ]},

  { groupe: "Armure en acier", categorie: "Armures lourdes", items: [
    { nom: "Casque",    mat: "2 bandes de cuir, 2 lingots d'acier, 1 lingot de fer", mo: 10, prix: 39 },
    { nom: "Armure",    mat: "3 bandes de cuir, 4 lingots d'acier, 1 lingot de fer", mo: 15, prix: 59 },
    { nom: "Gantelets", mat: "2 bandes de cuir, 2 lingots d'acier, 1 lingot de fer", mo: 10, prix: 39 },
    { nom: "Bottes",    mat: "2 bandes de cuir, 3 lingots d'acier, 1 lingot de fer", mo: 12, prix: 48 },
    { nom: "Bouclier",  mat: "1 bande de cuir, 3 lingots d'acier, 1 lingot de fer",  mo: 12, prix: 47 },
  ]},

  /* Dwemer : 3 variantes visuelles, mêmes matériaux et mêmes prix.
     Les prix se changent UNE seule fois dans RECETTE_DWEMER (en haut du fichier). */
  { groupe: "Dwemer", categorie: "Armures lourdes", licence: "dwemer", items: RECETTE_DWEMER },

  { groupe: "Dwemer Jerall", categorie: "Armures lourdes", licence: "dwemer",
    note: "Variante esthétique du Dwemer : mêmes matériaux, mêmes prix.",
    items: RECETTE_DWEMER },

  { groupe: "Dwemer Velothi", categorie: "Armures lourdes", licence: "dwemer",
    note: "Variante esthétique du Dwemer : mêmes matériaux, mêmes prix. Pas de bouclier.",
    items: RECETTE_DWEMER.filter(it => it.nom !== "Bouclier") },

  { groupe: "Orsimer", categorie: "Armures lourdes", licence: "orsimer", items: [
    { nom: "Armure",    mat: "3 bandes de cuir, 4 lingots d'orichalque, 1 lingot de fer", mo: null, prix: null },
    { nom: "Gantelets", mat: "2 bandes de cuir, 2 lingots d'orichalque, 1 lingot de fer", mo: null, prix: null },
    { nom: "Bottes",    mat: "2 bandes de cuir, 3 lingots d'orichalque, 1 lingot de fer", mo: null, prix: null },
    { nom: "Casque",    mat: "2 bandes de cuir, 2 lingots d'orichalque, 1 lingot de fer", mo: null, prix: null },
    { nom: "Bouclier",  mat: "1 bande de cuir, 3 lingots d'orichalque, 1 lingot de fer",  mo: null, prix: null },
  ]},

  { groupe: "Bosmer lourd", categorie: "Armures lourdes", licence: "bosmer", items: [
    { nom: "Armure",    mat: "3 bandes de cuir, 4 pierres de lune raffinées, 1 lingot de fer, 1 cuir, 1 corindon raffiné", mo: null, prix: null },
    { nom: "Gantelets", mat: "2 bandes de cuir, 1 pierre de lune raffinée, 1 lingot de fer, 1 cuir, 1 corindon raffiné",  mo: null, prix: null },
    { nom: "Bottes",    mat: "2 bandes de cuir, 2 pierres de lune raffinées, 1 lingot de fer, 1 cuir, 1 corindon raffiné", mo: null, prix: null },
    { nom: "Casque",    mat: "1 bande de cuir, 2 pierres de lune raffinées, 1 lingot de fer, 1 cuir, 1 corindon raffiné",  mo: null, prix: null },
  ]},

  { groupe: "Impérial", categorie: "Armures lourdes", items: [
    { nom: "Armure",    mat: "3 bandes de cuir, 4 lingots d'acier, 2 cuirs",         mo: null, prix: null },
    { nom: "Gantelets", mat: "2 bandes de cuir, 2 lingots d'acier, 1 lingot de fer", mo: null, prix: null },
    { nom: "Bottes",    mat: "2 bandes de cuir, 3 lingots d'acier, 1 lingot de fer", mo: null, prix: null },
  ]},

  { groupe: "Sombrages", categorie: "Armures lourdes", items: [
    { nom: "Armure",    mat: "3 bandes de cuir, 4 lingots d'acier, 2 cuirs", mo: null, prix: null },
    { nom: "Gantelets", mat: "2 bandes de cuir, 2 lingots d'acier, 1 cuir",  mo: null, prix: null },
    { nom: "Bottes",    mat: "2 bandes de cuir, 2 lingots d'acier, 1 cuir",  mo: null, prix: null },
    { nom: "Casque",    mat: "1 bande de cuir, 2 lingots d'acier, 1 cuir",   mo: null, prix: null },
    { nom: "Bouclier",  mat: "2 bandes de cuir, 4 lingots d'acier",          mo: null, prix: null },
  ]},

  { groupe: "Armure commune lourde", categorie: "Armures lourdes", items: [
    { nom: "Armure", mo: 10, prix: 45 },
  ]},

  { groupe: "Lamellar", categorie: "Armures lourdes",
    note: "Recette et prix à compléter.", items: [
    { nom: "Armure",                mo: null, prix: null },
    { nom: "Gantelets",             mo: null, prix: null },
    { nom: "Bottes",                mo: null, prix: null },
    { nom: "Casque",                mo: null, prix: null },
  ]},

  /* ------------------------ ARMURES LÉGÈRES ------------------------ */

  { groupe: "Elfique", categorie: "Armures légères", licence: "altmer", items: [
    { nom: "Armure",    mat: "3 bandes de cuir, 4 pierres de lune raffinées, 1 lingot de fer, 1 lingot de vif-argent", mo: null, prix: null },
    { nom: "Gantelets", mat: "2 bandes de cuir, 1 pierre de lune raffinée, 1 lingot de fer, 1 cuir",   mo: null, prix: null },
    { nom: "Bottes",    mat: "2 bandes de cuir, 2 pierres de lune raffinées, 1 lingot de fer, 1 cuir", mo: null, prix: null },
    { nom: "Casque",    mat: "1 bande de cuir, 2 pierres de lune raffinées, 1 lingot de fer, 1 cuir",  mo: null, prix: null },
    { nom: "Bouclier",  mat: "2 bandes de cuir, 4 pierres de lune raffinées, 1 lingot de fer",         mo: null, prix: null },
  ]},

  { groupe: "Bosmer", categorie: "Armures légères", licence: "bosmer", items: [
    { nom: "Armure",    mat: "3 bandes de cuir, 4 pierres de lune raffinées, 1 lingot de fer, 1 cuir", mo: null, prix: null },
    { nom: "Gantelets", mat: "2 bandes de cuir, 1 pierre de lune raffinée, 1 lingot de fer, 1 cuir",   mo: null, prix: null },
    { nom: "Bottes",    mat: "2 bandes de cuir, 2 pierres de lune raffinées, 1 lingot de fer, 1 cuir", mo: null, prix: null },
    { nom: "Casque",    mat: "1 bande de cuir, 2 pierres de lune raffinées, 1 lingot de fer, 1 cuir",  mo: null, prix: null },
  ]},

  { groupe: "Commun", categorie: "Armures légères", items: [
    { nom: "Armure",    mat: "3 bandes de cuir, 4 cuirs", mo: null, prix: null },
    { nom: "Gantelets", mat: "2 bandes de cuir, 1 cuir",  mo: null, prix: null },
    { nom: "Bottes",    mat: "2 bandes de cuir, 2 cuirs", mo: null, prix: null },
    { nom: "Casque",    mat: "1 bande de cuir, 2 cuirs",  mo: null, prix: null },
    { nom: "Bouclier",  mat: "2 bandes de cuir, 4 cuirs", mo: null, prix: null },
  ]},

  { groupe: "Armure en cuir", categorie: "Armures légères", items: [
    { nom: "Casque",    mo: 4, prix: 24 },
    { nom: "Armure",    mo: 7, prix: 38 },
    { nom: "Gantelets", mo: 3, prix: 20 },
    { nom: "Bottes",    mo: 3, prix: 25 },
    { nom: "Bouclier",  mo: 5, prix: 36 },
  ]},

  { groupe: "Armure en peaux", categorie: "Armures légères", items: [
    { nom: "Casque",         mo: 3, prix: 24 },
    { nom: "Armure",         mo: 5, prix: 38 },
    { nom: "Gantelets",      mo: 4, prix: 20 },
    { nom: "Bottes",         mo: 4, prix: 25 },
    { nom: "Bouclier",       mo: 4, prix: 36 },
    { nom: "Large fourrure", mo: 3, prix: 20 },
  ]},

  { groupe: "Armure en fourrure", categorie: "Armures légères", items: [
    { nom: "Casque",    mo: 3, prix: 24 },
    { nom: "Armure",    mo: 5, prix: 43 },
    { nom: "Gantelets", mo: 4, prix: 20 },
    { nom: "Bottes",    mo: 4, prix: 25 },
    { nom: "Bouclier",  mo: 4, prix: 36 },
    { nom: "Col",       mo: 3, prix: 20 },
  ]},

  { groupe: "Armure cloutée", categorie: "Armures légères", items: [
    { nom: "Armure", mo: 4, prix: 44 },
  ]},

  { groupe: "Armure commune légère", categorie: "Armures légères", items: [
    { nom: "Armure",    mo: 7, prix: 38 },
    { nom: "Gantelets", mo: 3, prix: 20 },
    { nom: "Bottes",    mo: 2, prix: 25 },
  ]},

  { groupe: "Armure de mailles", categorie: "Armures légères", items: [
    { nom: "Mail and Hide Armor", mo: 6, prix: 61 },
    { nom: "Mail and Jacket",     mo: 3, prix: 34 },
    { nom: "Mail and Surcoat",    mo: 3, prix: 34 },
    { nom: "Mail Tunic",          mo: 3, prix: 34 },
  ]},

  { groupe: "Armure huilée (Oiled)", categorie: "Armures légères", items: [
    { nom: "Oiled Mail and Hide Armor", mo: 6, prix: 61 },
    { nom: "Oiled Mail and Jacket",     mo: 3, prix: 34 },
    { nom: "Oiled Mail Hauberk",        mo: 3, prix: 34 },
  ]},

  { groupe: "Orsimer léger", categorie: "Armures légères", licence: "orsimer",
    note: "Recette et prix à compléter.", items: [
    { nom: "Armure",                mo: null, prix: null },
    { nom: "Armure (variante)",     mo: null, prix: null },
    { nom: "Gantelets",             mo: null, prix: null },
    { nom: "Bottes",                mo: null, prix: null },
    { nom: "Casque",                mo: null, prix: null },
  ]},

  { groupe: "Rugged", categorie: "Armures légères",
    note: "Recette et prix à compléter.", items: [
    { nom: "Armure",                mo: null, prix: null },
    { nom: "Gantelets",             mo: null, prix: null },
    { nom: "Bottes",                mo: null, prix: null },
    { nom: "Casque",                mo: null, prix: null },
    { nom: "Bouclier",              mo: null, prix: null },
  ]},

  { groupe: "Peau", categorie: "Armures légères",
    note: "Recette et prix à compléter.", items: [
    { nom: "Armure",                mo: null, prix: null },
    { nom: "Armure (variante)",     mo: null, prix: null },
    { nom: "Gantelets",             mo: null, prix: null },
    { nom: "Bottes",                mo: null, prix: null },
    { nom: "Casque",                mo: null, prix: null },
    { nom: "Bouclier",              mo: null, prix: null },
  ]},

  { groupe: "Rogue", categorie: "Armures légères",
    note: "Recette et prix à compléter.", items: [
    { nom: "Armure",                mo: null, prix: null },
    { nom: "Gantelets",             mo: null, prix: null },
    { nom: "Bottes",                mo: null, prix: null },
    { nom: "Casque",                mo: null, prix: null },
  ]},

  /* ----------------------------- OUTILS ---------------------------- */

  { groupe: "Outils", categorie: "Outils", items: [
    { nom: "Pioche",                        mo: 3, prix: 17 },
    { nom: "Hache de bûcheron",             mo: 3, prix: 17 },
    { nom: "Clé",                           mo: 6, prix: 27 },
    { nom: "Outil de réparation d'armure",  mo: 2, prix: 13 },
    { nom: "Outil de réparation d'arme",    mo: 2, prix: 13 },
  ]},

  /* ---------------------------- SERVICES --------------------------- */

  { groupe: "Réparations", categorie: "Services", note: "Prix pour UN palier de réparation", items: [
    { nom: "Réparation (n'importe quel objet)", mo: 5, prix: 15 },
  ]},
];

/* =====================================================================
   LICENCES
   ---------------------------------------------------------------------
   Pour soumettre un groupe à licence, ajoute  licence: "bosmer"  (ou
   "altmer", "dwemer", "orsimer", "verre", "ebonite") à ce groupe.
   Tarifs : null = non communiqué.
   ===================================================================== */
const LICENCES = {
  fabrication: 3000,  // licence de fabrication, prix fixe
  regles: [
    "Article IV (Domaine aldmeri) : les biens soumis à licence sont classés en cinq catégories : tête, torse, mains, pieds, et accessoires / bijoux / artefacts / armes.",
    "Chaque objet est soumis à une licence individuelle. Une licence ne couvre qu'une seule unité déclarée.",
  ],
  origines: {
    bosmer: {
      nom: "Bosmer", autorite: "Domaine aldmeri", article: "Article V",
      supplement: "Armure bosmer lourde Chasse Sauvage : +1000 septims (usage de malachite)",
      equipement: [ ["Bosmer", 1170], ["Altmer, Khajiit, Dunmer", 1530], ["Autres races", 1800] ],
      armes:      [ ["Bosmer", 780],  ["Altmer, Khajiit, Dunmer", 1020], ["Autres races", 1200] ],
    },
    altmer: {
      nom: "Altmer (Elfique)", autorite: "Domaine aldmeri", article: "Article VI",
      equipement: [ ["Altmer", 2080], ["Bosmer, Khajiit, Dunmer", 2720], ["Autres races", 3200] ],
      armes:      [ ["Altmer", 1300], ["Bosmer, Khajiit, Dunmer", 1700], ["Autres races", 2000] ],
    },
    verre:   { nom: "Verre",   autorite: "Domaine aldmeri",                    equipement: null, armes: null },
    orsimer: { nom: "Orsimer", autorite: "Clans orsimers de Bordeciel",        equipement: null, armes: null },
    dwemer:  { nom: "Dwemer",  autorite: "Châtellerie de Markarth",            equipement: null, armes: null },
    ebonite: { nom: "Ébonite", autorite: "Compagnie de l'Empire Oriental",     equipement: null, armes: null },
  },
};

/* Infos générales affichées en haut de la page */
const BOUTIQUE = {
  nom: "Forge d'Edric Valmont",
  sousTitre: "Si un objet n'y est pas, c'est que je ne peux pas le faire (ou que c'est tarpin moche).",
  monnaie: "septims",
};
