/* ==========================================================
   SILVER CORPORATE - script.js
   Un seul fichier pour toutes les pages :
   menu, catalogue, packs, promotions, panier, WhatsApp,
   filtres, listes (opportunités, actualités, agenda, ressources)
   et formulaire de contact.
   ========================================================== */
(function () {
  'use strict';

  /* ========================================================
     1. CONFIGURATION
     ======================================================== */
  var CONFIG = {
    whatsapp: '242069534092',               // numéro commercial, format international sans + ni espaces
    email: 'silvercorporate.cg@gmail.com',
    devise: 'FCFA',
    cleStockage: 'silverCorporate.panier.v1'
  };

  /* ========================================================
     2. CATALOGUE DES SERVICES  (à modifier ici uniquement)

     statut :
       'disponible'       -> peut être ajouté au panier SI prix renseigné ET prixValide: true
       'sur-devis'        -> bouton « Demander un devis » (ligne à chiffrer)
       'a-confirmer'      -> disponibilité à confirmer : jamais dans le panier
       'en-developpement' -> jamais dans le panier
       'a-venir'          -> jamais dans le panier

     prixValide : mettez false pour afficher « Prix à confirmer » (le bouton panier disparaît).
     ======================================================== */
  var CATALOGUE_SERVICES = [
    // --- Saisie et traitement de documents ---
    { id: 'saisie-documents', categorie: 'saisie', nom: 'Saisie de documents', description: 'Saisie de vos textes et documents.', prix: 300, unite: 'page', statut: 'disponible', prixValide: true },
    { id: 'mise-en-forme', categorie: 'saisie', nom: 'Mise en forme de documents', description: 'Mise en page propre et professionnelle de vos documents.', prix: 500, unite: 'page', statut: 'disponible', prixValide: true },
    { id: 'redaction-cv', categorie: 'saisie', nom: 'Rédaction de CV simple sans photo', description: 'Création ou refonte de votre CV.', prix: 500, unite: '', statut: 'disponible', prixValide: true },
    { id: 'redaction-cv', categorie: 'saisie', nom: 'Rédaction de CV simple avec photo', description: 'Création ou refonte de votre CV.', prix: 700, unite: '', statut: 'disponible', prixValide: true },
    { id: 'redaction-cv', categorie: 'saisie', nom: 'Rédaction de CV professionnel', description: 'Création ou refonte de votre CV.', prix: 1000, unite: '', statut: 'disponible', prixValide: true },
    { id: 'lettre-motivation', categorie: 'saisie', nom: 'Lettre de motivation', description: 'Rédaction d’une lettre de motivation adaptée à votre candidature.', prix: 700, unite: '', statut: 'disponible', prixValide: true },
    { id: 'documents-administratifs', categorie: 'saisie', nom: 'Documents administratifs', description: 'Préparation et mise en forme de documents administratifs.', prix: null, unite: '', statut: 'sur-devis', prixValide: false },
    { id: 'presentations-powerpoint', categorie: 'saisie', nom: 'Présentations PowerPoint', description: 'Création de présentations pour vos exposés, projets ou réunions.', prix: null, unite: '', statut: 'sur-devis', prixValide: false },
    { id: 'documents-professionnels', categorie: 'saisie', nom: 'Documents professionnels', description: 'Courriers, rapports et autres documents pour votre activité.', prix: null, unite: '', statut: 'sur-devis', prixValide: false },

    // --- Impression, reproduction et numérisation ---
    { id: 'impression-nb', categorie: 'impression', nom: 'Impression noir et blanc', description: 'Impression de vos documents en noir et blanc.', prix: 50, unite: 'page', statut: 'disponible', prixValide: true },
    { id: 'impression-couleur', categorie: 'impression', nom: 'Impression couleur', description: 'Impression de vos documents en couleur.', prix: 100, unite: 'page', statut: 'disponible', prixValide: true },
    { id: 'photocopie', categorie: 'impression', nom: 'Photocopie', description: 'Photocopie de vos documents.', prix: 25, unite: 'page', statut: 'disponible', prixValide: true },
    { id: 'numerisation', categorie: 'impression', nom: 'Numérisation', description: 'Numérisation de vos documents papier.', prix: 200, unite: 'document', statut: 'disponible', prixValide: true },
    { id: 'reliure', categorie: 'impression', nom: 'Reliure', description: 'Reliure de documents.', prix: null, unite: '', statut: 'a-confirmer', prixValide: false },
    { id: 'plastification', categorie: 'impression', nom: 'Plastification', description: 'Plastification de documents.', prix: null, unite: '', statut: 'a-confirmer', prixValide: false },

    // --- Services numériques ---
    { id: 'visuels-simples', categorie: 'numerique', nom: 'Création de visuels simples', description: 'Petits visuels pour vos publications ou supports.', prix: null, unite: '', statut: 'sur-devis', prixValide: false },
    { id: 'formulaires', categorie: 'numerique', nom: 'Création de formulaires', description: 'Formulaires numériques ou imprimables.', prix: null, unite: '', statut: 'sur-devis', prixValide: false },
    { id: 'tableaux-excel', categorie: 'numerique', nom: 'Réalisation de tableaux Excel', description: 'Tableaux, suivis et petits modèles de calcul.', prix: null, unite: '', statut: 'sur-devis', prixValide: false },
    { id: 'documents-numeriques', categorie: 'numerique', nom: 'Préparation de documents numériques', description: 'Assistance pour préparer vos documents au format numérique.', prix: null, unite: '', statut: 'sur-devis', prixValide: false },
    { id: 'assistance-informatique', categorie: 'numerique', nom: 'Assistance informatique de base', description: 'Aide pour les usages courants de l’ordinateur et du téléphone.', prix: null, unite: '', statut: 'a-confirmer', prixValide: false },
    { id: 'sites-web-simples', categorie: 'numerique', nom: 'Création de sites web simples', description: 'Sites web simples pour présenter une activité.', prix: null, unite: '', statut: 'a-confirmer', prixValide: false },

    // --- Accompagnement professionnel et administratif ---
    { id: 'dossiers-candidature', categorie: 'accompagnement', nom: 'Préparation de dossiers de candidature', description: 'Aide à la constitution de dossiers (emploi, stage, bourse).', prix: null, unite: '', statut: 'a-confirmer', prixValide: false },
    { id: 'recherche-opportunites', categorie: 'accompagnement', nom: 'Assistance à la recherche d’opportunités', description: 'Aide pour repérer des offres adaptées à votre profil.', prix: null, unite: '', statut: 'a-confirmer', prixValide: false },
    { id: 'accompagnement-administratif', categorie: 'accompagnement', nom: 'Accompagnement administratif', description: 'Aide dans certaines démarches administratives.', prix: null, unite: '', statut: 'a-confirmer', prixValide: false },
    { id: 'formation-numerique', categorie: 'accompagnement', nom: 'Formation bureautique, informatique et IA', description: 'Formation aux outils numériques et à l’intelligence artificielle.', prix: null, unite: '', statut: 'a-confirmer', prixValide: false }
  ];

  /* ========================================================
     3. CATALOGUE DES PACKS  (à modifier ici uniquement)

     Pour ACTIVER le prix d'un pack simple une fois validé :
       1) mettez prixValide: true
       2) mettez statut: 'disponible'
     Tant que ce n'est pas fait, le site affiche « Prix à confirmer »
     et le chiffre n'apparaît jamais.
     publics : etudiants, candidats, entrepreneurs, particuliers, organisations
     ======================================================== */
  var CATALOGUE_PACKS = [
    { id: 'pack-impression-essentiel', nom: 'Pack Impression Essentiel', publics: ['etudiants', 'particuliers'],
      description: 'Impression noir et blanc pour vos documents, dans une limite de pages à définir.',
      inclus: ['Impression noir et blanc'], limites: 'Nombre de pages à préciser.',
      prix: 500, unite: 'pack', prixValide: false, statut: 'en-preparation' },
    { id: 'pack-impression-mixte', nom: 'Pack Impression Mixte', publics: ['etudiants', 'organisations', 'particuliers'],
      description: 'Combinaison d’impressions noir et blanc et couleur.',
      inclus: ['Impression noir et blanc', 'Impression couleur'], limites: 'Répartition noir et blanc / couleur à préciser.',
      prix: 1000, unite: 'pack', prixValide: false, statut: 'en-preparation' },
    { id: 'pack-document-propre', nom: 'Pack Document Propre', publics: ['etudiants', 'particuliers'],
      description: 'Saisie et mise en forme d’un document dans une limite définie.',
      inclus: ['Saisie', 'Mise en forme'], limites: 'Nombre maximal de pages et niveau de mise en forme à préciser.',
      prix: 1000, unite: 'pack', prixValide: false, statut: 'en-preparation' },
    { id: 'pack-etudiant-essentiel', nom: 'Pack Étudiant Essentiel', publics: ['etudiants'],
      description: 'Formule limitée pour les élèves et étudiants : saisie, mise en forme et impression.',
      inclus: ['Saisie', 'Mise en forme', 'Impression'], limites: 'Contenu et volume à préciser ; supplément au-delà de la formule.',
      prix: 1500, unite: 'pack', prixValide: false, statut: 'en-preparation' },
    { id: 'pack-candidature', nom: 'Pack Candidature', publics: ['candidats'],
      description: 'Pour les candidats à l’emploi ou aux stages.',
      inclus: ['CV', 'Lettre de motivation', 'Mise en forme du dossier'], limites: 'Devis ou prix fixe après validation du contenu.',
      prix: null, unite: 'pack', prixValide: false, statut: 'sur-devis' },
    { id: 'pack-entrepreneur', nom: 'Pack Entrepreneur', publics: ['entrepreneurs'],
      description: 'Pour les entrepreneurs et petites entreprises.',
      inclus: ['Documents professionnels', 'Tableau Excel ou présentation'], limites: 'Établi sur devis selon le travail demandé.',
      prix: null, unite: 'pack', prixValide: false, statut: 'sur-devis' },
    { id: 'pack-presence-numerique', nom: 'Pack Présence numérique', publics: ['entrepreneurs', 'organisations'],
      description: 'Accompagnement pour développer votre présence numérique.',
      inclus: ['Visuel, formulaire ou accompagnement numérique'], limites: 'Établi sur devis selon le travail demandé.',
      prix: null, unite: 'pack', prixValide: false, statut: 'sur-devis' },
    { id: 'pack-organisation', nom: 'Pack Organisation', publics: ['organisations'],
      description: 'Pour les associations et petites structures.',
      inclus: ['Documents', 'Tableaux', 'Supports de présentation'], limites: 'Établi sur devis selon le travail demandé.',
      prix: null, unite: 'pack', prixValide: false, statut: 'sur-devis' },
    { id: 'pack-formation', nom: 'Pack Formation', publics: ['particuliers', 'organisations'],
      description: 'Formation en bureautique, informatique ou intelligence artificielle.',
      inclus: ['Formation selon la durée et le format choisis'], limites: 'Tarif, durée et format à définir.',
      prix: null, unite: 'pack', prixValide: false, statut: 'a-confirmer' }
  ];

  /* ========================================================
     4. PROMOTIONS  (aucune n'est active par défaut)

     Pour ACTIVER une promotion, remplissez TOUT ceci :
       active: true, taux (en %), dateDebut et dateFin (AAAA-MM-JJ)
     Autres réglages :
       eligibles      : null (toutes les prestations à prix fixe) ou liste d'id, ex. ['impression-nb']
       packsEligibles : true pour autoriser la réduction sur les packs à prix fixe
       minMontant     : montant minimal éligible (0 = aucun)
       minLignes      : nombre minimal de lignes éligibles (0 = aucun)
       plafond        : réduction maximale en FCFA (null = aucun)
     Règle : une seule promotion par commande, jamais cumulée.
     ======================================================== */
  var PROMOTIONS = [
    { id: 'offre-lancement', nom: 'Offre de lancement', public: 'Plusieurs publics', taux: 10, active: false, dateDebut: '', dateFin: '', eligibles: null, packsEligibles: false, minMontant: 0, minLignes: 0, plafond: null, conditions: 'Période, prestations concernées et éventuel plafond à définir.' },
    { id: 'offre-etudiant', nom: 'Offre Étudiant', public: 'Élèves et étudiants', taux: 5, active: false, dateDebut: '', dateFin: '', eligibles: null, packsEligibles: false, minMontant: 0, minLignes: 0, plafond: null, conditions: 'Justificatif éventuel et services éligibles à définir.' },
    { id: 'offre-candidature', nom: 'Offre Candidature', public: 'Candidats à l’emploi', taux: 5, active: false, dateDebut: '', dateFin: '', eligibles: null, packsEligibles: false, minMontant: 0, minLignes: 0, plafond: null, conditions: 'Pack concerné et période à définir.' },
    { id: 'offre-entrepreneur', nom: 'Offre Entrepreneur', public: 'Entrepreneurs et petites entreprises', taux: 5, active: false, dateDebut: '', dateFin: '', eligibles: null, packsEligibles: false, minMontant: 0, minLignes: 0, plafond: null, conditions: 'Prestations éligibles et montant minimal éventuel à définir.' },
    { id: 'offre-multi-services', nom: 'Offre Multi-services', public: 'Tous publics', taux: 5, active: false, dateDebut: '', dateFin: '', eligibles: null, packsEligibles: false, minMontant: 0, minLignes: 0, plafond: null, conditions: 'Nombre de prestations ou montant minimal à définir.' },
    { id: 'offre-fidelite', nom: 'Offre Fidélité', public: 'Clients réguliers', taux: 5, active: false, dateDebut: '', dateFin: '', eligibles: null, packsEligibles: false, minMontant: 0, minLignes: 0, plafond: null, conditions: 'Nombre de commandes requis et période de validité à définir.' },
    { id: 'offre-speciale', nom: 'Offre Spéciale', public: 'Selon la campagne', taux: null, active: false, dateDebut: '', dateFin: '', eligibles: null, packsEligibles: false, minMontant: 0, minLignes: 0, plafond: null, conditions: 'Taux, dates de début et de fin, capacité disponible à définir.' }
  ];

  /* ========================================================
     5. LIBELLÉS (textes affichés)
     ======================================================== */
  var LIB = {
    publics: { etudiants: 'Étudiants', candidats: 'Candidats', entrepreneurs: 'Entrepreneurs', particuliers: 'Particuliers', organisations: 'Organisations' },
    categoriesOpp: { bourse: 'Bourse', emploi: 'Emploi', stage: 'Stage', formation: 'Formation gratuite', volontariat: 'Volontariat', concours: 'Concours', appel: 'Appel à projets', financement: 'Financement', entrepreneuriat: 'Entrepreneuriat' },
    zonesOpp: { congo: 'Congo', afrique: 'Afrique', international: 'International' },
    rubriques: { education: 'Éducation', jeunesse: 'Jeunesse', numerique: 'Numérique', ia: 'Intelligence artificielle', entrepreneuriat: 'Entrepreneuriat', economie: 'Économie', silver: 'Silver Corporate' },
    zonesAct: { congo: 'Congo-Brazzaville', afrique: 'Afrique', monde: 'Monde' },
    typesAgenda: { formation: 'Formation', webinaire: 'Webinaire', conference: 'Conférence', rencontre: 'Rencontre', concours: 'Concours', activite: 'Activité' },
    formats: { presentiel: 'Sur place', 'en-ligne': 'En ligne', hybride: 'Hybride' },
    themes: { etudes: 'Études', bourses: 'Bourses', candidatures: 'Candidatures', numerique: 'Compétences numériques', programmation: 'Programmation', ia: 'Intelligence artificielle', entrepreneuriat: 'Entrepreneuriat' },
    typesRes: { guide: 'Guide pratique', cours: 'Cours ou formation', outil: 'Outil', lecture: 'Lecture' }
  };

  /* ========================================================
     6. OUTILS GÉNÉRAUX
     ======================================================== */

  // Crée un élément HTML de façon sûre (le texte est toujours inséré comme texte simple)
  function el(tag, attrs, enfants) {
    var n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === 'class') n.className = v;
        else if (k === 'text') n.textContent = v;
        else if (k.indexOf('on') === 0) n.addEventListener(k.slice(2), v);
        else n.setAttribute(k, v === true ? '' : v);
      });
    }
    (enfants || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return n;
  }

  function estTexte(x) { return typeof x === 'string' && x.trim() !== ''; }
  function lienSur(u) { return estTexte(u) && /^https?:\/\//i.test(u.trim()); }
  function normaliser(s) { return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }

  function formatMontant(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ' + CONFIG.devise;
  }

  // Dates au format AAAA-MM-JJ
  function parseDate(s) {
    if (typeof s !== 'string') return null;
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
    if (!m) return null;
    var d = new Date(+m[1], +m[2] - 1, +m[3]);
    return (d.getFullYear() === +m[1] && d.getMonth() === +m[2] - 1 && d.getDate() === +m[3]) ? d : null;
  }
  function aujourdhui() { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }
  function formatDate(s) {
    var d = parseDate(s);
    return d ? d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  }

  function lienWhatsApp(texte) {
    return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texte);
  }
  function ouvrirWhatsApp(texte) {
    var fenetre = window.open(lienWhatsApp(texte), '_blank');
    if (!fenetre) window.location.href = lienWhatsApp(texte);
  }

  function badge(texte, couleur) { return el('span', { class: 'badge badge-' + couleur, text: texte }); }

  /* ========================================================
     7. MENU (téléphone) ET PETITS DÉTAILS
     ======================================================== */
  function initMenu() {
    var bouton = document.getElementById('nav-toggle');
    var nav = document.getElementById('main-nav');
    if (!bouton || !nav) return;

    function fermer() {
      nav.classList.remove('is-open');
      bouton.setAttribute('aria-expanded', 'false');
      bouton.setAttribute('aria-label', 'Ouvrir le menu');
    }
    bouton.addEventListener('click', function () {
      var ouvert = nav.classList.toggle('is-open');
      bouton.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
      bouton.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) fermer(); });

    var plus = nav.querySelector('.nav-more details');
    if (plus) {
      if (plus.querySelector('a[aria-current="page"]')) plus.parentNode.classList.add('has-current');
      document.addEventListener('click', function (e) { if (!plus.contains(e.target)) plus.removeAttribute('open'); });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { fermer(); if (plus) plus.removeAttribute('open'); }
    });
  }

  function initAnnee() {
    var s = document.getElementById('year');
    if (s) s.textContent = String(new Date().getFullYear());
  }

  /* ========================================================
     8. RÈGLES DES PRIX, DES PACKS ET DES PROMOTIONS
     ======================================================== */
  function prixOk(a) { return a.statut === 'disponible' && a.prixValide === true && typeof a.prix === 'number' && a.prix >= 0; }
  function aDevis(a) { return a.statut === 'sur-devis'; }
  function commandable(a) { return prixOk(a) || aDevis(a); }

  function trouverArticle(type, id) {
    var liste = type === 'pack' ? CATALOGUE_PACKS : CATALOGUE_SERVICES;
    for (var i = 0; i < liste.length; i++) if (liste[i].id === id) return liste[i];
    return null;
  }

  function prixTexte(a) {
    if (prixOk(a)) return formatMontant(a.prix) + (a.unite && a.unite !== 'pack' ? ' / ' + a.unite : '');
    if (aDevis(a)) return 'Sur devis';
    return 'Prix à confirmer';
  }

  function etatBadgeArticle(a) {
    if (prixOk(a)) return badge('Disponible', 'green');
    if (aDevis(a)) return badge('Sur devis', 'blue');
    if (a.statut === 'disponible') return badge('Prix à confirmer', 'orange');
    if (a.statut === 'a-confirmer') return badge('À confirmer', 'orange');
    if (a.statut === 'en-developpement') return badge('En développement', 'gray');
    if (a.statut === 'a-venir') return badge('À venir', 'gray');
    return badge('En préparation', 'gray');
  }

  // État d'une promotion : etude, incomplete, avenir, active, expiree
  function etatPromo(p) {
    if (p.active !== true) return 'etude';
    var debut = parseDate(p.dateDebut), fin = parseDate(p.dateFin);
    if (!(typeof p.taux === 'number' && p.taux > 0 && p.taux <= 100) || !debut || !fin || fin < debut) return 'incomplete';
    var j = aujourdhui();
    if (j < debut) return 'avenir';
    if (j > fin) return 'expiree';
    return 'active';
  }
  function promosActives() { return PROMOTIONS.filter(function (p) { return etatPromo(p) === 'active'; }); }
  function trouverPromo(id) {
    for (var i = 0; i < PROMOTIONS.length; i++) if (PROMOTIONS[i].id === id) return PROMOTIONS[i];
    return null;
  }
  
  /* ========================================================
     9. PANIER
     On ne mémorise que {type, id, quantite} dans le navigateur.
     Les noms et les prix sont relus dans le catalogue à chaque fois :
     un ancien prix ne peut donc jamais "rester" dans un panier.
     ======================================================== */
  var panier = [];
  var promoChoisie = '';
  var precisions = '';
  var ui = {};   // éléments du panier (rempli par creerPanier)

  function limiterQuantite(q) {
    q = parseInt(q, 10);
    if (isNaN(q) || q < 1) return 1;
    return q > 999 ? 999 : q;
  }

  function chargerPanier() {
    try {
      var brut = window.localStorage.getItem(CONFIG.cleStockage);
      if (!brut) return [];
      var liste = JSON.parse(brut);
      if (!Array.isArray(liste)) return [];
      return liste.filter(function (l) {
        var a = l && trouverArticle(l.type, l.id);
        return a && commandable(a);
      }).map(function (l) { return { type: l.type, id: l.id, quantite: limiterQuantite(l.quantite) }; });
    } catch (e) { return []; }
  }
  function sauverPanier() {
    try { window.localStorage.setItem(CONFIG.cleStockage, JSON.stringify(panier)); } catch (e) { /* stockage indisponible : on continue sans */ }
  }

  function ajouterAuPanier(type, id) {
    var a = trouverArticle(type, id);
    if (!a || !commandable(a)) return;      // sécurité : jamais pour un article non commandable
    var existante = panier.filter(function (l) { return l.type === type && l.id === id; })[0];
    if (existante) existante.quantite = limiterQuantite(existante.quantite + 1);
    else panier.push({ type: type, id: id, quantite: 1 });
    sauverPanier();
    afficherPanier();
    afficherToast(aDevis(a) ? 'Ajouté au panier (à chiffrer) : ' + a.nom : 'Ajouté au panier : ' + a.nom);
  }
  function changerQuantite(type, id, q) {
    panier.forEach(function (l) { if (l.type === type && l.id === id) l.quantite = limiterQuantite(q); });
    sauverPanier(); afficherPanier();
  }
  function retirerDuPanier(type, id) {
    panier = panier.filter(function (l) { return !(l.type === type && l.id === id); });
    sauverPanier(); afficherPanier();
  }
  function viderPanier() {
    panier = []; promoChoisie = '';
    sauverPanier(); afficherPanier();
  }

  // Une ligne à prix fixe est-elle éligible à la promotion p ?
  function ligneEligible(p, ligne) {
    if (ligne.type === 'pack' && p.packsEligibles !== true) return false;
    if (Array.isArray(p.eligibles) && p.eligibles.indexOf(ligne.id) === -1) return false;
    return true;
  }

  // Calcul de tout le panier
  function calculer() {
    var lignes = panier.map(function (l) {
      var a = trouverArticle(l.type, l.id);
      var fixe = prixOk(a);
      return { type: l.type, id: l.id, article: a, quantite: l.quantite, devis: !fixe, sousTotal: fixe ? a.prix * l.quantite : null };
    });
    var fixes = lignes.filter(function (l) { return !l.devis; });
    var devis = lignes.filter(function (l) { return l.devis; });
    var sousTotal = fixes.reduce(function (s, l) { return s + l.sousTotal; }, 0);

    var promo = promoChoisie ? trouverPromo(promoChoisie) : null;
    if (promo && etatPromo(promo) !== 'active') promo = null;

    var reduction = 0, messagePromo = '';
    if (promo) {
      var eligibles = fixes.filter(function (l) { return ligneEligible(promo, l); });
      var base = eligibles.reduce(function (s, l) { return s + l.sousTotal; }, 0);
      if (eligibles.length === 0) messagePromo = 'Aucune ligne de votre panier n’est éligible à cette promotion.';
      else if (base < (promo.minMontant || 0)) messagePromo = 'Montant minimal éligible : ' + formatMontant(promo.minMontant) + '.';
      else if (eligibles.length < (promo.minLignes || 0)) messagePromo = 'Il faut au moins ' + promo.minLignes + ' prestations éligibles.';
      else {
        reduction = Math.round(base * promo.taux / 100);
        if (typeof promo.plafond === 'number' && reduction > promo.plafond) reduction = promo.plafond;
      }
    }
    return { lignes: lignes, fixes: fixes, devis: devis, sousTotal: sousTotal, promo: promo, reduction: reduction, messagePromo: messagePromo, total: sousTotal - reduction };
  }

  function construireMessage(c) {
    var t = [];
    t.push('Bonjour Silver Services,');
    t.push('Je souhaite faire la demande suivante :');
    t.push('');
    if (c.fixes.length) {
      t.push('PRESTATIONS À PRIX DE RÉFÉRENCE :');
      c.fixes.forEach(function (l) {
        var u = l.article.unite && l.article.unite !== 'pack' ? ' ' + l.article.unite + '(s)' : '';
        t.push('- ' + l.article.nom + ' : ' + l.quantite + u + ' x ' + formatMontant(l.article.prix) + ' = ' + formatMontant(l.sousTotal));
      });
      t.push('Sous-total : ' + formatMontant(c.sousTotal));
      if (c.promo && c.reduction > 0) {
        t.push('Promotion « ' + c.promo.nom + ' » (' + c.promo.taux + ' %) : -' + formatMontant(c.reduction));
      }
      t.push('MONTANT ESTIMATIF : ' + formatMontant(c.total));
      t.push('');
    }
    if (c.devis.length) {
      t.push('PRESTATIONS À CHIFFRER (prix à confirmer) :');
      c.devis.forEach(function (l) { t.push('- ' + l.article.nom + ' (quantité : ' + l.quantite + ')'); });
      t.push('');
    }
    if (estTexte(precisions)) { t.push('PRÉCISIONS :'); t.push(precisions.trim()); t.push(''); }
    t.push('Souhaitez-vous un retrait ou souhaitez-vous discuter des possibilités de livraison ?');
    t.push('(Montant estimatif : prix final, délai et disponibilité à confirmer ensemble.)');
    return t.join('\n');
  }
  
  
  /* ---------- Interface du panier ---------- */
  function creerPanier() {
    ui.fab = el('button', { type: 'button', class: 'cart-fab', 'aria-label': 'Ouvrir mon panier' }, [
      'Panier ', ui.compteur = el('span', { class: 'cart-count', text: '0' })
    ]);
    ui.overlay = el('div', { class: 'cart-overlay' });
    ui.lignes = el('div', { id: 'cart-lines' });
    ui.promo = el('div', { class: 'cart-block', id: 'cart-promo' });
    ui.precisions = el('textarea', { id: 'cart-precisions', rows: '3', placeholder: 'Ex. : nombre de pages, délai souhaité, retrait ou livraison…' });
    ui.resume = el('div', { id: 'cart-summary' });
    ui.envoyer = el('button', { type: 'button', class: 'btn btn-whatsapp' }, ['Envoyer ma demande sur WhatsApp']);
    ui.vider = el('button', { type: 'button', class: 'btn btn-ghost btn-small' }, ['Vider le panier']);
    ui.fermer = el('button', { type: 'button', class: 'cart-close', 'aria-label': 'Fermer le panier' }, ['×']);

    ui.panneau = el('aside', { class: 'cart-panel', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'cart-title', tabindex: '-1' }, [
      el('div', { class: 'cart-head' }, [el('h2', { id: 'cart-title', text: 'Mon panier' }), ui.fermer]),
      el('div', { class: 'cart-body' }, [
        ui.lignes, ui.promo,
        el('div', { class: 'cart-block' }, [el('label', { for: 'cart-precisions', text: 'Précisions sur votre demande (facultatif)' }), ui.precisions])
      ]),
      el('div', { class: 'cart-foot' }, [
        ui.resume,
        el('div', { class: 'cart-actions' }, [ui.envoyer, ui.vider]),
        el('p', { class: 'cart-hint', text: 'WhatsApp s’ouvre avec un message prêt : relisez-le puis envoyez-le vous-même. Votre demande n’est transmise qu’à ce moment-là. Aucun paiement n’est fait sur ce site.' })
      ])
    ]);
    ui.toast = el('div', { class: 'toast', role: 'status', 'aria-live': 'polite', hidden: true });

    document.body.appendChild(ui.fab);
    document.body.appendChild(ui.overlay);
    document.body.appendChild(ui.panneau);
    document.body.appendChild(ui.toast);

    ui.fab.addEventListener('click', ouvrirPanier);
    ui.overlay.addEventListener('click', fermerPanier);
    ui.fermer.addEventListener('click', fermerPanier);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fermerPanier(); });
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-open-cart]');
      if (b) { e.preventDefault(); ouvrirPanier(); }
    });
    ui.precisions.addEventListener('input', function () { precisions = ui.precisions.value; });
    ui.vider.addEventListener('click', function () {
      if (panier.length && window.confirm('Vider tout le panier ?')) viderPanier();
    });
    ui.envoyer.addEventListener('click', function () {
      if (!panier.length) return;
      ouvrirWhatsApp(construireMessage(calculer()));
    });
  }

  var dernierFocus = null;
  function ouvrirPanier() {
    dernierFocus = document.activeElement;
    afficherPanier();
    ui.overlay.classList.add('is-open');
    ui.panneau.classList.add('is-open');
    document.body.classList.add('cart-open');
    ui.panneau.focus();
  }
  function fermerPanier() {
    if (!ui.panneau || !ui.panneau.classList.contains('is-open')) return;
    ui.overlay.classList.remove('is-open');
    ui.panneau.classList.remove('is-open');
    document.body.classList.remove('cart-open');
    if (dernierFocus && dernierFocus.focus) dernierFocus.focus();
  }

  var minuteurToast = null;
  function afficherToast(msg) {
    ui.toast.textContent = msg;
    ui.toast.hidden = false;
    clearTimeout(minuteurToast);
    minuteurToast = setTimeout(function () { ui.toast.hidden = true; }, 2600);
  }

  function ligneDuPanier(l) {
    var a = l.article;
    var champ = el('input', { type: 'number', min: '1', max: '999', value: String(l.quantite), 'aria-label': 'Quantité : ' + a.nom });
    champ.addEventListener('change', function () { changerQuantite(l.type, l.id, champ.value); });
    var prix = l.devis
      ? el('div', { class: 'cart-line-price is-quote', text: 'Prix à confirmer' })
      : el('div', { class: 'cart-line-price', text: l.quantite + ' × ' + formatMontant(a.prix) + ' = ' + formatMontant(l.sousTotal) });
    return el('div', { class: 'cart-line' }, [
      el('div', { class: 'cart-line-top' }, [
        el('div', {}, [el('div', { class: 'cart-line-name', text: a.nom }), l.devis ? badge('À chiffrer', 'orange') : null]),
        el('button', { type: 'button', class: 'cart-remove', 'aria-label': 'Retirer ' + a.nom, onclick: function () { retirerDuPanier(l.type, l.id); } }, ['🗑'])
      ]),
      el('div', { class: 'cart-line-bottom' }, [
        el('div', { class: 'qty' }, [
          el('button', { type: 'button', 'aria-label': 'Diminuer la quantité', onclick: function () { changerQuantite(l.type, l.id, l.quantite - 1); } }, ['−']),
          champ,
          el('button', { type: 'button', 'aria-label': 'Augmenter la quantité', onclick: function () { changerQuantite(l.type, l.id, l.quantite + 1); } }, ['+'])
        ]),
        prix
      ])
    ]);
  }

  function ligneResume(libelle, valeur, classe) {
    return el('div', { class: 'cart-summary-row' + (classe ? ' ' + classe : '') }, [el('span', { text: libelle }), el('span', { text: valeur })]);
  }

  function afficherPanier() {
    if (!ui.lignes) return;
    
    // Si la promotion choisie n'est plus valable, on l'enlève
    if (promoChoisie) {
      var pc = trouverPromo(promoChoisie);
      if (!pc || etatPromo(pc) !== 'active') promoChoisie = '';
    }
    var c = calculer();
    var nb = panier.reduce(function (s, l) { return s + l.quantite; }, 0);
    ui.compteur.textContent = String(nb);
    ui.fab.setAttribute('aria-label', 'Ouvrir mon panier (' + nb + ' article' + (nb > 1 ? 's' : '') + ')');

    // Lignes
    ui.lignes.textContent = '';
    if (!c.lignes.length) {
      ui.lignes.appendChild(el('p', { class: 'cart-empty', text: 'Votre panier est vide. Ajoutez des prestations ou des packs depuis les pages Services et Packs & Offres.' }));
    }
    c.lignes.forEach(function (l) { ui.lignes.appendChild(ligneDuPanier(l)); });

    // Promotions (seulement si une promotion valide existe)
    ui.promo.textContent = '';
    var actives = promosActives();
    if (!actives.length) {
      ui.promo.appendChild(el('p', { class: 'cart-hint', text: 'Aucune promotion active pour le moment.' }));
    } else {
      var select = el('select', { id: 'cart-promo-select' }, [el('option', { value: '', text: 'Aucune promotion' })]);
      actives.forEach(function (p) { select.appendChild(el('option', { value: p.id, text: p.nom + ' (' + p.taux + ' %)' })); });
      select.value = promoChoisie;
      select.addEventListener('change', function () { promoChoisie = select.value; afficherPanier(); });
      ui.promo.appendChild(el('label', { for: 'cart-promo-select', text: 'Promotion (une seule par commande)' }));
      ui.promo.appendChild(select);
      if (c.promo) {
        ui.promo.appendChild(el('p', { class: 'cart-hint', text: 'Valable du ' + formatDate(c.promo.dateDebut) + ' au ' + formatDate(c.promo.dateFin) + '. ' + (c.promo.conditions || '') }));
      }
      if (c.messagePromo) ui.promo.appendChild(el('p', { class: 'cart-hint', text: c.messagePromo }));
    }

    // Résumé
    ui.resume.textContent = '';
    if (c.lignes.length) {
      var boite = el('div', { class: 'cart-summary' });
      if (c.fixes.length) {
        boite.appendChild(ligneResume('Prestations à prix fixe', formatMontant(c.sousTotal)));
        if (c.reduction > 0) boite.appendChild(ligneResume('Réduction (' + c.promo.nom + ')', '− ' + formatMontant(c.reduction), 'is-discount'));
        boite.appendChild(ligneResume('Montant estimatif', formatMontant(c.total), 'is-total'));
      } else {
        boite.appendChild(ligneResume('Montant estimatif', 'À confirmer', 'is-total'));
      }
      if (c.devis.length) {
        boite.appendChild(el('p', { class: 'cart-hint', text: 'À chiffrer, non inclus dans le montant :' }));
        var ul = el('ul', { class: 'cart-quote-list' });
        c.devis.forEach(function (l) { ul.appendChild(el('li', { text: l.article.nom + ' (× ' + l.quantite + ')' })); });
        boite.appendChild(ul);
      }
      boite.appendChild(el('p', { class: 'cart-hint', text: 'Montant estimatif : le prix final, le délai et les modalités de retrait ou de livraison sont confirmés sur WhatsApp.' }));
      ui.resume.appendChild(boite);
    }

    ui.envoyer.disabled = !c.lignes.length;
    ui.vider.disabled = !c.lignes.length;
    if (ui.precisions.value !== precisions) ui.precisions.value = precisions;
  }
   
   
   /* ========================================================
     10. CARTES DES SERVICES, DES PACKS ET DES PROMOTIONS
     ======================================================== */
  function boutonAction(type, a) {
    if (prixOk(a)) {
      return el('button', { type: 'button', class: 'btn btn-primary btn-small', onclick: function () { ajouterAuPanier(type, a.id); } }, ['Ajouter au panier']);
    }
    if (aDevis(a)) {
      return el('button', { type: 'button', class: 'btn btn-secondary btn-small', onclick: function () { ajouterAuPanier(type, a.id); } }, ['Demander un devis']);
    }
    var msg = 'Bonjour Silver Services, je souhaite des informations sur : ' + a.nom + '.';
    return el('a', { class: 'btn btn-ghost btn-small', href: lienWhatsApp(msg), target: '_blank', rel: 'noopener' }, ['Demander des informations']);
  }

  function carteService(a) {
    return el('article', { class: 'card service-card' }, [
      el('div', { class: 'card-top' }, [etatBadgeArticle(a)]),
      el('h3', { text: a.nom }),
      el('p', { text: a.description }),
      el('p', { class: 'price ' + (prixOk(a) ? 'price-ok' : 'price-none'), text: prixTexte(a) }),
      boutonAction('service', a)
    ]);
  }

  function cartePack(a) {
    var publics = a.publics.map(function (p) { return LIB.publics[p] || p; }).join(', ');
    var puces = el('ul', { class: 'list-check' });
    a.inclus.forEach(function (i) { puces.appendChild(el('li', { text: i })); });
    return el('article', { class: 'card service-card' }, [
      el('div', { class: 'card-top' }, [etatBadgeArticle(a)]),
      el('h3', { text: a.nom }),
      el('p', { class: 'pack-publics', text: 'Pour : ' + publics }),
      el('p', { text: a.description }),
      el('p', { class: 'pack-section', text: 'Contenu inclus' }),
      puces,
      el('p', { class: 'pack-section', text: 'Limites et conditions' }),
      el('p', { class: 'note', text: a.limites + ' Tout élément non listé n’est pas inclus : un supplément éventuel est indiqué et accepté avant validation.' }),
      el('p', { class: 'price ' + (prixOk(a) ? 'price-ok' : 'price-none'), text: prixTexte(a) }),
      boutonAction('pack', a)
    ]);
  }

  function cartePromo(p) {
    var etat = etatPromo(p);
    var etiquettes = {
      etude: ['En étude : non active', 'gray'], incomplete: ['Non active', 'gray'],
      avenir: ['À venir', 'blue'], active: ['Active', 'green'], expiree: ['Expirée', 'gray']
    };
    var e = etiquettes[etat];
    var corps = [
      el('div', { class: 'card-top' }, [badge(e[0], e[1])]),
      el('h3', { text: p.nom }),
      el('p', { class: 'pack-publics', text: 'Public : ' + p.public })
    ];
    if (etat === 'active' || etat === 'avenir') {
      corps.push(el('p', { class: 'price price-ok', text: 'Réduction de ' + p.taux + ' %' }));
      corps.push(el('p', { class: 'note', text: 'Du ' + formatDate(p.dateDebut) + ' au ' + formatDate(p.dateFin) + '.' }));
    } else {
      corps.push(el('p', { class: 'note', text: 'Cette offre est envisagée mais n’est pas lancée. Aucune réduction n’est appliquée.' }));
    }
    corps.push(el('p', { class: 'note', text: 'Conditions : ' + (p.conditions || 'à définir') + ' Une seule promotion par commande, non cumulable.' }));
    return el('article', { class: 'card promo-card' }, corps);
  }
  
  
  /* ========================================================
     11. OPPORTUNITÉS, ACTUALITÉS, AGENDA, RESSOURCES
     Les données viennent des fichiers du dossier data/.
     Un élément incomplet est ignoré (et signalé dans la console du navigateur).
     ======================================================== */
  function statutAvecVerification(item, valides) {
    var s = valides.indexOf(item.statut) !== -1 ? item.statut : 'a-verifier';
    // « Vérifié » sans date de vérification n'est pas crédible : on repasse en « À vérifier »
    if (s === 'verifie' && !parseDate(item.dateVerification)) s = 'a-verifier';
    return s;
  }
  function indexTexte(item) {
    var morceaux = [];
    Object.keys(item).forEach(function (k) {
      var v = item[k];
      if (typeof v === 'string') morceaux.push(v);
      else if (Array.isArray(v)) morceaux.push(v.join(' '));
    });
    return normaliser(morceaux.join(' '));
  }
  function avertir(nom, item, raison) {
    if (window.console && console.warn) console.warn('[Silver Corporate] ' + nom + ' ignoré(e) (' + raison + ') :', item && (item.titre || item));
  }

  function preparerOpportunite(o) {
    if (!o || !estTexte(o.titre) || !estTexte(o.organisme) || !lienSur(o.lien)) { avertir('Opportunité', o, 'titre, organisme ou lien officiel manquant'); return null; }
    var s = statutAvecVerification(o, ['verifie', 'a-verifier', 'cloture']);
    var limite = parseDate(o.dateLimite);
    if (s !== 'cloture' && limite && limite < aujourdhui()) s = 'cloture';   // clôture automatique
    var copie = Object.assign({}, o);
    copie._statut = s; copie._limite = limite;
    copie._texte = indexTexte(o);
    return copie;
  }
  function preparerActualite(a) {
    if (!a || !estTexte(a.titre) || !estTexte(a.resume) || !estTexte(a.source) || !lienSur(a.lien) || !parseDate(a.datePublication)) {
      avertir('Actualité', a, 'titre, résumé, source, lien ou date de publication manquant'); return null;
    }
    var copie = Object.assign({}, a);
    copie._statut = statutAvecVerification(a, ['verifie', 'a-verifier']);
    copie._texte = indexTexte(a);
    return copie;
  }
  function preparerEvenement(e) {
    if (!e || !estTexte(e.titre) || !parseDate(e.date)) { avertir('Événement', e, 'titre ou date manquant'); return null; }
    var s = ['confirme', 'a-verifier', 'termine'].indexOf(e.statut) !== -1 ? e.statut : 'a-verifier';
    var fin = parseDate(e.dateFin) || parseDate(e.date);
    if (s !== 'termine' && fin < aujourdhui()) s = 'termine';               // terminé automatiquement
    var copie = Object.assign({}, e);
    copie._statut = s; copie._fin = fin;
    copie._texte = indexTexte(e);
    return copie;
  }
  function preparerRessource(r) {
    if (!r || !estTexte(r.titre) || !estTexte(r.description) || !lienSur(r.lien)) { avertir('Ressource', r, 'titre, description ou lien manquant'); return null; }
    var copie = Object.assign({}, r);
    copie._statut = statutAvecVerification(r, ['verifie', 'a-verifier']);
    copie._texte = indexTexte(r);
    return copie;
  }

  function infos(lignes) {
    var dl = el('dl', { class: 'item-infos' });
    lignes.forEach(function (l) {
      if (!estTexte(l[1])) return;
      dl.appendChild(el('dt', { text: l[0] }));
      dl.appendChild(el('dd', { text: l[1] }));
    });
    return dl;
  }
  function boutonSource(lien, libelle) {
    return el('a', { class: 'btn btn-primary btn-small', href: lien.trim(), target: '_blank', rel: 'noopener noreferrer' }, [libelle + ' ↗']);
  }
  function badgeVerification(s, mots) {
    if (s === 'verifie') return badge(mots.verifie, 'green');
    if (s === 'a-verifier') return badge('⚠ À vérifier', 'orange');
    return badge(mots.fin, 'gray');
  }

  function carteOpportunite(o) {
    var s = o._statut;
    return el('article', { class: 'card item-card status-' + s }, [
      el('div', { class: 'card-top' }, [
        badgeVerification(s, { verifie: '✔ Vérifié', fin: '✖ Clôturé' }),
        o.categorie ? badge(LIB.categoriesOpp[o.categorie] || o.categorie, 'blue') : null,
        o.zone ? badge(LIB.zonesOpp[o.zone] || o.zone, 'gray') : null
      ]),
      el('h3', { text: o.titre }),
      el('p', { class: 'item-org', text: o.organisme }),
      estTexte(o.description) ? el('p', { text: o.description }) : null,
      infos([
        ['Public cible', o.public],
        ['Localisation', o.localisation],
        ['Date limite', o._limite ? formatDate(o.dateLimite) : 'Non précisée'],
        ['Publiée le', formatDate(o.datePublication)],
        ['Vérifiée le', parseDate(o.dateVerification) ? formatDate(o.dateVerification) : 'Pas encore vérifiée'],
        ['Source', o.source || o.organisme]
      ]),
      s === 'a-verifier' ? el('p', { class: 'item-warning', text: 'À vérifier : consultez la source officielle avant de candidater.' }) : null,
      boutonSource(o.lien, s === 'cloture' ? 'Consulter la source' : 'Voir la source officielle')
    ]);
  }

  function carteActualite(a) {
    var s = a._statut;
    return el('article', { class: 'card item-card status-' + s }, [
      el('div', { class: 'card-top' }, [
        badgeVerification(s, { verifie: '✔ Vérifié', fin: '' }),
                (a.etiquette || a.rubrique) ? badge(a.etiquette || LIB.rubriques[a.rubrique] || a.rubrique, 'blue') : null,
        a.zone ? badge(LIB.zonesAct[a.zone] || a.zone, 'gray') : null
      ]),
      el('h3', { text: a.titre }),
      el('p', { text: a.resume }),
      infos([
        ['Publié le', formatDate(a.datePublication)],
        ['Source', a.source],
        ['Vérifié le', parseDate(a.dateVerification) ? formatDate(a.dateVerification) : '']
      ]),
      s === 'a-verifier' ? el('p', { class: 'item-warning', text: 'À vérifier : information non confirmée. Consultez la source.' }) : null,
            boutonSource(a.lien, 'Lire la source originale')
    ]);
  }

  function carteEvenement(e) {
    var s = e._statut;
    var quand = formatDate(e.date) + (parseDate(e.dateFin) && e.dateFin !== e.date ? ' au ' + formatDate(e.dateFin) : '') + (estTexte(e.heure) ? ' à ' + e.heure : '');
    var action;
    if (s === 'termine') action = el('p', { class: 'note', text: 'Cet événement est terminé.' });
    else if (lienSur(e.lien)) action = boutonSource(e.lien, 'S’inscrire (site de l’organisateur)');
    else if (e.inscriptionWhatsapp === true) {
      action = el('a', { class: 'btn btn-whatsapp btn-small', target: '_blank', rel: 'noopener', href: lienWhatsApp('Bonjour, je souhaite m’inscrire à : ' + e.titre + ' (' + formatDate(e.date) + ').') }, ['S’inscrire sur WhatsApp']);
    } else action = el('p', { class: 'note', text: 'Lien d’inscription non précisé.' });

    return el('article', { class: 'card item-card status-' + s }, [
      el('div', { class: 'card-top' }, [
        badgeVerification(s, { verifie: '✔ Confirmé', fin: '✖ Terminé' }),
        e.type ? badge(LIB.typesAgenda[e.type] || e.type, 'blue') : null,
        e.format ? badge(LIB.formats[e.format] || e.format, 'gray') : null
      ]),
      el('h3', { text: e.titre }),
      estTexte(e.description) ? el('p', { text: e.description }) : null,
      infos([
        ['Date', quand],
        ['Lieu', e.lieu],
        ['Organisateur', e.organisateur],
        ['Conditions', e.conditions],
        ['Vérifié le', parseDate(e.dateVerification) ? formatDate(e.dateVerification) : '']
      ]),
      s === 'a-verifier' ? el('p', { class: 'item-warning', text: 'À vérifier : date ou conditions à confirmer auprès de l’organisateur.' }) : null,
      action
    ]);
  }

  function carteRessource(r) {
    var s = r._statut;
    return el('article', { class: 'card item-card status-' + s }, [
      el('div', { class: 'card-top' }, [
        badgeVerification(s, { verifie: '✔ Vérifié', fin: '' }),
        r.theme ? badge(LIB.themes[r.theme] || r.theme, 'blue') : null,
        r.type ? badge(LIB.typesRes[r.type] || r.type, 'gray') : null
      ]),
      el('h3', { text: r.titre }),
      el('p', { text: r.description }),
      infos([
        ['Source', r.source],
        ['Langue', r.langue],
        ['Vérifiée le', parseDate(r.dateVerification) ? formatDate(r.dateVerification) : '']
      ]),
      s === 'a-verifier' ? el('p', { class: 'item-warning', text: 'À vérifier : lien ou contenu à confirmer.' }) : null,
      boutonSource(r.lien, 'Ouvrir la ressource')
    ]);
  }
  
  /* ---------- Description de chaque type de liste ---------- */
  var SOURCES = {
    packs:        { donnees: function () { return CATALOGUE_PACKS; },  preparer: function (x) { return x; }, carte: cartePack, vide: 'Aucun pack disponible pour le moment.' },
    promotions:   { donnees: function () { return PROMOTIONS; },       preparer: function (x) { return x; }, carte: cartePromo, vide: 'Aucune promotion pour le moment.' },
    opportunites: { donnees: function () { return window.OPPORTUNITES; }, preparer: preparerOpportunite, carte: carteOpportunite, vide: 'Aucune annonce publiée pour le moment.',
      trier: function (a, b) {
        var ca = a._statut === 'cloture', cb = b._statut === 'cloture';
        if (ca !== cb) return ca ? 1 : -1;
        if (a._limite && b._limite) return a._limite - b._limite;
        return a._limite ? -1 : (b._limite ? 1 : 0);
      } },
    actualites:   { donnees: function () { return window.ACTUALITES; }, preparer: preparerActualite, carte: carteActualite, vide: 'Aucune actualité publiée pour le moment.',
      trier: function (a, b) { return parseDate(b.datePublication) - parseDate(a.datePublication); } },
    agenda:       { donnees: function () { return window.AGENDA; }, preparer: preparerEvenement, carte: carteEvenement, vide: 'Aucun événement publié pour le moment.',
      trier: function (a, b) {
        var ta = a._statut === 'termine', tb = b._statut === 'termine';
        if (ta !== tb) return ta ? 1 : -1;
        return ta ? parseDate(b.date) - parseDate(a.date) : parseDate(a.date) - parseDate(b.date);
      } },
    ressources:   { donnees: function () { return window.RESSOURCES; }, preparer: preparerRessource, carte: carteRessource, vide: 'Aucune ressource publiée pour le moment.' }
  };

  var ETATS = {};   // pour chaque type : { items, filtres }

  function champFiltre(item, cle) {
    if (cle === 'statut') return item._statut;
    if (cle === 'public') return item.publics;
    return item[cle];
  }
  function correspond(item, filtres) {
    return Object.keys(filtres).every(function (cle) {
      var v = filtres[cle];
      if (!v) return true;
      if (cle === 'q') return item._texte ? item._texte.indexOf(normaliser(v.trim())) !== -1 : true;
      var champ = champFiltre(item, cle);
      return Array.isArray(champ) ? champ.indexOf(v) !== -1 : champ === v;
    });
  }

  function afficherListe(conteneur) {
    var type = conteneur.getAttribute('data-type');
    var src = SOURCES[type], etat = ETATS[type];
    if (!src || !etat) return;
    var visibles = etat.items.filter(function (i) { return correspond(i, etat.filtres); });

    conteneur.textContent = '';
    if (!etat.items.length) conteneur.appendChild(el('p', { class: 'empty-state', text: src.vide }));
    else if (!visibles.length) conteneur.appendChild(el('p', { class: 'empty-state', text: 'Aucun résultat pour ces filtres.' }));
    else visibles.forEach(function (i) { conteneur.appendChild(src.carte(i)); });

    var compteur = document.querySelector('[data-count-for="' + type + '"]');
    if (compteur) {
      compteur.textContent = etat.items.length ? visibles.length + ' résultat' + (visibles.length > 1 ? 's' : '') + ' sur ' + etat.items.length : '';
    }
  }
  
  function initListes() {
    var conteneurs = document.querySelectorAll('.data-list[data-type]');
    Array.prototype.forEach.call(conteneurs, function (conteneur) {
      var type = conteneur.getAttribute('data-type');
      var src = SOURCES[type];
      if (!src) return;
      var brut = src.donnees();
      if (!Array.isArray(brut)) brut = [];
      var items = brut.map(src.preparer).filter(function (x) { return x; });
      if (src.trier) items.sort(src.trier);
      ETATS[type] = { items: items, filtres: {} };
      
   // Branche les filtres de cette liste
      var champs = document.querySelectorAll('[data-filter][data-target="' + type + '"]');
      Array.prototype.forEach.call(champs, function (champ) {
        var evenement = champ.tagName === 'SELECT' ? 'change' : 'input';
        champ.addEventListener(evenement, function () {
          ETATS[type].filtres[champ.getAttribute('data-filter')] = champ.value;
          afficherListe(conteneur);
        });
      });
      var reset = document.querySelector('[data-reset-filters][data-target="' + type + '"]');
      if (reset) reset.addEventListener('click', function () {
        ETATS[type].filtres = {};
        Array.prototype.forEach.call(champs, function (champ) { champ.value = ''; });
        afficherListe(conteneur);
      });
      afficherListe(conteneur);
    });
  }

  /* ---------- Catalogue des services (page services.html) ---------- */
  function initServices() {
    var zones = document.querySelectorAll('.service-list[data-categorie]');
    Array.prototype.forEach.call(zones, function (zone) {
      var cat = zone.getAttribute('data-categorie');
      zone.textContent = '';
      CATALOGUE_SERVICES.filter(function (a) { return a.categorie === cat; })
        .forEach(function (a) { zone.appendChild(carteService(a)); });
    });
  }
  
  /* ========================================================
     12. FORMULAIRE DE CONTACT (prépare un message, n'envoie rien tout seul)
     ======================================================== */
  function initContact() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var erreur = document.getElementById('contact-error');
    var champMessage = document.getElementById('contact-message');

    function lireMessage() {
      var nom = document.getElementById('contact-name').value.trim();
      var objet = document.getElementById('contact-subject').value;
      var message = champMessage.value.trim();
      if (!message) {
        erreur.hidden = false;
        champMessage.focus();
        return null;
      }
      erreur.hidden = true;
      return { objet: objet, texte: 'Bonjour Silver Corporate,\n' + (nom ? 'Je m’appelle ' + nom + '.\n' : '') + 'Objet : ' + objet + '\n\n' + message };
    }
    form.addEventListener('click', function (e) {
      var b = e.target.closest('[data-action]');
      if (!b) return;
      var contenu = lireMessage();
      if (!contenu) return;
      if (b.getAttribute('data-action') === 'contact-whatsapp') {
        ouvrirWhatsApp(contenu.texte);
      } else {
        window.location.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent(contenu.objet) + '&body=' + encodeURIComponent(contenu.texte);
      }
    });
    champMessage.addEventListener('input', function () { if (champMessage.value.trim()) erreur.hidden = true; });
  }
      
  
  /* ========================================================
     13. DÉMARRAGE
     ======================================================== */
  function demarrer() {
    initMenu();
    initAnnee();
    panier = chargerPanier();
    creerPanier();
    afficherPanier();
    initServices();
    initListes();
    initContact();
  }
  demarrer();
})();
