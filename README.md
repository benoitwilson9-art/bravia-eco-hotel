# Bravia Eco Hotel Lomé — Application de réservation hôtelière

Projet intégrateur — Développement Web Niveau Approfondi (D-CLIC)
Réalisé par **Wilson Adjete Benoit**

## Présentation

Application web complète permettant aux clients de consulter les chambres disponibles, réserver un séjour en ligne, suivre leurs réservations et laisser des avis — et à l'administration de gérer les chambres et les réservations depuis un tableau de bord dédié.

## Technologies

- **Front-end** : React (Vite), React Router, Axios, Context API
- **Back-end** : Laravel 13, Laravel Sanctum (authentification par token)
- **Base de données** : MySQL
- **Tests** : PHPUnit (Laravel), Selenium IDE (parcours fonctionnels)

## Fonctionnalités

- Catalogue des chambres avec filtres (type, prix, dates de disponibilité)
- Réservation en ligne avec vérification de disponibilité en temps réel
- Paiement simulé
- Avis clients (note + commentaire)
- Espace client (suivi des réservations)
- Tableau de bord administrateur (gestion des chambres et des réservations)

## Installation

### Back-end (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configurer DB_DATABASE, DB_USERNAME, DB_PASSWORD dans .env
php artisan migrate --seed
php artisan install:api
php artisan serve
```

### Front-end (React)

```bash
cd frontend
npm install
npm run dev
```

## Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|---------------|
| Administrateur | admin@bravia.tg | admin1234 |

## Tests

- Tests back-end : `cd backend && php artisan test`
- Tests fonctionnels : scénarios Selenium IDE fournis dans `/tests-selenium` (fichier `.side`)