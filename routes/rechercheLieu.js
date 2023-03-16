// Import express et router 
const express = require("express");
<<<<<<< HEAD
const fs = require('fs');
=======
>>>>>>> e7e97612d29f60493d8675cbbea168f302eee5a7
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false}));

router.use(express.static('public'));
router.use(express.static('css'));
router.use(express.static('js'));
<<<<<<< HEAD
router.use(express.static('public/images'));
=======
>>>>>>> e7e97612d29f60493d8675cbbea168f302eee5a7

const path = require('path');
console.log(__dirname);

<<<<<<< HEAD
// La __dirname variable renvoie toujours le chemin absolu de l'emplacement de vos fichiers.
router.get('/api/rechercheLieu', (req, res, next) => { 
   res.render(path.join(__dirname + "./../IHM/rechercheLieu.ejs"));
});


router.post('/api/rechercheLieu', function(req, res, next) {
    if (req) {
        let dirVil      =    req.body.nom_vil ;
        let nameVille   = dirVil;
        let nameDirVil  =    `${dirVil}` + "_thumb"
        dirVil = "./public/images/" + `${dirVil}` + "_thumb";

        function ListFilesInDir(dirFull, nameDir){
            let files = fs.readdirSync(dirFull)
            let array = []
           
            files.forEach(file => {
                array.push("/" + nameDir + "/" + file);         
            });
            return array;
        }
        
        //let tabListeDirPhotos = [];
        tabListeNamePhotos = ListFilesInDir(dirVil,nameDirVil);
        console.log(tabListeNamePhotos);


        console.log(tabListeNamePhotos); 
        res.status(200).render('afficheLieu', { tabListeNamePhotos, nameVille }); // pour ejs
    }
=======
router
.get('/api/rechercheLieu', (req, res, next) => { 
   res.render(path.join(__dirname + "./../IHM/rechercheLieu.ejs"));
});

router.post('/api/rechercheLieu', function(req, res, next) {
    console.log() 
    res.status(200).render('rechercheLieu', "toto"); // pour ejs
>>>>>>> e7e97612d29f60493d8675cbbea168f302eee5a7
});

// Rend accessible l'objet router aux autres fichiers 
module.exports = router;


