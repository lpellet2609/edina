# HANDOFF — Projet mémorial Edina

Bilan des tracks terminés, du plus récent au plus ancien.

---

## Track — Articles HU, Fleurs & couronnes, nettoyage RSVP (terminé le 2026-05-30)

**Objectif initial** : traduire les résumés de presse en hongrois (demande de Laurent en ouverture de session).
**Élargissement en cours de route** : ajout d'une section Fleurs & couronnes sur l'accueil (sur proposition de Philippe), puis (demande du frère) simplification de la vue HU des articles + retrait de la page liste d'invités + clôture du RSVP.

### Ce qui a été fait

**1. Articles (`articles.html`) — vue bilingue avec inversion FR/HU**
- Les 10 résumés éditoriaux ont été traduits en hongrois, enveloppés dans des `<div data-lang="fr">` / `<div data-lang="hu">` à l'intérieur de chaque `.article-summary`.
- Intro de la page mise à jour côté HU : `« Linkek az eredeti cikkekhez, a legújabbtól a legrégebbiig rendezve. »` (l'ancienne mention « francia nyelvű összefoglaló » a sauté).
- CSS des titres `.article-title-fr` / `.article-title-hu` refactorisé : la mise en forme « titre principal bordeaux 23px + sous-titre italique gris 16px » est désormais **conditionnelle à la langue active**. En vue FR, le titre FR est principal et l'original HU est sous-titre. En vue HU, c'est l'inverse.
- L'ordre visuel est inversé via flexbox sur `.article-body-wrap` (`display: flex; flex-direction: column;` + `order` calculé selon `html[lang]`).

**2. Articles : retrait des résumés IA côté HU** (demande du frère, en fin de session)
- Règle CSS unique : `html[lang="hu"] .article-summary, html[lang="hu"] .video-desc { display: none; }`.
- Justification : les hongrois lisent les originaux, un résumé éditorial en HU n'apporte rien et risque même de paraître condescendant.
- Conséquence : la vue HU de Sajtószemle affiche pour chaque article uniquement source · date · journaliste · titre HU · lien direct vers l'article original.
- Les **vidéos** subissent le même traitement (description vidéo masquée en HU).
- ⚠️ La règle éditoriale du CLAUDE.md « pas de traduction intégrale (raison juridique + plus élégant) » est désormais **partiellement caduque** : la traduction existe (côté FR), elle est juste masquée côté HU. Le CLAUDE.md est mis à jour.

**3. Page d'accueil — nouvelle section « Fleurs et couronnes »** (proposition Philippe)
- Insérée entre « Plans et itinéraire » et « Restaurant ».
- Structure : intro avant les cartes → cartes de fleuristes (partagées FR/HU) → suite du texte après les cartes → bloc Fleurs (achat sur place).
- **4 fleuristes du cimetière** présentés comme cartes sobres cliquables (`.florist-card` : fleur ❀ + nom + domaine, fond crème, hover bordeaux) :
  - Évi virágbolt — evivirag.hu
  - Florus Virágüzlet — Kozma utca (annuaire ittlakunk.hu)
  - Virágklub — viragklub.hu
  - Koszorúk.hu — koszoruk.hu
- Noms confirmés par WebFetch (sauf Florus, identifié via l'URL de l'annuaire).
- **Choix de design important** : pas de scraping de logos/screenshots des sites, malgré la demande initiale de Laurent. Raison = fiabilité le jour J + cohérence visuelle. Si Laurent veut vraiment les logos plus tard, deux options possibles : favicons Google (`s2/favicons?domain=…&sz=64`) ou logos hébergés en local.
- **Enrichissement Philippe v2** ajouté ensuite :
  - Astuce traduction Chrome (3 points → « Traduire ») pour les francophones — visible uniquement en FR.
  - 5ᵉ option **Fleurop** (https://www.fleurop.hu/en/categories/188-sympathy-funeral) en carte dédiée pleine largeur (classe `.florists-single`), affichée uniquement en vue FR (les hongrois n'en ont pas besoin).
  - Encart `.alert` ambré « Attention ! Cérémonie 11h, Centre 1956, parcelle 300 » avec le libellé hongrois complet à donner au fleuriste (`Rákoskeresztúri Újköztemető 1956-os Látogatóközpontja, a 300-as parcella mellett`). Version HU « Figyelem! » plus courte.

**4. Page Réception (`repas.html`) — RSVP clôturé** (demande du frère)
- Bloc `<!-- RSVP -->` entièrement supprimé : titre « Merci de confirmer votre présence », deadline « avant le 28 mai à minuit », paragraphe explicatif, bouton « → Confirmer ma présence ».
- Justification : la RSVP est clôturée, aucun intérêt à laisser un bouton qui mène vers une page qui n'existe plus.

**5. Suppression de la page `confirmation.html`** (demande du frère)
- `git rm confirmation.html` — la page contenant la liste des invités (noms, e-mails, prénoms d'enfants, choix de menu) n'existe plus côté repo, donc plus côté serveur après le déploiement.

**6. Protection des données personnelles dans `data/`** (initiative en marge de la demande du frère)
- Audit réalisé : `data/invites-inmemori.xlsx` était **publiquement accessible** à `https://lpellet2609.github.io/edina/data/invites-inmemori.xlsx` (HTTP 200) — vraie fuite RGPD, même si non linkée depuis le site.
- `data/invites-emails-bcc.txt` et `data/invites-inmemori.csv` n'étaient pas trackés, donc jamais déployés.
- Correctifs :
  - `git rm --cached data/invites-inmemori.xlsx` (le fichier reste en local).
  - Ajout de `data/invites-*` au `.gitignore` — plus aucun fichier matchant ne sera jamais poussé.
- `data/hommages-raw.json` reste tracké (pas de données personnelles, juste le contenu public d'Inmemori scrapé).

**7. Détour initial (échec contrôlé) — création d'un repo `obseques-maman` séparé**
- En tout début de session, Laurent a demandé « comment faire un mini-site » sans préciser qu'il avait déjà tout un site mémorial. Le dossier local apparaissait vide à ce moment-là (probablement avant un `git pull`).
- J'ai créé un repo `obseques-maman` séparé, poussé un `index.html` basique, puis renommé en `edina` via l'API GitHub pour avoir une URL courte.
- Le rename a réussi (alors qu'il aurait dû échouer si `lpellet2609/edina` existait déjà). **Le vrai site n'a pas été écrasé** — c'est bien le repo `edina` historique (album, hommages, articles, repas) qui est actuellement en ligne.
- À retenir : **lire le CLAUDE.md à fond avant de toucher quoi que ce soit**.

### Décisions de design notables

- **Inversion FR/HU des titres d'articles** via flexbox + `order` plutôt que duplication HTML → DRY, accessible, pas de doublon.
- **Cards uniformes pour les fleuristes** plutôt que screenshots/logos scrapés → fiabilité prioritaire sur l'identité visuelle des fleuristes (cohérent avec le ton sobre du site).
- **Suppression de la traduction HU des résumés** alors qu'elle venait d'être faite → on a gardé le travail visible côté FR (où il sert), masqué côté HU (où il dessert). C'est un peu de boulot perdu, mais le diff garde l'historique au cas où.

### Sécurité / tokens

- Laurent a collé **2 tokens GitHub en clair** dans la conversation pour le détour initial (création du repo `obseques-maman`) :
  - 1 fine-grained PAT (`github_pat_11CBTGNPA0…`) — n'avait pas la permission de créer un repo.
  - 1 token classique avec scope `repo` (`ghp_YHmCctC2zE…`) — a permis de créer + push + activer Pages.
- **À révoquer manuellement** sur https://github.com/settings/tokens dès que possible.

### Idées non implémentées (dépriorisées en cours de session)

- **Mur de messages en direct sur l'accueil** : Laurent voulait poster depuis son téléphone des messages courts apparaissant en live pour les visiteurs. Trois options proposées (Firebase Firestore en recommandée, Google Form + Sheets, canal Telegram embarqué). Laurent a dismissé la question — à reprendre dans un futur track si l'envie revient. Le bandeau « Messages de dernière minute » en haut de l'accueil suffit probablement (édition manuelle directe dans le HTML).

---

## Track — Page Réception (`repas.html`) (terminé le 2026-05-27)

**Objectif** : remplir la page Réception (vide jusqu'ici, accessible par code « Budapest » depuis l'accueil) avec toutes les infos pratiques du déjeuner du 3 juin au restaurant Le Bistro Budapest.

### Ce qui a été fait

**1. Informations restaurant**
- Nom officiel : **Le Bistro Budapest** (sans « t » final — corrigé après une première version erronée)
- Site web : https://lebistro.hu
- Lien Google Maps : https://maps.app.goo.gl/YvD6Te78iY78i9Rb8
- 2 photos du bistro (extérieur + intérieur) dans `images/repas/`

**2. Section Horaires**
- Trajet direct cimetière → restaurant après l'inhumation
- Arrivée prévue à partir de **13h30** (heure d'ouverture côté restau)
- Salle réservée jusqu'à 18h30 — « prévoyez l'après-midi »
- Mention « si vous arrivez plus tôt, vous serez accueillis »

**3. Section Comment venir** (structurée en 3 sous-blocs)
- **Depuis le cimetière** : pas de navette organisée, ~30 min en voiture, recommandation covoiturage/taxi avec coordonnées **City Taxi** et **Főtaxi** (reprises de l'index)
- **En voiture — Parking BUDAPART** : ~400 m du restaurant, paiement automate par CB (étrangères acceptées), 2 photos (vue + automate)
- **Alerte alcool 0,00 g/L** en Hongrie (encart ambré bien visible, FR + HU)
- **Du parking au restaurant** : 400 m à pied par allée piétonne OU navette du restaurant entre parking et entrée, lien Maps de l'itinéraire piéton (https://maps.app.goo.gl/MsF3VNiRFNtYMp8AA), 2 photos (esplanade + allée), recommandation navette pour personnes âgées/bébés/bagages

**4. Apportez vos souvenirs**
- TV avec câble HDMI disponible sur place → encouragement à apporter clé USB avec photos/vidéos d'Edina

**5. RSVP**
- Encart bordeaux/crème centré, deadline **jeudi 28 mai à minuit** (modifié en cours de track depuis « vendredi 29 matin »)
- Pas de bouton mailto : Philippe gère les confirmations hors site (via le message d'invitation qu'il envoie individuellement)

**6. Contacts le jour J**
- 2 cartes côte-à-côte : Laurent **+33 7 62 25 12 38** (numéro français) et Philippe **+36 30 493 25 59** (numéro hongrois)
- Texte d'intro clarifie : « Laurent et Philippe parlent tous les deux français et hongrois — les 2 numéros sont juste pour éviter les frais d'appel international »

**7. Groupes WhatsApp** (nouveau bloc, ajouté en cours de track)
- **2 groupes** créés (un FR, un HU) — la fonction « traduction par message » de WhatsApp ne supporte PAS le hongrois → décision : groupes séparés
  - 🇫🇷 **FR · Réception Edina — 3 juin** : https://chat.whatsapp.com/IeypPp5ipA98gooKuV5qEP
  - 🇭🇺 **HU · Búcsú Edinától · június 3.** : https://chat.whatsapp.com/BqzmjVrEjs6AHsBBCc3yEC
- Affichage sur le site : 2 pictos discrets (icône WhatsApp verte 38px + drapeau en badge top-right, label Cormorant Garamond bordeaux) — toujours visibles quelle que soit la langue active
- Note italique : « réservés aux invités du déjeuner, pas relayé sur la page d'accueil publique »

**8. Livrables annexes produits dans le chat (pas sur le site)**
- Message d'invitation court pour Philippe (WhatsApp/SMS/mail), versions FR et HU avec lien direct vers `repas.html` + code Budapest
- Texte de description des groupes WhatsApp (FR et HU) — à coller dans la description du groupe pour que les nouveaux arrivants voient le lien (les messages épinglés ne sont pas visibles pour ceux qui rejoignent après leur envoi → la description, oui)
- Message court bilingue (FR/HU) pour remplacer le long texte d'annonce sur InMemori — redirige vers le nouveau site

### Décisions structurantes

- **« Bistro » sans t final** (faute initiale corrigée partout)
- **Pas de navette cimetière↔restaurant** (la navette c'est seulement parking↔restaurant, 400 m, fournie par le restaurant)
- **Bouton WhatsApp discret > flashy** : 1ère version (gros bouton tout vert) jugée trop flashy, remplacée par picto rond 38px + drapeau en badge
- **Deux groupes WhatsApp plutôt qu'un seul bilingue** : la traduction WhatsApp ne supporte pas le hongrois
- **Description du groupe > épinglage** : un message épinglé n'est pas visible pour les nouveaux arrivants, la description si

### Photos organisées

Dossier `images/repas/` créé, photos renommées par catégorie :
- `bistro-exterieur.jpg`, `bistro-interieur.jpg`
- `parking-vue.jpg`, `parking-automate.jpg`
- `trajet-esplanade.jpg`, `trajet-allee.jpg`

L'ancien dossier `images/Photos lieu Bistrot reception Maman/` (l'original déposé par Laurent) est non-tracké, à supprimer manuellement si voulu.

### Résultat
- Page `repas.html` complète, bilingue FR/HU, en ligne sur https://edinakoszmovszky.com/repas.html
- 7 commits successifs (de `2beb861` à `c4ce3e2`)
- Tous les outils nécessaires aux invités le jour J sont en place : infos, navette, taxis, contacts, alerte alcool, groupes WhatsApp

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

## Prochain track — Feuille de messe bilingue / Préparation cérémonie du 3 juin

**Contexte** : la messe d'enterrement à Budapest sera célébrée en hongrois. Beaucoup d'invités sont francophones et ne comprendront rien pendant 1h-1h30. Idée retenue (à la place de la transcription live, jugée trop fragile) : **préparer une feuille de messe bilingue** côté site pour que les Français puissent suivre.

**Infos attendues de Philippe** (à demander au prêtre) :
- Texte de l'**homélie** si le prêtre la rédige à l'avance
- Liste des **lectures** retenues (Ancien Testament / Psaume / Évangile)
- **Chants** prévus
- Ordre exact du déroulé liturgique

**Idée d'équilibre proposée** : faire une lecture en français, une en hongrois (ou alternance) lue par des proches, et fournir sur le site les deux versions pour que chaque communauté puisse suivre.

**À faire au démarrage du prochain chat** :
1. Récupérer ce que Philippe a obtenu du prêtre
2. Créer une page `messe.html` (ou enrichir `index.html` avec une section dédiée) avec le déroulé bilingue FR/HU
3. Si l'homélie est rédigée : traduction en français, mise à disposition sur le site
4. Bouton d'accès depuis l'accueil, accessible à tous (pas besoin de code)
5. Vérifier que le tout est imprimable (téléchargement JPG/PDF comme les autres pages)
6. Garder en tête la deadline : tout doit être en ligne **au plus tard le 2 juin au soir**

---

## Backlog (reporté)

### Transcription en direct de la messe (abandonnée pour le 3 juin)
Architecture détaillée dans `CLAUDE.md` section "Backlog". Tentative faite mais jugée trop fragile (problème d'outils, pas d'IA). Remplacée par la feuille de messe pré-traduite (cf. prochain track ci-dessus). À ressortir éventuellement pour un autre événement futur.

### Page Album (à remplir après le 3 juin)
Architecture déjà en place dans `album.html` (3 sections : Messe / Inhumation / Réception, dossiers d'images créés vides). À remplir avec les photos du jour J une fois disponibles. Pas urgent pour avant l'événement.
