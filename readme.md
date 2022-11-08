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

Le fichier dataGenerator va générer et envoyer des données de température et d'humidité, au rythme de une donnée toutes les 2 secondes (Temperature + Humidité), sur la route POST 'http://localhost:3001/data'.

Le projet que nous lancons avec `npm start`est un projet Node, utilisant la librairie **Express** pour créer une API.

 - `./app.js`: fichier de base qui va importer les **middlewares** et la **route**.
 - `./routes/data.js `: fichier qui va exposer la **route** `POST/data`, on récupère les données de la requête, les décodons et les envoyons à **InFluxDB**.
 - `./utils/decoder.js`: fichier qui exporte une fonction permettant de décoder l'information envoyer par le capteur.
 - `./utils/influxWorker.js`: fichier permettant de se connecter à la base de données et exporte une fonction pour écrire un **Point** dans Influx. Toutes les deux requêtes envoyées, on envoie sur une machine différente. Machine 1, ou machine 2. Cela permet de simuler deux capteurs différents sans avoir à lancer deux fois la génération de données.

## Grafana

![alt text](https://raw.githubusercontent.com/antoine-anthime/projetIoT/master/public/grafana.png)

- Sur l'interface, il est possible de sélectionner le capteur pour lequel on veut visionner les données, tout en haut à gauche.
- Le diagramme affiche les données valides et non valides pour le capteur. Il intègre les deux trames (Temperature et Humidité).
- Le graphique dynamique de gauche affiche en temps réel la température envoyée par le capteur sélectionné au dessus.
- Le graphique dynamique de droite affiche en temps réel l'humidité envoyée par le capteur sélectionné au dessus.


