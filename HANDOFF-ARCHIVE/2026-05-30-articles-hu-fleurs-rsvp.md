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

