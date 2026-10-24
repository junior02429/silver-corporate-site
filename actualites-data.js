/* ==========================================================
   ACTUALITÉS : vos articles

   COMMENT AJOUTER UNE ACTUALITÉ
   1. Lisez l'article original.
   2. Écrivez VOUS-MÊME un résumé avec vos propres mots (2 à 3 phrases).
      Ne copiez ni phrases, ni citations, ni chiffres que vous n'avez pas vérifiés.
   3. Copiez le bloc modèle, collez-le entre les crochets, remplissez-le.

   RÈGLES
   - titre, resume, source, lien (https://...) et datePublication sont OBLIGATOIRES,
     sinon l'article est ignoré.
   - statut "verifie" : seulement avec dateVerification remplie, sinon « À vérifier ».
   - Dates au format AAAA-MM-JJ.

   rubrique : education, jeunesse, numerique, ia, entrepreneuriat, economie, silver
   zone     : congo, afrique, monde
   statut   : verifie, a-verifier
   ========================================================== */

/* ----- MODÈLE À COPIER -----
  {
    titre: "Titre de l'actualité (le vôtre ou celui de l'article)",
    resume: "Votre résumé original, écrit avec vos propres mots.",
    rubrique: "numerique",
    zone: "afrique",
    datePublication: "2026-10-20",
    dateVerification: "2026-10-24",
    statut: "verifie",
    source: "Nom du média",
    lien: "https://lien-de-l-article-original.exemple"
  },
----------------------------- */

window.ACTUALITES = [

  {
    titre: "Congo/Formation : 500 jeunes bénéficient d’une formation gratuite en Intelligence artificielle",
    resume: "Le Fonea (Fonds national d’appui à l’employabilité et à l’apprentissage), en partenariat avec la Fondation BantuHub, a lancé à Brazzaville un programme gratuit de formation à l’intelligence artificielle destiné à 500 jeunes Congolais de 18 à 40 ans. Prévue sur huit semaines, du 20 octobre au 4 décembre 2026, la formation doit déboucher sur une certification. Selon l’ACI, 924 candidatures ont été enregistrées pour les 500 places. Une extension à Pointe-Noire est envisagée avant une deuxième session à Brazzaville, sans calendrier précisé dans l’article. L’article ne mentionne pas d’inscriptions encore ouvertes : cette actualité est publiée à titre d’information.",
    rubrique: "ia",
    etiquette: "Technologie & Formation",
    zone: "congo",
    datePublication: "2026-10-20",
    dateVerification: "2026-10-24",
    statut: "verifie",
    source: "Agence Congolaise d’Information (ACI)",
    lien: "https://www.aci.cg/congo-formation-500-jeunes-beneficient-dune-formation-gratuite-en-intelligence-artificielle/"
  }
];