# HANDOFF — Projet mémorial Edina

Bilan des tracks terminés, du plus récent au plus ancien.

---

## Track — Pages Hommages, Articles, Album, Veille presse (terminé le 2026-05-26)

**Objectif** : enrichir le site avec un recueil d'hommages, une revue de presse, un album souvenirs, des téléchargements imprimables, et automatiser la veille des nouveaux articles.

### Ce qui a été fait

**1. Page Hommages (`hommages.html`)**
- Scraping des 36 hommages d'Inmemori (auteurs + textes + images jointes via Chrome MCP)
- Traduction intégrale FR↔HU de chaque hommage (38 au total après ajouts)
- 25 photos téléchargées en local dans `images/hommages/`
- Lightbox plein écran au clic sur une photo
- Navigation entre les pages ajoutée
- Hommage de Jean Pellet (neveu et filleul) ajouté en tête avec 5 photos après réception sur Inmemori
- Hommage d'Odile Pellet ajouté manuellement en fin (n'est pas sur Inmemori)
- Ordre vérifié et aligné sur Inmemori (un `.reverse()` parasite a été retiré)
- Formulaire mailto "Envoyer un hommage" → envoie sur `lpellet@gmail.com`
- 🐛 Bug critique corrigé : guillemets ASCII `"` au lieu de `”` (U+201D) dans la traduction HU cassaient le JavaScript → page entièrement vide. Mémorisé pour l'avenir.

**2. Page Revue de presse (`articles.html`)**
- 10 articles trouvés via Google Search dans la presse hongroise et internationale
- Résumés éditoriaux en français (mes mots), pas de traduction intégrale (raison juridique)
- Chaque carte : source, date, auteur, image quand dispo, résumé, lien vers original
- Ordre anti-chronologique (le plus récent en haut)
- Magyar Nemzet, Magyar Jelen, Felvidék.ma, Debreceni Nap, Index.hu, Bors Online, Blikk, Hungary Today, Képmás, Szabad Európa
- Galerie vidéo en bas avec 3 vidéos YouTube (Hazaérés, Párbeszéd Háza, Duett BUDA TV), vignettes téléchargées localement, indication de langue

**3. Page Album (`album.html`)**
- Architecture en place avec 3 sections : Messe, Inhumation, Réception
- Vide, attend les photos du 3 juin
- Pour ajouter : déposer dans `images/album/{section}/` + lister noms dans le tableau `PHOTOS`

**4. Téléchargements imprimables sur `index.html`**
- Faire-part FR/HU : JPG direct + PDF A4 (jsPDF, orientation auto = paysage car ratio image)
- Infos pratiques (texte HTML) : JPG/PDF via html2canvas → A4 portrait scaled to fit
- Plan & itinéraire (image) : JPG direct + PDF A4 portrait

**5. Veille presse automatisée**
- 3 alertes Google Alerts créées sur le compte Laurent via Chrome (navigation + clics)
- Termes : `Koszmovszky Edina`, `"piros kabátos lány"`, `Koszmovszky 1956`
- Anciennes alertes supprimées (Afrique du Sud, Hongrie, Maroc)

**6. Données invités**
- 33 emails Inmemori extraits avec noms + statut
- Exportés en CSV (`data/invites-inmemori.csv`), Excel (`data/invites-inmemori.xlsx`) et BCC-ready (`data/invites-emails-bcc.txt`)

**7. Corrections diverses**
- Croix ✝ rendue en texte (U+FE0E) au lieu d'emoji violet sur iOS
- Renommage navigation "Articles" → "Revue de presse"
- Phrase d'intro hommages reformulée
- Email de contact mémorisé : `lpellet@gmail.com` (pas l'iCloud)

### Incidents

- GitHub Pages a eu un **Major Outage** le 26 mai de 10:57 à 13:18 UTC. Les commits envoyés pendant la panne ne se sont pas déployés rétroactivement à la résolution → il a fallu pousser un commit "réveil" après l'incident.
- Bug guillemets HU → page vide. Diagnostic via `new Function(blocJS)` qui détecte une SyntaxError silencieuse. Désormais en mémoire projet.

### Résultat
- 4 pages publiques en ligne, toutes bilingues
- ~80 fichiers commitées (hommages, articles, vidéos, photos)
- Veille presse opérationnelle pour la suite

---

## Track — Noms de domaine custom (terminé le 2026-05-25)

**Objectif** : faire pointer les deux domaines achetés chez Porkbun vers le site GitHub Pages.

### Ce qui a été fait

1. **Domaine principal `edinakoszmovszky.com`** configuré sur GitHub Pages
   - Settings → Pages → Custom domain renseigné
   - Fichier `CNAME` créé automatiquement à la racine du repo

2. **DNS Porkbun** pour `edinakoszmovszky.com`
   - Supprimé les enregistrements de parking par défaut
   - Ajouté 4 enregistrements **A** vers les IPs GitHub Pages (`185.199.108-111.153`)
   - Ajouté 1 **CNAME** : host `www` → `lpellet2609.github.io`
   - Conservé : MX (fwd1/fwd2.porkbun.com), TXT SPF, 2 TXT `_acme-challenge`

3. **Redirection `koszmovszkyedina.com`** via Porkbun URL Forwarding (301 vers principal, wildcard + path activés)

4. **Vérifications GitHub** : DNS check ✅, certificat TLS ✅, HTTPS fonctionne.

### Résultat
- https://edinakoszmovszky.com → site OK
- https://www.edinakoszmovszky.com → site OK
- https://koszmovszkyedina.com → redirige vers le principal
- Renouvellement domaines : 2027-05-25

---

## Prochain track — Contenu de la page Réception (`repas.html`)

**Contexte** : après la cérémonie au cimetière (3 juin 2026, 11h), un déjeuner est organisé dans un restaurant à Budapest pour les invités. La page `repas.html` existe déjà comme coquille vide (accès par code "Budapest" depuis le bas de l'accueil) mais le contenu n'est pas encore en place — le frère doit communiquer les infos.

**Infos attendues** :
- Nom du restaurant
- Adresse complète + lien Google Maps
- Horaire (probablement vers 13h-13h30 après l'inhumation)
- Type de menu / nombre de convives
- Code vestimentaire éventuel
- Contact sur place
- Plan d'accès depuis le cimetière
- Toute autre indication pratique

**À faire au démarrage du prochain chat** :
1. Récupérer les infos restaurant transmises par le frère
2. Mettre à jour `repas.html` avec contenu bilingue FR/HU
3. Garder le design cohérent avec le reste du site (bordeaux, Cormorant Garamond, etc.)
4. Vérifier que la croix `✝︎` est bien en mode texte
5. Ajouter éventuellement un bouton de téléchargement PDF/JPG pour impression
6. Tester l'accès via code "Budapest" depuis l'accueil

---

## Backlog (reporté)

### Transcription en direct de la messe
Initialement prévue comme prochain track, repoussée. Architecture détaillée dans `CLAUDE.md` section "Backlog". À reprendre une fois la page Réception bouclée et avant le 3 juin si voulu.
