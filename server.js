// importer l'application app.js
const app = require("./app");

// Importer le package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
// console.log(dotenv);
const result = dotenv.config();
console.log(result);

// configurer le port avec la methode set de express. Attribut la valeur 5005 à port
app.set("port", process.env.PORT);

//  URL http://localhost:5005/ renvoie   "Hello world"
app.get('/', (req, res) => {
    res.send(`Hello World! vous êtes sur localhost et le port ${process.env.PORT} => URL http://localhost:3000/ !`)
  });

// Le serveur écoute les requêtes sur le port process.env.PORT  (5005)
app.listen(process.env.PORT, () => {
    console.log(`Express Application exemple à l'écoute sur le port ${process.env.PORT}!`)
 });