const http = require("http");  // import le package http pour avoir les méthodes
console.log("contenu de http: " );
//console.log(http);

// importer l'application app.js
const app = require("./app");

// Importer le package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
// console.log(dotenv);
const result = dotenv.config();
console.log(result);



// configurer le port avec la methode set de express. Attribut la valeur 3000 à port
// app.set("port", 3000);
app.set("port", process.env.PORT);
// Création d'une instance server qui fait tourner le programme app à chaque requête http reçu
const server = http.createServer(app);
// Le serveur écoute les requêtes sur le port process.env.PORT  (3000)
server.listen(process.env.PORT);