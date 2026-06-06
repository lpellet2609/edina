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

