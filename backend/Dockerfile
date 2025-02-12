# Étape 1: Utiliser une image Node.js officielle comme base
FROM node:16

# Étape 2: Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Étape 3: Copier le package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Étape 4: Installer les dépendances du projet
RUN npm install

# Étape 5: Copier le reste du code source dans le conteneur
COPY . .

# Étape 6: Exposer le port que l'application va utiliser
EXPOSE 3000

# Étape 7: Démarrer l'application
CMD ["npm", "start"]
