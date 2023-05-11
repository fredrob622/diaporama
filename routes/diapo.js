// Import express et router 
const express = require("express"); // frameworks accélérer le développement des applications web
const fs = require('fs');           // read, write etc... 
const sharp = require('sharp');     // traitement d'images
const router = express.Router();    // pour créer des gestionnaires de route modulaires et pouvant être montés

// Afin de lire les données HTTP POST, nous devons utiliser le module node "body-parser".
// body-parser est un morceau de middleware express qui lit l'entrée d'un formulaire et le stocke en 
// tant qu'objet javascript accessible par l'intermédiaire de req.body.

const bodyParser = require('body-parser'); // Ce module  permet d’interpréter “parser”, le corps JSON d’une réponse HTTP.
router.use(bodyParser.urlencoded({ extended: false})); // fait de même pour les requêtes encodées en URL. 
                                                     // le extended: true précise que l' req.bodyobjet contiendra des valeurs 

const path = require('path');
//console.log(__dirname); D:\prog-nodeJS\diaporama\routes

router.use(express.static('public'));
router.use(express.static('css'));
router.use(express.static('js'));
router.use(express.static('public/images'));

router.get('/api/diapo', (req, res, next) => { 
       res.render(path.join(__dirname + "./../IHM/diapo_rech.ejs"));
    });

router.post('/api/diapo', function(req, res, next) {
    if (req) {
        let nomVille      =    req.body.nom_vil ; // Le nom dela ville ex Osaka
        let repImgVille   =    "./public/images/" + `${nomVille}`
        // console.log(repImgVille);
        let imgTab = [];
        fs.stat(repImgVille, (error, stats) => {
            if (error) {       
              console.log(error);
            }
            else {
              if (stats.isDirectory()){
                // console.log(repImgVille + " is a directory");
                // lecture des fichiers du répertoire
                let files = fs.readdirSync(repImgVille)
                // console.log("file: " + files)  contient nom img ex P1030621.JPG
                files.forEach(file => {
                     imgTab.push( "/" + nomVille + "/" + file);         
                 });
                 // console.log("imgTab: " + imgTab) ex ./public/images/Osaka/P1030716.JPG
                 // console.log(imgTab);
                 res.status(200).render('diapo_aff', { imgTab, nomVille }); // pour ejs
              };
            }
          });
    }
 });

// Rend accessible l'objet router aux autres fichiers 
module.exports = router;