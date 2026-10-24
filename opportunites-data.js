/* ==========================================================
   OPPORTUNITÉS : vos annonces (bourses, emplois, stages...)

   COMMENT AJOUTER UNE ANNONCE
   1.    1. Copiez le bloc modèle ci-dessous (en dessous de MODÈLE À COPIER): retirez les marques de commentaire).
   2. Collez-le entre les crochets [ ], et remplissez-le.
   3. Séparez les blocs par une virgule.

   RÈGLES
   - titre, organisme et lien (https://...) sont OBLIGATOIRES, sinon l'annonce est ignorée.
   - N'inventez jamais une annonce. Copiez le lien de la source OFFICIELLE.
   - statut "verifie" : seulement si vous avez consulté la source ET rempli dateVerification.
     Sans date de vérification, l'annonce s'affiche « À vérifier ».
   - Si dateLimite est dépassée, l'annonce passe automatiquement en « Clôturé ».
   - Dates au format AAAA-MM-JJ (exemple : 2026-12-31). Laissez "" si inconnue.

   categorie : bourse, emploi, stage, formation, volontariat, concours, appel, financement, entrepreneuriat
   zone      : congo, afrique, international
   statut    : verifie, a-verifier, cloture
   ========================================================== */

/* ----- MODÈLE À COPIER -----
  {
    titre: "Titre de l'opportunité",
    organisme: "Nom de l'organisme",
    description: "Description courte, rédigée avec vos propres mots.",
    public: "Public concerné (ex. étudiants en master)",
    localisation: "Pays ou ville, ou « En ligne »",
    categorie: "bourse",
    zone: "international",
    dateLimite: "2026-12-31",
    statut: "a-verifier",
    datePublication: "2026-10-24",
    dateVerification: "",
    source: "Nom du site officiel",
    lien: "https://lien-officiel.exemple"
  },
----------------------------- */
window.OPPORTUNITES = [
{
    titre: "Appel à candidatures – Programme de Stages rémunérés de l’UNFPA ",
    organisme: "UNFPA",
    description: "Le Fonds des Nations Unies pour la Population (UNFPA) ouvre son programme de stages rémunérés pour les jeunes professionnels et étudiants passionnés par les questions de santé reproductive, égalité de genre, droits humains et développement durable.

Ce programme offre une occasion unique de :

✅ Acquérir une expérience concrète au sein d’une agence des Nations Unies.

✅ Contribuer à des projets internationaux sur la santé, la jeunesse et l’autonomisation des femmes.

✅ Travailler dans un environnement multiculturel et collaboratif.

✅ Développer des compétences professionnelles reconnues à l’échelle mondiale.

Les stagiaires sélectionnés rejoindront les bureaux de l’UNFPA à travers le monde pour une période déterminée, avec une rémunération mensuelle et un accompagnement professionnel.",
    public: "Public concerné (ex. étudiants en master)",
    localisation: "International",
    categorie: "bourse",
    zone: "international",
    dateLimite: "selon les bureaux régionaux",
    statut: "a-verifier",
    datePublication: "2026-10-24",
    dateVerification: "",
    source: "Nom du site officiel",
    lien: "https://www.unfpa.org/jobs/global-internship-roster-2026"
  },
];