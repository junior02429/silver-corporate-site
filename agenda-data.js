/* ==========================================================
   AGENDA : vos événements (formations, webinaires, rencontres...)

   COMMENT AJOUTER UN ÉVÉNEMENT
   1. Copiez le bloc modèle, collez-le entre les crochets, remplissez-le.
   2. Séparez les blocs par une virgule.

   RÈGLES
   - titre et date (AAAA-MM-JJ) sont OBLIGATOIRES.
   - N'ajoutez que des événements RÉELS. Pas d'événement fictif.
   - Un événement dont la date (ou dateFin) est passée passe automatiquement en « Terminé ».
   - lien : lien d'inscription de l'organisateur, s'il existe (sinon laissez "").
   - Pour VOTRE activité sans lien : mettez inscriptionWhatsapp: true.

   type    : formation, webinaire, conference, rencontre, concours, activite
   format  : presentiel, en-ligne, hybride
   statut  : confirme, a-verifier, termine
   ========================================================== */

/* ----- MODÈLE À COPIER -----
  {
    titre: "Titre de l'événement",
    type: "webinaire",
    format: "en-ligne",
    date: "2026-11-15",
    dateFin: "",
    heure: "15h00",
    lieu: "Lieu précis, ou plateforme en ligne",
    organisateur: "Nom de l'organisateur",
    description: "Description courte.",
    conditions: "Conditions de participation (gratuit, inscription obligatoire, âge...)",
    lien: "https://lien-inscription.exemple",
    inscriptionWhatsapp: false,
    statut: "a-verifier",
    dateVerification: ""
  },
----------------------------- */

window.AGENDA = [
  // Vos événements ici
];