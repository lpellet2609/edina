# HANDOFF — Projet mémorial Edina

> **Lecture en cascade** :
> - **Ce fichier (HANDOFF.md)** : à charger au démarrage. Statut, architecture, backlog, pièges.
> - **HANDOFF-ARCHIVE/** : un fichier par track terminé. À consulter **uniquement** pour un
>   bug ancien ou une question historique (« comment c'était fait à l'époque »).
> - **~/.claude/INTER-PROJETS.md** : à consulter **uniquement** si impact sur un autre projet.

---

## Statut actuel (2026-06-06)

✅ Site en ligne sur les 2 domaines custom (HTTPS) : https://edinakoszmovszky.com (principal),
https://koszmovszkyedina.com (redirection 301).
✅ La **cérémonie du 3 juin est passée**. Le site reste en ligne comme mémorial pérenne.
✅ Pages : Accueil, Hommages, Revue de presse, **Textes de la cérémonie**, Album — toutes bilingues FR/HU.
✅ **Nouveau ce jour** : la page **Album** accepte les **photos envoyées par les visiteurs**
(via Cloudinary), avec **modération par Laurent** (rien n'est public sans validation).
✅ Veille presse Google Alerts active. Données invités protégées (`data/invites-*` gitignored).

➡️ **Pas de prochain track planifié.** Le site est en mode « maintenance / au fil de l'eau » :
modération des photos de l'album + éventuelles retouches ponctuelles.

---

## Architecture

- **Stack** : HTML/CSS/JS statique, multi-pages, hébergé sur **GitHub Pages** (repo `lpellet2609/edina`, branche `main`).
- **Déploiement** : push sur `main` → GitHub Pages déploie en 1-2 min. En cas de bug : `git revert <sha>`.
- **Bilingue** : `html[lang]` + attributs `data-lang="fr"|"hu"`, switch via boutons + `localStorage`.
- **Pages** : `index.html` (accueil), `hommages.html`, `articles.html` (revue de presse),
  textes de la cérémonie, `album.html`, `repas.html` (protégée par code « Budapest »).
- **Domaines** : achetés chez Porkbun (lpellet@gmail.com), renouvellement 2027-05-25. Fichier
  `CNAME` à la racine = ne pas supprimer.

### Album photos — Cloudinary (depuis 2026-06-06)
- **Upload** : widget Cloudinary sur `album.html`, bouton « Ajouter une photo » (sans compte, Android + iPhone).
- **Stockage** : compte Cloudinary, **Cloud name `duiehxhw3`**, dossier `souvenirs-edina`.
- **Upload preset** : `souvenirs_edina` (mode **Unsigned**). « Resource list » décoché côté Security.
- **Modération** : une photo n'apparaît sur le site **que si elle porte l'étiquette `album-public`**.
  Ajout via console Cloudinary → Assets → photo → ··· → Edit Tags. Refus = pas d'étiquette / supprimer.
- **Affichage** : la galerie lit `https://res.cloudinary.com/duiehxhw3/image/list/album-public.json`.
- **Modération iPhone** : console Cloudinary dans Safari + « Sur l'écran d'accueil » (icône type appli).
- **Lien favori modération** :
  `https://console.cloudinary.com/app/c-96d931e4343783b892d73018ee52b4/assets/media_library/folders/cf4e8156bc094aaf0217d0af02c9617d1f?view_mode=mosaic`
- ⚠️ **API Key / Secret Cloudinary = jamais dans le code public.** Le montage n'en a pas besoin.

---

## Pièges connus (à NE PAS reproduire)

- **Guillemets HU** : toujours `„…”` (U+201E + U+201D), JAMAIS le `"` ASCII comme fermant
  → casse le JavaScript et vide la page. Vérifier avec `node -e "new Function(blocJS)"` avant push.
- **Croix ✝** : rendue en mode texte (U+FE0E) sinon emoji violet sur iOS.
- **Données invités** (`data/invites-*`) : gitignorées suite à un audit RGPD (le `.xlsx` avait fuité
  publiquement). Ne jamais les pousser.
- **Lire le CLAUDE.md à fond avant de toucher au repo** (un détour initial avait failli créer un repo parallèle).
- **GitHub Pages outage** : si un push ne se déploie pas, vérifier `githubstatus.com` puis pousser un commit « réveil ».

---

## Tracks terminés (détail dans HANDOFF-ARCHIVE/)

- **2026-06-06 — Album : photos par les visiteurs (Cloudinary)** : upload public + galerie « Souvenirs »
  modérée par étiquette `album-public`, sans serveur. Configuré, testé en réel, en ligne.
  → `HANDOFF-ARCHIVE/2026-06-06-album-photos-cloudinary.md`
- **~2026-06 — Textes de la cérémonie bilingue** : page ajoutée (onglet « Textes de la cérémonie »).
  Détail non consigné (session intermédiaire). → `HANDOFF-ARCHIVE/2026-06-xx-feuille-de-messe.md`
- **2026-05-30 — Articles HU, Fleurs & couronnes, nettoyage RSVP** : titres FR/HU inversés, résumés
  masqués en HU, section fleuristes, RSVP clôturé, données invités protégées.
  → `HANDOFF-ARCHIVE/2026-05-30-articles-hu-fleurs-rsvp.md`
- **2026-05-27 — Page Réception (`repas.html`)** : infos déjeuner, taxis/parking/navette, alerte alcool,
  2 groupes WhatsApp (FR + HU), contacts. → `HANDOFF-ARCHIVE/2026-05-27-reception-repas.md`
- **2026-05-26 — Hommages, Articles, Album, Veille presse** : 38 hommages bilingues, 10 articles + vidéos,
  album (structure), téléchargements PDF/JPG, 3 Google Alerts. → `HANDOFF-ARCHIVE/2026-05-26-hommages-articles-album-veille.md`
- **2026-05-25 — Noms de domaine custom** : Porkbun → GitHub Pages (A records, CNAME, redirection 301, TLS).
  → `HANDOFF-ARCHIVE/2026-05-25-domaines-custom.md`

---

## Backlog (reporté)

- **Page de validation photos sur-mesure (mobile)** : si la modération via la console Cloudinary
  sur iPhone s'avère trop pénible, construire une page protégée avec gros boutons Publier/Refuser.
  Nécessite un petit relais sécurisé (serverless) pour protéger la clé API Cloudinary. ~30-45 min.
- **Mur de messages en direct** : proposé puis dismissed (Firebase / Google Form / Telegram).
  Le bandeau « Messages de dernière minute » sur l'accueil (édition HTML directe) suffit pour l'instant.
- **Transcription en direct de la messe** : abandonnée (trop fragile). Architecture décrite dans
  l'ancien CLAUDE.md / archive. Comptes : AssemblyAI ✅, Railway ✅, DeepL ❌ (jamais créé).
