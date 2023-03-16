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
        let nameVille   = dirVil;
        let nameDirVil  =    `${dirVil}` + "_thumb"
        dirVil = "../public/images/" + `${dirVil}` + "_thumb";
        console.log(nameVille,  nameDirVil , dirVil);

        console.log("Checking for directory " + path.join(__dirname, dirVil));

        // Using fs.exists() method to check that the directory exists or not
        fs.exists(path.join(__dirname, dirVil), (err, exists)=> {
            if (err){
                console.log(exists ? "The directory already exists"  : "Not found!");
            }
            else {
                fs.mkdirSync(path.join(__dirname, dirVil));
                console.log(path.join(__dirname, dirVil));
            }
            
        });

        

        // Using fs.mkdirSync() method to create the directory
        // fs.mkdirSync(path.join(__dirname, dirVil));

        // Using fs.exists() method to check that the directory exists or not
        // fs.exists(path.join(__dirname, dirVil), exists => {

        //     console.log(path.join(__dirname, dirVil));
        //     console.log(exists ? "The directory already exists"  : "Not found!");
        //  });

        // // Création de répertoire
        // async function createDir(newDirName) {

        //     fs.mkdir(newDirName, (err) => {
        //     if (err) {
        //         //console.log(err.message);
        //         console.log(`Le répertoire ${newDirName} existe déjà !`);
        //     }
        //     createNewNamePhoto(ville, villeTab);  
        //     })
        // };
        // // fonction recupérant les fichiers dans un répertoire et renvoyant un tableau
        // function ListFilesInDir(dir){
        //     let files = fs.readdirSync(dir)
        //     let array = []
        //     files.forEach(file => {
        //         array.push(file)
        //     });
        //     return array
        // }

    }
});

 // Rend accessible l'objet router aux autres fichiers 
module.exports = router;