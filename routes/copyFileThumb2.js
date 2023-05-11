// Import express et router 
const express = require("express");
const fs = require('fs');
const sharp = require('sharp');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false}));

router.use(express.static('public'));
router.use(express.static('css'));
router.use(express.static('js'));
router.use(express.static('public/images'));

const path = require('path');
const { resolve } = require("path");
const { rejects } = require("assert");
//console.log(__dirname); D:\prog-nodeJS\diaporama\routes

// La __dirname variable renvoie toujours le chemin absolu de l'emplacement de vos fichiers.
router.get('/api/copyFileThumb2', (req, res, next) => { 
   res.render(path.join(__dirname + "./../IHM/copyFileThumb2.ejs"));
});

router.post('/api/copyFileThumb2', function(req, res, next) {
    if (req) {
        let dirVil      =    req.body.nom_vil ;
        let nameVille   =    dirVil;
        let nameDirVil  =    `${dirVil}` + "_thumb"
        dirSrc = "./public/images/" + `${dirVil}`
        dirVil = "./public/images/" + `${dirVil}` + "_thumb";

    //  fonction qui lit un réperoire 
    async function ListFilesInDir(dirFull, nameDir){
        let files = fs.readdirSync(dirFull)
        let array = []
        
        await convertInThumberNail(dirSrc,dirVil,tabListeNamePhotos,tabListeNewNamePhotos);
        files.forEach(file => {
            array.push("/" + nameDir + "/" + file);
            // array.push("/" + file);         
        });
        return array;
    }
    
    // fonction qui renvoie le nouveau nom du fichier (ville+index.JPG ex osaka001.JPG)
    function createNewNamePhoto(town, tabFiles){

        let index = 0;
        let array = [];
        for (file in tabFiles) {
    
            // incrémentation de l'index
            index++;      
            if (index < 10) {
                newNamePhoto = `${town}` + "00" +  `${index}` + ".JPG";
              
                array.push(newNamePhoto);
            } else if ( index < 100) {
                newNamePhoto = `${town}` + "0" +  `${index}`+ ".JPG";
                
                array.push(newNamePhoto);
            } else {
                newNamePhoto = `${town}` +  `${index}`;
                
            }
        }  
        return(array) 
    };

    // copie du fichier sous le nouveau nom
    function copieFichier(repSrc,repDest,tabListeOldName,tabListeNewName){
       
        for ( index = 0; index < tabListeOldName.length; index++ ){

        const srcFile = `${repSrc}` + "/" + `${tabListeOldName[index]}`;
        const destFile = `${repDest}` + "/" + `${tabListeNewName[index]}`;
        fs.copyFileSync(srcFile,destFile);
    
        }
    };

    //  fonction qui lit un réperoire 
	function ListFiles(dirFull, nameDir){
        let files = fs.readdirSync(dirFull)
        let array = []
        files.forEach(file => {
             array.push("/" + file);         
        });
        return array;
    }

    // convertion .../ville/p*****.jpg  .../ville/Osaka***.JPG
    function convertInThumberNail(repSrc,repDest,tabListeOldName,tabListeNewName){

        return new Promise((resolve, rejects) => {

            // thumbnail width and height
            const thumbnailWidth = 200;
            const thumbnailHeight = 200;
            let tableAff = [];
        
            for ( index = 0; index < tabListeOldName.length; index++ ){
        
                const srcFile = `${repSrc}` + `${tabListeOldName[index]}`;
                console.log(`srcFile: ${srcFile}`);
              
                const destFile = `${repDest}` + "/" + `${tabListeNewName[index]}`;
            
                // create a sharp object for the input file
                const inputSharp = sharp(srcFile);
        
                // resize the rotated image to the thumbnail size
                const thumbnailSharpB = inputSharp.resize(thumbnailWidth, thumbnailHeight );
                const thumbnailSharpC = thumbnailSharpB.withMetadata();
                const thumbnailSharp  = thumbnailSharpC.resize(thumbnailWidth, thumbnailHeight);             
        
                // save the thumbnail as a PNG file
                console.log(destFile);
                thumbnailSharp.toFile(destFile)
                .then(() => {
                    console.log('Thumbnail saved successfully');
                })
                .catch((err) => {
                    console.error('Error saving thumbnail', err);
                });

                tableAff[index] =  "./" + `${nameDirVil}` + "/" + `${tabListeNewName[index]}`;
                
                }
                return tableAff 
                resolve(tableAff); 
                
            })

        }
     
        // *** Programme principale  *** //  
        
        let ville = nameVille;
    
        tabListeNamePhotos = ListFiles(dirSrc,ville);
     
        tabListeNewNamePhotos = createNewNamePhoto(ville, tabListeNamePhotos);    

        copieFichier(dirSrc,dirVil,tabListeNamePhotos,tabListeNewNamePhotos);
        
        tabListeNamePhotos = ListFiles(dirSrc,nameDirVil);
        tabListeNamePhotos = ListFilesInDir(dirVil,nameDirVil);
        tabListeNamePhotos = ListFiles(dirVil,nameDirVil);
        res.status(200).render('afficheLieu', {  tabListeNamePhotos, nameVille });
    }
});

// Rend accessible l'objet router aux autres fichiers 
module.exports = router;
