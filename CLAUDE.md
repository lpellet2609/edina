# CLAUDE.md — Projet mémorial Edina

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
album.html       — album souvenirs (vide, à remplir après le 3 juin)
repas.html       — page protégée par code "Budapest" pour les invités au déjeuner
                   ⚠️ CONTENU À AJOUTER (prochain track)
data/
  hommages-raw.json          — texte brut des hommages scrapés sur Inmemori
  invites-inmemori.csv       — 33 invités Inmemori (nom, email, statut)
  invites-inmemori.xlsx      — version Excel avec colonnes "Contacté" et "Notes"
  invites-emails-bcc.txt     — emails séparés par virgules pour envoi groupé en BCC
images/
  hommages/                  — photos jointes aux hommages (≈30)
  articles/                  — vignettes presse
  videos/                    — vignettes YouTube
  album/                     — sous-dossiers messe/, inhumation/, reception/ (vides)
CNAME            — domaine GitHub Pages (ne pas supprimer)
CLAUDE.md        — ce fichier
HANDOFF.md       — bilan des tracks terminés
```

## Fonctionnalités déjà en place

### Page d'accueil (`index.html`)
- Bandeau "Messages de dernière minute" au-dessus du faire-part (édition directe du HTML)
- Faire-part FR/HU avec **téléchargement JPG ou PDF A4** (orientation auto-détectée → paysage pour le faire-part)
- Sections Cérémonies, Informations pratiques, Plan & itinéraire
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
- Format : résumé éditorial (mes mots) + image quand dispo + lien vers la source originale — pas de traduction intégrale (raison juridique + plus élégant)
- Bibliothèque vidéo en bas avec vignettes YouTube cliquables
- Indication de langue sur chaque vidéo

### Page Album (`album.html`)
- 3 sections : Messe / Inhumation / Réception
- Vide pour l'instant
- Photos à ajouter dans `images/album/{messe,inhumation,reception}/` puis lister dans le tableau `PHOTOS` au bas du fichier

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

### Texte hongrois
- Utiliser systématiquement les guillemets typographiques hongrois : `„...”` (U+201E ouvrant + U+201D fermant)
- Jamais le `"` ASCII droit comme fermant → casse le JavaScript
- Vérifier la syntaxe avant push si du texte HU contient des guillemets : `node -e "new Function(fs.readFileSync('hommages.html','utf8'))"` ou équivalent

## Statut actuel (2026-05-26)

✅ Site en ligne sur les deux domaines custom (HTTPS).
✅ Toutes les pages principales en place et bilingues.
✅ Veille presse active.

➡️ **Prochain track : page Réception (`repas.html`)**
Le contenu est vide. Le frère doit communiquer les infos du restaurant pour le déjeuner du 3 juin après l'inhumation. Voir HANDOFF.md pour le détail.

## Backlog (reporté, pas pour le prochain track)

### Transcription en direct de la messe (3 juin 2026, 9h00, Budapest)
**Architecture validée** :
```
Téléphone (micro) → Railway WebSocket → AssemblyAI (transcription + détection FR/HU)
                                              │
                            ┌─────────────────┴─────────────────┐
                       Canal FR (DeepL si HU détecté)      Canal HU (DeepL si FR détecté)
                            │                                   │
                  Fenêtre prompteur FR                  Fenêtre prompteur HU
```

Comptes : AssemblyAI ✅ (existant), DeepL ❌ (à créer), Railway ✅ (existant).
Affichage : 2 boutons popup discrets sur `index.html`, style prompteur, texte large.

## Workflow Git

- Développement sur `main` directement
- Push → GitHub Pages déploie en 1-2 min
- Si GitHub Pages a un incident, vérifier `githubstatus.com` avant de paniquer
- En cas de bug critique post-push : `git revert <sha>` ramène l'état précédent en quelques secondes

## Propriétaire

- Email : **lpellet@gmail.com** (jamais `reflet.82-kilos@icloud.com` qui est l'email iCloud non-utilisé pour ce projet)
- Profil : non-développeur — vulgariser, guider pas à pas, demander validation avant de coder
- Téléphone utilisé sur place le jour J pour démarrer la transcription
