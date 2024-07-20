#!/bin/bash

# Vérifie si Node.js est installé
if ! command -v node &> /dev/null
then
    echo "Node.js n'est pas installé. Installation de Node.js..."
    # Installe Node.js (version LTS)
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Node.js est déjà installé."
fi

# Vérifie si npm est installé
if ! command -v npm &> /dev/null
then
    echo "npm n'est pas installé. Installation de npm..."
    sudo apt-get install -y npm
else
    echo "npm est déjà installé."
fi

# Crée les répertoires nécessaires
mkdir -p uploads

# Installe les dépendances npm
if [ -f package.json ]; then
    echo "Installation des dépendances npm..."
    npm install
else
    echo "Aucun package.json trouvé. Assurez-vous que le fichier existe dans le répertoire courant."
    exit 1
fi

# Démarre l'application Node.js
echo "Démarrage de l'application Node.js..."
node app.js
