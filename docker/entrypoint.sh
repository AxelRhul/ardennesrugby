#!/bin/bash

until php bin/console doctrine:query:sql "SELECT 1" > /dev/null 2>&1; do
  echo "En attente de la base de données..."
  sleep 2
done

# Installer les dépendances Composer
composer install --no-interaction --optimize-autoloader

# Créer la base de données (si nécessaire)
php bin/console doctrine:database:create --if-not-exists

# Exécuter les migrations
php bin/console doctrine:migrations:migrate --no-interaction

# Vider le cache (si nécessaire, mais souvent pas indispensable après les migrations)
# php bin/console cache:clear

# Lancer la commande par défaut (dans ce cas, php-fpm)
exec "$@"