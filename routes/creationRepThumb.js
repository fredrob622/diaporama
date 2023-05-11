// import du module express pour utiliser les méthodes
const express = require("express");
const router = express.Router();
const fs = require("fs");

router.use(express.static('public'));
router.use(express.static('css'));
router.use(express.static('js'));
router.use(express.static('public/images'));

const path = require('path');
console.log(__dirname);

// La __dirname variable renvoie toujours le chemin absolu de l'emplacement de vos fichiers.
router.get('/api/creationRepThumb', (req, res, next) => { 
    res.render(path.join(__dirname + "./../IHM/creationRepThumb"));
 });

 router.post('/api/creationRepThumb', function(req, res, next) {
    if (req) {
        let dirVil      =    req.body.nom_vil ;
        let nameVille   =    dirVil;
        let nameDirVil  =    `${dirVil}` + "_thumb";
        let imagesDir   =   "./public/images";
        dirVil = "../public/images/" + `${dirVil}` + "_thumb";
        console.log(nameVille,  nameDirVil , dirVil);

        console.log("Checking for directory " + path.join(__dirname, dirVil));

        // Using fs.exists() method to check that the directory exists or not
        fs.exists(path.join(__dirname, dirVil), (err, exists)=> {
            if (err){
                console.log(exists ? "Not found!"   : "The directory already exists");
            }
            else {
                fs.mkdirSync(path.join(__dirname, dirVil));
                console.log(path.join(__dirname, dirVil));
            }
            
        });

        // fonction recupérant les fichiers dans un répertoire et renvoyant un tableau
        function ListFilesInDir(dir){
            let files = fs.readdirSync(dir)
            let array = []
                files.forEach(file => {
                    array.push(file)
                });
            return array
        };

        imagesListFiles = ListFilesInDir(imagesDir);
        console.log(imagesListFiles);
       
        res.status(200).render('affContenuRep', { imagesListFiles, imagesDir }); // pour ejs
    }
});

 // Rend accessible l'objet router aux autres fichiers 
module.exports = router;