const ejs = require('ejs');  // EJS (Embedded JavaScript Templating) est l'un des moteurs de modèles pour générer du HTML.
const express = require("express");
// La fonction express.Router() est utilisée pour créer un nouvel objet routeur dans 
// votre programme pour gérer les requêtes. 
// Valeur de retour : cette fonction renvoie le nouvel objet routeur
const router = express.Router();

// creation d'une instance express serveur web et la place dans la variable APP
const app = express();

// Définition du moteur d'affichage
app.set('view engine', 'ejs');
// views, le répertoire dans lequel se trouvent les fichiers modèles. 
// répertoire où sont les fichiers ejs
app.set('views', 'IHM');


// import des routes 

const rechercheLieu = require("./routes/rechercheLieu");
const creationRepThumb = require("./routes/creationRepThumb");

// configuration du middleware
// Définition des rechercheLieu routes 
// Chaque app.use(middleware) est appelée à chaque fois qu'une requête est envoyée au serveur.
// utiliser app.use() sans spécifier l'URL de la requête. Dans un tel cas, ce qu'il fait, 
// c'est qu'il est exécuté à chaque fois, quelle que soit l'URL qui a été touchée.

app.use(rechercheLieu);
app.use(creationRepThumb);

module.exports = app;