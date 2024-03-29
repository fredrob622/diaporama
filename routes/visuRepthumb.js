// Import express et router 
const express = require("express");
const fs = require('fs');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false}));

router.use(express.static('public'));
router.use(express.static('css'));
router.use(express.static('js'));
router.use(express.static('public/images'));

const path = require('path');
//console.log(__dirname); D:\prog-nodeJS\diaporama\routes

// La __dirname variable renvoie toujours le chemin absolu de l'emplacement de vos fichiers.
router.get('/api/visurepthumb', (req, res, next) => { 
   res.render(path.join(__dirname + "./../IHM/rechercheLieu.ejs"));
});


router.post('/api/visurepthumb', function(req, res, next) {
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

        function createNewNamePhoto(town, tabFiles){

            let index = 0;
            let array = [];
            for (file in tabFiles) {
        
                // incrémentation de l'index
                index++;      
                if (index < 10) {
                    newNamePhoto = `${town}` + "00" +  `${index}` + ".JPG";
                    // console.log("Photo:" + newNamePhoto); 
                    array.push(newNamePhoto);
                } else if ( index < 100) {
                    newNamePhoto = `${town}` + "0" +  `${index}`+ ".JPG";
                    // console.log("Photo:" + newNamePhoto); 
                    array.push(newNamePhoto);
                } else {
                    newNamePhoto = `${town}` +  `${index}`;
                    // console.log("Photo:" + newNamePhoto); 
                }
            }  
            return(array) 
        };
        
        //let tabListeDirPhotos = [];
        tabListeNamePhotos = ListFilesInDir(dirVil,nameDirVil);
        console.log(tabListeNamePhotos);


        console.log(tabListeNamePhotos); 
        res.status(200).render('afficheLieu', { tabListeNamePhotos, nameVille }); // pour ejs
    }
});

// Rend accessible l'objet router aux autres fichiers 
module.exports = router;


