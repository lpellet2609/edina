# CLAUDE.md — Projet mémorial Edina

## Le site

Site mémorial pour **Koszmovszky Edina Franciska** (1938–2026), hébergé sur GitHub Pages.

- **URL** : https://lpellet2609.github.io/edina/
- **Repo** : `lpellet2609/edina` (branche `main`)
- **Stack** : HTML/CSS/JS statique, un seul fichier `index.html` + `repas.html`
- **Langues** : français et hongrois, gérées par `html[lang]` + attributs `data-lang`

## Structure des fichiers

```
index.html      — page principale (cérémonies, infos pratiques, taxi, restaurant)
repas.html      — page protégée par code pour les invités au déjeuner (code : Budapest)
messages.json   — fichier présent mais non utilisé (remplacé par édition directe du HTML)
CLAUDE.md       — ce fichier
```

## Fonctionnalités déjà en place

- **Bandeau "Messages de dernière minute"** : juste au-dessus du faire-part.
  Le propriétaire dicte un message dans ce chat → Claude édite le HTML → site mis à jour en 1-2 min.
  Structure : dernier message visible, anciens messages dépliables (bouton toggle), bilingue FR/HU.

- **Page restaurant (`repas.html`)** : accès par code "Budapest" depuis le bas de `index.html`.
  Contenu vide — les infos du déjeuner seront ajoutées quand le frère les communiquera.

- **Infos pratiques** : taxi (City Taxi +36 1 211 1111, Főtaxi +36 1 222 2222),
  stationnement, entrée cimetière 300 HUF cash, itinéraire.

## Fonctionnalité à construire (prochain chat)

### Transcription en direct de la messe

**Contexte** : messe bilingue FR/HU le 3 juin 2026 à Budapest, 9h00.
Le propriétaire appuie sur "Démarrer" depuis son téléphone → le micro capte la messe →
le texte apparaît en direct pour les visiteurs du site, dans leur langue.

**Architecture validée** :

```
Téléphone (micro) → Serveur Railway → AssemblyAI (transcription + détection FR/HU)
                                             │
                              ┌──────────────┴──────────────┐
                         Canal FR                       Canal HU
                    (FR détecté = direct          (HU détecté = direct
                     HU détecté = DeepL)           FR détecté = DeepL)
                              │                            │
                    Fenêtre prompteur FR        Fenêtre prompteur HU
```

**Affichage côté visiteurs** :
- PAS intégré dans la page existante
- Un bouton discret sur chaque version linguistique :
  - FR : *"Écouter la transcription en direct"*
  - HU : *"Élő átírás meghallgatása"*
- Chaque bouton ouvre une **nouvelle fenêtre indépendante** (popup)
- Style prompteur : texte large, défilement automatique vers le bas

**Délai attendu** : 2 à 5 secondes (inévitable, acceptable pour une messe)

### Comptes et services

| Service | Statut | Usage |
|---|---|---|
| AssemblyAI | ✅ compte existant (app "Table ronde IA") | Transcription temps réel + détection langue |
| DeepL | ❌ à créer | Traduction FR↔HU |
| Railway | ✅ compte existant (autres apps déjà déployées) | Hébergement serveur WebSocket Node.js |

### Ordre de travail prévu

1. Créer le compte DeepL et récupérer la clé API
2. Récupérer la clé API AssemblyAI existante
3. Créer et déployer le serveur Railway (Node.js, WebSocket)
4. Créer les fenêtres prompteur (HTML autonomes ou pages dans le repo)
5. Ajouter les boutons sur `index.html`
6. Tester ensemble avant le 3 juin

## Workflow Git

- Développement sur `main` directement (site simple, pas de PR nécessaire)
- Push vers `origin main` → GitHub Pages se met à jour en ~1-2 minutes
- Commandes habituelles : `git add`, `git commit`, `git push origin main`

## Propriétaire

- Email : lpellet@gmail.com
- Profil : non-développeur — vulgariser, guider pas à pas, demander validation avant de coder
- Téléphone utilisé sur place le jour J pour démarrer la transcription
