#!/bin/bash

# Installer les dépendances Composer
echo "Installation des dépendances Composer..."
composer install

echo "Démarrage du script d'entrée..."

until php bin/console doctrine:query:sql "SELECT 1"; do
  echo "En attente de la base de données à $(date)..."
  sleep 2
done

echo "Connexion à la base de données établie."

# Créer la base de données (si nécessaire)
echo "Création de la base de données si elle n'existe pas..."
php bin/console doctrine:database:create --if-not-exists

# Exécuter les migrations
echo "Exécution des migrations..."
php bin/console doctrine:migrations:migrate --no-interaction

# Vider le cache (si nécessaire, mais souvent pas indispensable après les migrations)
# echo "Vidage du cache..."
# php bin/console cache:clear

chmod -R 777 public/img/player/ 

# Lancer la commande par défaut (dans ce cas, php-fpm)
echo "Lancement de la commande par défaut..."
exec "$@"