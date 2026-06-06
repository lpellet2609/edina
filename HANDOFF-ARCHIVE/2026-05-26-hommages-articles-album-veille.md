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

