# Projet IoT
Antoine | Alan | Patryk KIT5
## Lancement du projet

Pour procéder au démarrage du système, il faut lancer tous les services :
 - **Grafana** sur le port 3000
 - **InFluxDB** sur le port 8086
 - **API** : Naviguer dans projet node, puis`npm install`et`npm start`
 - **Le script de génération de données** : Naviguer dans le dossier du projet node et lancer `node /utils/dataGenerator.js`

## Configuration

 - Le fichier de conf du projet node se trouve dans `./.env`
 - **INFLUXDB_TOKEN** : Token d'accès à InFlux
 - **ORG**: Le nom de l'organisation
 - **BUCKET**: Le nom du bucket (En l'occurence la temperature)


## Le fonctionnnement

Le fichier dataGenerator va générer et envoyer des données de température, au rythme de une donnée toutes les 2 secondes, sur la route POST 'http://localhost:3001/data'.

Le projet que nous lancons avec `npm start`est un projet Node, utilisant la librairie **Express** pour créer une API.

 - `./app.js`: fichier de base qui va importer les **middlewares** et la **route**.
 - `./routes/data.js `: fichier qui va exposer la **route** `POST/data`, on récupère les données de la requête, les décodons et les envoyons à **InFluxDB**.
 - `./utils/decoder.js`: fichier qui exporte une fonction permettant de décoder l'information envoyer par le capteur.
 - `./utils/influxworker.js`: fichier permettant de se connecter à la base de données et exporte une fonction pour écrire un **Point** dans Influx.

## Grafana
- Sur l'interface configurée, le grand graphique dynamique affiche en temps réel la température envoyée par le **capteur choisi**. (Le choix s'effectue dans la case "sensor code")
- Le diagramme affiche les données valides et non valides pour les **deux capteurs**.
- Le graphique dynamique en bas à gauche affiche en temps réel la température envoyée par le **capteur 40**.
- Le graphique dynamique en bas à droite affiche en temps réel la température envoyée par le **capteur 50**.

