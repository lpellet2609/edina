# CLAUDE.md — Projet mémorial Edina

## Lecture des fichiers (cascade)
- **HANDOFF.md** : charger automatiquement au démarrage (statut, architecture, backlog, pièges).
- **HANDOFF-ARCHIVE/** : un fichier par track terminé — consulter **uniquement** en cas de bug ancien ou question historique.
- **~/.claude/INTER-PROJETS.md** : consulter **uniquement** si impact sur un autre projet.

## Le site

Site mémorial pour **Koszmovszky Edina Franciska** (1938–2026), hébergé sur GitHub Pages.

- **URL principale** : https://edinakoszmovszky.com (custom domain, HTTPS actif)
- **URL alternative** : https://koszmovszkyedina.com (redirige en 301 vers la principale)
- **URL technique** : https://lpellet2609.github.io/edina/
- **Repo** : `lpellet2609/edina` (branche `main`)
- **Stack** : HTML/CSS/JS statique, multi-pages (index, hommages, articles, album, repas)
- **Langues** : français et hongrois, gérées par `html[lang]` + attributs `data-lang`

## Configuration domaines (Porkbun + GitHub Pages)

Les deux domaines sont achetés chez **Porkbun** (compte lpellet@gmail.com), renouvellement 2027-05-25.

**`edinakoszmovszky.com`** — domaine principal, pointe vers GitHub Pages :
- 4 enregistrements A (host vide) → `185.199.108.153`, `109.153`, `110.153`, `111.153`
- 1 CNAME `www` → `lpellet2609.github.io`
- MX, SPF et 2 TXT `_acme-challenge` conservés
- Fichier `CNAME` automatiquement créé à la racine du repo GitHub (ne pas supprimer)

**`koszmovszkyedina.com`** — redirection 301 Permanent vers `https://edinakoszmovszky.com` via Porkbun URL Forwarding.

**Côté GitHub** : Settings → Pages → Custom domain = `edinakoszmovszky.com`, DNS check successful, certificat TLS actif.

## Structure des fichiers

```
index.html       — accueil (faire-part, cérémonies, infos pratiques, plan)
hommages.html    — 38 hommages bilingues + formulaire mailto pour en envoyer
articles.html    — revue de presse (10 articles + 3 vidéos)
communiques.html — communiqués officiels (rubrique de NIVEAU 1, menu du haut, entre
                   « Le 3 juin » et « Revue de presse ») : lettre Ambassade de
                   Hongrie (texte + PDF dans documents/), vidéo Parlement calée 6:31:15→6:37:54
                   (params YouTube start/end + cc), transcription FR/HU dépliable des 2
                   discours (Máté Zsuzsanna KDNP + Bóka Zsolt Tisza), communiqué NÖRI. Bilingue.
album.html       — album souvenirs : photos déposées par les visiteurs via Cloudinary,
                   modérées par étiquette "album-public" (galerie unique "Souvenirs")
repas.html       — page protégée par code "Budapest" pour les invités au déjeuner
                   ✅ Contenu complet bilingue (Bistro Budapest, horaires, accès,
                      taxis, parking, alerte alcool, WhatsApp, contacts)
data/
  hommages-raw.json          — texte brut des hommages scrapés sur Inmemori (tracké)
  invites-inmemori.csv       — 33 invités Inmemori (nom, email, statut)        ⚠️ LOCAL ONLY
  invites-inmemori.xlsx      — version Excel avec colonnes "Contacté" et "Notes" ⚠️ LOCAL ONLY
  invites-emails-bcc.txt     — emails séparés par virgules pour envoi groupé   ⚠️ LOCAL ONLY
                                ⚠️ Les 3 fichiers invites-* sont gitignored (data/invites-*)
                                   suite à un audit RGPD le 30 mai : ils ne doivent JAMAIS
                                   être poussés (données personnelles : nom, email, tel).
images/
  hommages/                  — photos jointes aux hommages (≈30)
  articles/                  — vignettes presse
  videos/                    — vignettes YouTube
  album/                     — sous-dossiers messe/, inhumation/, reception/ (vides)
  repas/                     — 6 photos du Bistro/parking/trajet (extérieur, intérieur,
                                parking-vue, parking-automate, trajet-esplanade, trajet-allee)
documents/
  lettre-ambassade-hongrie-2026.pdf — scan officiel de la lettre de l'Ambassade (tracké)
CNAME            — domaine GitHub Pages (ne pas supprimer)
CLAUDE.md        — ce fichier
HANDOFF.md       — bilan des tracks terminés
```

## Fonctionnalités déjà en place

### Page d'accueil (`index.html`)
- Bandeau "Messages de dernière minute" au-dessus du faire-part (édition directe du HTML)
- Faire-part FR/HU avec **téléchargement JPG ou PDF A4** (orientation auto-détectée → paysage pour le faire-part)
- Sections Cérémonies, Informations pratiques, Plan & itinéraire
- **Section Fleurs et couronnes** (ajoutée le 30 mai, entre Plans et Restaurant) :
  - 4 fleuristes du cimetière en cartes sobres (classe `.florist-card` : fleur ❀ + nom + domaine)
  - Côté FR uniquement : astuce traduction Chrome + option internationale Fleurop (carte dédiée `.florists-single`)
  - Encart `.alert` ambré « Attention ! 11h / Centre 1956 / parcelle 300 » avec libellé HU pour le fleuriste
- **Téléchargement JPG/PDF** sous Infos pratiques (rendu html2canvas → PDF A4) et sous Plan & itinéraire (JPG direct + PDF)
- Bandeau bas avec accès à la page restaurant par code "Budapest"
- Navigation entre les 4 pages publiques (Accueil, Hommages, Revue de presse, Album)
- Croix ✝ rendue en mode texte (U+FE0E) pour ne pas être interprétée en emoji violet sur iOS

### Page Hommages (`hommages.html`)
- 38 hommages dans l'ordre exact d'Inmemori (Jean Pellet en tête, Odile Pellet en fin)
- Affichage bilingue FR/HU selon la langue active
- Galerie photos cliquable par hommage avec lightbox plein écran
- Formulaire "Envoyer un hommage" via mailto → arrive sur `lpellet@gmail.com`
- ⚠️ Quand j'ajoute une traduction HU, toujours utiliser `„...”` (U+201E + U+201D), JAMAIS `„..."` (le `"` ASCII ferme la string JS et casse tout le tableau — bug critique survenu et corrigé le 26 mai)

### Page Revue de presse (`articles.html`)
- 10 articles résumés en français, classés du plus récent au plus ancien
- Format : résumé éditorial (mes mots) + image quand dispo + lien vers la source originale
- **Bilingue FR/HU** (mis à jour le 30 mai) :
  - Titres FR et HU sont tous les deux présents pour chaque article ; le CSS swap principal/sous-titre selon la langue active (flexbox `order` sur `.article-body-wrap`).
  - Les résumés ont été traduits en HU (`<div data-lang="fr">` / `<div data-lang="hu">` dans chaque `.article-summary`), mais sont **masqués en vue HU** via la règle `html[lang="hu"] .article-summary, html[lang="hu"] .video-desc { display: none; }`. Raison : les hongrois lisent les originaux, un résumé éditorial en HU paraît condescendant.
  - En vue HU, chaque article affiche donc : source · date · journaliste · titre HU · lien direct vers l'original. Idem pour les vidéos (vignette + titre + lien YouTube).
- Bibliothèque vidéo en bas avec vignettes YouTube cliquables
- Indication de langue sur chaque vidéo
- **Dépliants de traduction FR (ajoutés le 15 juin)** sous les 2 vidéos en hongrois
  (Párbeszéd Háza `Cw_bzOQYnHE` et Duett/BUDA TV `L-zseCfvtR0`) : un dépliant
  « Résumé en français » + un « Traduction intégrale », **vue Français uniquement**
  (`<div data-lang="fr">`, classe CSS `.vid-text`). Le doc « Hazaérés » (`Lrcmui3khlM`)
  n'a PAS de dépliant (choix de Laurent).
  ⚙️ **Méthode (ces vidéos n'ont AUCUN sous-titre YouTube)** : audio récupéré via
  `yt-dlp -f bestaudio`, converti en WAV 16 kHz mono (ffmpeg), transcrit en hongrois
  avec `whisper-cli -l hu -m ggml-large-v3-turbo.bin` (Homebrew `whisper-cpp`), puis
  nettoyé et traduit. Refaire ainsi si un nouvel hommage vidéo HU doit être traduit.

### Page Album (`album.html`) — photos envoyées par les visiteurs (Cloudinary)
**Depuis le 2026-06-06**, l'album n'est plus alimenté à la main : les visiteurs déposent eux-mêmes leurs photos.
- **Galerie unique « Souvenirs du 3 juin »** (les anciennes sections Messe/Inhumation/Réception ont été retirées).
- **Bouton « Ajouter une photo »** = widget d'upload Cloudinary (sans compte, Android + iPhone).
- **Modération obligatoire** : une photo n'apparaît que si Laurent lui ajoute l'étiquette `album-public` dans la console Cloudinary. Sinon elle reste invisible.
- **Paramètres** (inscrits dans `album.html`) : Cloud name `duiehxhw3`, upload preset `souvenirs_edina` (Unsigned), étiquette `album-public`, dossier `souvenirs-edina`.
- La galerie lit `https://res.cloudinary.com/duiehxhw3/image/list/album-public.json`.
- **Modération iPhone** : console Cloudinary dans Safari + « Sur l'écran d'accueil » (icône type appli).
- **⚠️ Ne jamais mettre l'API Key / Secret Cloudinary dans le code** : le montage marche sans (Cloud name public + preset unsigned uniquement).
- Détail complet : `HANDOFF-ARCHIVE/2026-06-06-album-photos-cloudinary.md`.

### Page Réception (`repas.html`)
- Bilingue FR/HU, accès par code « **Budapest** » depuis le bas de l'accueil
- **Le Bistro Budapest** (sans t final), lien Maps + site `lebistro.hu`, 2 photos
- Horaires : arrivée 13h30, salle jusqu'à 18h30 — pas de navette cimetière↔resto
- Accès : taxis (City Taxi, Főtaxi), parking BUDAPART CB (400 m), alerte alcool **0,00 g/L**, navette resto entre parking et entrée OU marche par allée piétonne
- TV + HDMI pour photos/vidéos via clé USB
- ~~RSVP via Philippe avant jeudi 28 mai minuit~~ — **bloc RSVP supprimé le 30 mai** (deadline dépassée, page `confirmation.html` également supprimée pour ne plus exposer la liste d'invités sur internet)
- 2 contacts (Laurent +33 7 62 25 12 38, Philippe +36 30 493 25 59) — les deux parlent FR et HU, les 2 numéros c'est juste pour les frais d'appel
- **2 groupes WhatsApp séparés** (la traduction WhatsApp ne supporte pas le hongrois) :
  - FR · Réception Edina — 3 juin : https://chat.whatsapp.com/IeypPp5ipA98gooKuV5qEP
  - HU · Búcsú Edinától · június 3. : https://chat.whatsapp.com/BqzmjVrEjs6AHsBBCc3yEC
- Pictos WhatsApp : rond vert 38px + drapeau en badge top-right (style discret)
- Photos dans `images/repas/` : `bistro-{exterieur,interieur}.jpg`, `parking-{vue,automate}.jpg`, `trajet-{esplanade,allee}.jpg`

### Veille presse automatisée
3 alertes Google Alerts actives sur `lpellet@gmail.com` (créées le 26 mai) :
- `Koszmovszky Edina`
- `"piros kabátos lány"`
- `Koszmovszky 1956`

Toutes configurées en : dès que possible · toutes langues · toutes régions · meilleurs résultats.

Workflow : quand un nouvel article tombe, Laurent transfère le lien → je récupère le contenu (Chrome si nécessaire), j'écris un résumé centré sur Edina, j'ajoute en haut de la revue de presse.

## Consignes éditoriales

### Résumés d'articles
- Centrer sur Edina, compresser ou évacuer ce qui ne la concerne pas
- Lire l'article EN ENTIER avant de résumer (WebFetch a déjà loupé des passages clés — toujours croiser avec le navigateur Chrome si possible)
- Format : résumé original (mes mots) + courte citation max + lien source
- **Bilingue depuis le 30 mai** : écrire le résumé en FR ET en HU dans chaque `.article-summary`. Le résumé HU est techniquement masqué (cf. règle CSS dans la section articles.html), mais on le garde dans le source au cas où la décision serait inversée plus tard. La règle « pas de traduction intégrale » d'avant le 30 mai est désormais caduque côté code, conservée seulement dans le rendu visible HU.

### Texte hongrois
- Utiliser systématiquement les guillemets typographiques hongrois : `„...”` (U+201E ouvrant + U+201D fermant)
- Jamais le `"` ASCII droit comme fermant → casse le JavaScript
- Vérifier la syntaxe avant push si du texte HU contient des guillemets : `node -e "new Function(fs.readFileSync('hommages.html','utf8'))"` ou équivalent

## Statut actuel (2026-06-15)

✅ Site en ligne sur les deux domaines custom (HTTPS). **La cérémonie du 3 juin est passée** ; le site reste un mémorial pérenne.
✅ Toutes les pages en place et bilingues : accueil, hommages, revue de presse, **textes de la cérémonie**, album, repas.
✅ **NOUVEAU (15 juin) : page « Communiqués officiels »** = rubrique de NIVEAU 1 (menu du haut, entre « Le 3 juin » et « Revue de presse ») depuis la décision des frères. Contenu : lettre Ambassade de Hongrie, hommage au Parlement (vidéo calée + transcription FR/HU des 2 discours, extraite des sous-titres auto via yt-dlp), communiqué NÖRI. Page autonome (plus de hub-bar du 3 juin).
✅ **Album : photos déposées par les visiteurs via Cloudinary**, modérées par Laurent (étiquette `album-public`). Testé en réel, en ligne.
✅ Page Réception complète (infos pratiques, 2 groupes WhatsApp, alerte alcool). RSVP clôturée.
✅ Veille presse active. Données personnelles invités protégées (`data/invites-*` gitignored, `confirmation.html` supprimée).

➡️ **Pas de prochain track planifié.** Mode « au fil de l'eau » : modération des photos de l'album + retouches ponctuelles.

**Pistes éventuelles (backlog, voir HANDOFF.md)** :
- Page de validation photos sur-mesure (mobile) si la console Cloudinary sur iPhone est trop pénible (nécessite un relais sécurisé).
- Mur de messages live (Firebase / Google Form / Telegram) — dismissed, à ressortir si l'envie revient.

## Backlog (reporté, pas pour le prochain track)

### Transcription en direct de la messe (abandonnée pour le 3 juin)
**Architecture initialement prévue** :
```
Téléphone (micro) → Railway WebSocket → AssemblyAI (transcription + détection FR/HU)
                                              │
                            ┌─────────────────┴─────────────────┐
                       Canal FR (DeepL si HU détecté)      Canal HU (DeepL si FR détecté)
                            │                                   │
                  Fenêtre prompteur FR                  Fenêtre prompteur HU
```

Tentative jugée trop fragile (problèmes d'outils, pas d'IA en cause). Remplacée par la feuille de messe pré-traduite (cf. prochain track). À ressortir éventuellement pour un autre événement.

Comptes : AssemblyAI ✅ (existant), DeepL ❌ (jamais créé), Railway ✅ (existant).

### Page Album — ✅ résolu (2026-06-06)
Désormais alimentée par les visiteurs via Cloudinary (cf. section « Page Album » plus haut). Plus rien à faire à la main.

## Workflow Git

- Développement sur `main` directement
- Push → GitHub Pages déploie en 1-2 min
- Si GitHub Pages a un incident, vérifier `githubstatus.com` avant de paniquer
- En cas de bug critique post-push : `git revert <sha>` ramène l'état précédent en quelques secondes

## Propriétaire

- Email : **lpellet@gmail.com** (jamais `reflet.82-kilos@icloud.com` qui est l'email iCloud non-utilisé pour ce projet)
- Profil : non-développeur — vulgariser, guider pas à pas, demander validation avant de coder
- Téléphone utilisé sur place le jour J pour démarrer la transcription
