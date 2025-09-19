# Petites Annonces (HTML/CSS/JS uniquement)

Application de petites annonces utilisable en ouvrant simplement `index.html` (aucun backend). Données et session stockées dans `localStorage`.

## Fonctionnalités
- Liste des annonces avec image, titre, description, catégorie, vendeur, prix, lieu, date d’ajout
- Recherche/filtre en direct (titre, description, vendeur, catégorie)
- Ajout d’une annonce (image par URL) – validation basique
- Suppression d’une annonce (réservée aux utilisateurs connectés)
- Authentification simplifiée côté client (nom d’utilisateur, pas de mot de passe)
- Responsive mobile-first
- Persistance locale (annonces + session)

## Lancer
- Double-cliquez sur `index.html` ou utilisez un Live Server.

## Notes
- Les images sont chargées via des URLs publiques (Unsplash) pour le seed. En mode hors-ligne, remplacez par des URLs locales.
- Aucune librairie externe ni appel réseau requis.
- Les données sont stockées dans le navigateur. Effacer le stockage local réinitialise les données.

## Structure
- `index.html` – UI (liste, recherche, modales login/ajout)
- `styles.css` – styles globaux + responsive
- `app.js` – logique (store localStorage, UI, auth)