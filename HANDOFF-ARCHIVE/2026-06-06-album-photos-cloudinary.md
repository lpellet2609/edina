## Track — Album : envoi de photos par les visiteurs (Cloudinary) (terminé le 2026-06-06)

**Contexte** : la cérémonie du 3 juin est passée. Des proches demandent à pouvoir
**déposer eux-mêmes** leurs photos dans la page Album, sans passer par Laurent.
Contraintes posées par Laurent : upload simple pour tous (Android + iPhone),
**modération obligatoire** (le site est public, rien ne doit apparaître sans son
accord), publication **quasi-automatique** (pas de bidouille de code à chaque photo),
possibilité de **refuser** une photo, et **modération possible depuis son iPhone**.

### Solution retenue : Cloudinary (compte gratuit)

Les albums partagés (Google Photos / iCloud) ont été écartés car ils ne permettent
pas de modération (toute photo ajoutée est visible immédiatement). Cloudinary coche
les 4 cases : upload universel, modération, affichage auto, refus.

**Architecture** (sans serveur, sur GitHub Pages statique) :
- Un **widget d'upload Cloudinary** sur `album.html` (bouton « Ajouter une photo »).
  N'importe qui envoie une photo sans compte, depuis Android ou iPhone.
- Les photos arrivent dans le compte Cloudinary, dossier `souvenirs-edina`, **invisibles
  sur le site** tant qu'elles n'ont pas l'étiquette `album-public`.
- La galerie de `album.html` lit `https://res.cloudinary.com/duiehxhw3/image/list/album-public.json`
  (liste publique des photos validées) et les affiche, triées du plus récent au plus ancien.
- **Modération = ajouter l'étiquette `album-public`** à une photo dans la console
  Cloudinary (Assets → photo → ··· → Edit Tags). Refus = ne pas étiqueter, ou supprimer.

### Configuration Cloudinary (faite ce jour)
- Compte créé : **Cloud name = `duiehxhw3`** (compte rattaché à lpellet@gmail.com).
- **Upload preset = `souvenirs_edina`**, mode **Unsigned**, dossier `souvenirs-edina`.
- **Security → « Resource list » décoché** (autorise la lecture publique de la liste
  `album-public.json` par le site).
- L'API Key / API Secret existent mais **ne sont PAS utilisés** (et ne doivent jamais
  être mis dans le code public). Le montage marche uniquement avec le Cloud name public
  + le preset unsigned.

### Modifications de code (`album.html`)
- Ajout du script `https://upload-widget.cloudinary.com/global/all.js` dans le `<head>`.
- Remplacement des **3 sections** (Messe / Inhumation / Réception) par **une galerie
  unique « Souvenirs du 3 juin »** (choix de Laurent).
- Zone d'envoi `.upload-zone` + bouton `.upload-btn` + message de remerciement.
- JS : constantes `CLOUD_NAME`, `UPLOAD_PRESET`, `PUBLIC_TAG = "album-public"`,
  fonction `loadGallery()` (fetch de la liste + rendu) et `openUpload()` (widget).
- Bilingue FR/HU et lightbox conservés.
- Commit `bc02554` (rebasé sur les modifs distantes — un ajustement responsive du menu
  était arrivé entre-temps), push final `73126b3`.

### Tests effectués (de bout en bout, en réel)
- Upload via le preset unsigned : OK (HTTP 200).
- Ajout de l'étiquette `album-public` dans la console : OK.
- Lecture de `album-public.json` : la photo remonte bien → le site l'afficherait.
- Test refait sur la page **en ligne** (`edinakoszmovszky.com/album.html`) : le bouton
  ouvre bien le widget en français (« Mes photos » / « Appareil photo »).
- Photos de test supprimées → médiathèque propre.

### Modération depuis iPhone (décision)
- La console Cloudinary **fonctionne** sur iPhone Safari mais n'est **pas responsive**
  (mise en page « ordinateur » à 3 colonnes → un peu serré). Vérifié en simulant un
  écran étroit : la console garde sa mise en page desktop.
- **Option 1 retenue** (sur conseil « Mr Temps », car besoin court terme) : utiliser la
  console sur iPhone via Safari + **« Sur l'écran d'accueil »** pour une icône type appli.
  Validation via ··· → Edit Tags → `album-public`. Astuce : mode paysage plus lisible.
- **Option 2 dépriorisée** (page de validation sur-mesure mobile avec gros boutons
  Publier/Refuser) : nécessiterait un petit relais sécurisé pour protéger la clé API
  (~30-45 min + un service à maintenir). À ressortir si l'Option 1 s'avère trop pénible.

### Lien de modération (favori à mettre par Laurent)
Dossier des photos reçues :
`https://console.cloudinary.com/app/c-96d931e4343783b892d73018ee52b4/assets/media_library/folders/cf4e8156bc094aaf0217d0af02c9617d1f?view_mode=mosaic`

### Revue des 5 gardiens
- **Doc** ✅ : CLAUDE.md + HANDOFF mis à jour ; identifiants Cloudinary consignés.
- **Sécu** ⚠️→✅ : aucune clé secrète dans le code (seulement Cloud name public + preset
  unsigned, par design). Risque résiduel **mineur** : un preset unsigned permet à
  n'importe qui d'uploader → spam possible consommant le quota. Acceptable vu la
  modération (rien n'est public sans validation) et le quota gratuit large. À surveiller :
  si abus, désactiver/regénérer le preset.
- **RGPD** ⚠️ : les photos déposées sont des données personnelles affichées sur un site
  public. La **modération de Laurent** est le garde-fou (consentement implicite de celui
  qui dépose + contrôle avant publication). Pas de collecte d'autres données (pas de nom
  /email demandé à l'upload).
- **Coût** ✅ : palier gratuit Cloudinary (≈25 Go), très largement suffisant. Aucun risque
  de facture.
- **QA** ✅ : chaîne complète testée en réel (upload → étiquette → affichage), sur ordi et
  bouton vérifié en ligne.

### Résultat
- `album.html` en ligne : bouton « Ajouter une photo » (Android + iPhone, sans compte)
  + galerie « Souvenirs » alimentée automatiquement par les photos validées par Laurent.
- Modération opérationnelle depuis ordi **et** iPhone (console + icône écran d'accueil).
