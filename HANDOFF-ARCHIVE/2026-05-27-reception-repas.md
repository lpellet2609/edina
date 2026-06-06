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

