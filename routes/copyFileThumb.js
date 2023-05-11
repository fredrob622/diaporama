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
console.log(__dirname);

// La __dirname variable renvoie toujours le chemin absolu de l'emplacement de vos fichiers.
router.get('/api/copyFileThumb', (req, res, next) => { 
   res.render(path.join(__dirname + "./../IHM/copyFileThumb.ejs"));
});

router.post('/api/copyFileThumb', function(req, res, next) {
    if (req) {
        let dirVil      =    req.body.nom_vil ;
        let nameVille   =    dirVil;
        let nameDirVil  =    `${dirVil}` + "_thumb"
        dirSrc = "./public/images/" + `${dirVil}`
        dirVil = "./public/images/" + `${dirVil}` + "_thumb";

        console.log(`nameVille: ${nameVille}`);
        console.log(`dirVil: ${dirVil}`);
        console.log(`nameDirVil: ${nameDirVil}`);

    //  fonction qui lit un réperoire 
    function ListFilesInDir(dirFull, nameDir){
        let files = fs.readdirSync(dirFull)
        let array = []
       
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

    // copie du fichier sous le nouveau nom
    function copieFichier(repSrc,repDest,tabListeOldName,tabListeNewName){
       
        for ( index = 0; index < tabListeOldName.length; index++ ){

        const srcFile = `${repSrc}` + "/" + `${tabListeOldName[index]}`;
        const destFile = `${repDest}` + "/" + `${tabListeNewName[index]}`;
        fs.copyFileSync(srcFile,destFile);
    
        }
    };

    // convertion .../ville/p*****.jpg  .../ville/Osaka***.JPG
    function convertInThumbnerNail(repSrc,repDest,tabListeOldName,tabListeNewName){

        // thumbnail width and height
        const thumbnailWidth = 200;
        const thumbnailHeight = 200;
        let tableAff = [];
    
        for ( index = 0; index < tabListeOldName.length; index++ ){
    
            // const srcFile = `${repSrc}` + "/" + `${tabListeOldName[index]}`;
            const srcFile = "./public/images" + `${tabListeOldName[index]}`;
            const destFile = `${repDest}` + "/" + `${tabListeNewName[index]}`;
           
            // create a sharp object for the input file
            const inputSharp = sharp(srcFile);

            // rotate the input image to orientation 1
            // const rotatedSharp = inputSharp.rotate(1);
    
            // resize the rotated image to the thumbnail size
            // const thumbnailSharp = rotatedSharp.resize(thumbnailWidth, thumbnailHeight);
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
          
            //tableAff[index] = `./public/images/` +  `${repDest}` + "/" + `${tabListeNewName[index]}`;
            //tableAff[index] =`${repDest}` + "/" + `${tabListeNewName[index]}`;
            tableAff[index] =  "./" + `${nameDirVil}` + "/" + `${tabListeNewName[index]}`;
           
         }
         return tableAff
        }
     
        let ville = nameVille;
        // let villeTab = [];

        // *** Programme principale  *** //     

        console.log(`nameVille: ${nameVille}`);
        console.log(`ville: ${ville}`);
        console.log(`dirSrc ${dirSrc}`);
        console.log(`dirVil ${dirVil}`);
       

        // // let tabListeDirPhotos = [];
      
        console.log(`nameDirVille: ${nameDirVil}`);
        tabListeNamePhotos = ListFilesInDir(dirSrc,ville);
        // console.log(`tabListeNamePhotos: ${tabListeNamePhotos}`);

        tabListeNewNamePhotos = createNewNamePhoto(ville, tabListeNamePhotos);
        // console.log(`tabListeNewNamePhotos: ${tabListeNewNamePhotos}`);
     
        // tabListeNamePhotos = ListFilesInDir(dirVil,nameDirVil);

        //  copieFichier(dirSrc,newDirName,tabListeNamePhotos,tabListeNewNamePhotos);
        //copieFichier(dirSrc,dirVil,tabListeNamePhotos,tabListeNewNamePhotos);
      
      
        convertInThumbnerNail(dirSrc,dirVil,tabListeNamePhotos,tabListeNewNamePhotos);
        tabListeNamePhotos = ListFilesInDir(dirVil,nameDirVil);
        console.log(tabListeNamePhotos);   
         res.status(200).render('afficheLieu', {  tabListeNamePhotos, nameVille });
}
});

// Rend accessible l'objet router aux autres fichiers 
module.exports = router;
