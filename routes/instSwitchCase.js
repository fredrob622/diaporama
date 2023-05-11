// import du module fs file system
const fs = require('fs');
const sharp = require('sharp');

// Declaration
const dirSrc = "../public/images/Osaka"  // définition du répertoire source
const newName = dirSrc.substring(dirSrc.lastIndexOf("/"),dirSrc.length);
const newDirName = dirSrc.substring(0,dirSrc.lastIndexOf("/")) + newName + "_thumb";
console.log(newName,newDirName);

let ville = newName;
let villeTab = [];

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

// Création de répertoire
async function createDir(newDirName) {

    fs.mkdir(newDirName, (err) => {
      if (err) {
        //console.log(err.message);
        console.log(`Le répertoire ${newDirName} existe déjà !`);
      }
      createNewNamePhoto(ville, villeTab);  
    })
};
// fonction recupérant les fichiers dans un répertoire et renvoyant un tableau
function ListFilesInDir(dir){
    let files = fs.readdirSync(dir)
    let array = []
    files.forEach(file => {
        array.push(file)
    });
    return array
}

// copie du fichier sous le nouveau nom
function copieFichier(repSrc,repDest,tabListeOldName,tabListeNewName){
       

       for ( index = 0; index < tabListeOldName.length; index++ ){

        const srcFile = `${repSrc}` + "/" + `${tabListeOldName[index]}`;
        const destFile = `${repDest}` + "/" + `${tabListeNewName[index]}`;
        fs.copyFileSync(srcFile,destFile);
      
       }
};

function convertInThumbnerNail(repSrc,repDest,tabListeOldName,tabListeNewName){
    

    // thumbnail width and height
    const thumbnailWidth = 200;
    const thumbnailHeight = 200;

    for ( index = 0; index < tabListeOldName.length; index++ ){

        const srcFile = `${repSrc}` + "/" + `${tabListeOldName[index]}`;
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
        thumbnailSharp.toFile(destFile)
        .then(() => {
        console.log('Thumbnail saved successfully');
        })
        .catch((err) => {
        console.error('Error saving thumbnail', err);
        });
     }
    }

function orientationPhoto(repDest,files){
    // Pour chaque fichier
    files.forEach(file => {
    const filePath = `${repDest}/${file}`;
    const filePathb = `${repDest}/${file}`;
    // Ouvrir le fichier
    sharp(filePath)
      .metadata()
      .then(metadata => {
        // Détecter l'orientation
        const orientation = metadata.orientation;
        // Afficher l'orientation
        console.log(`${file}: ${orientation}`);
        if(orientation === 6){
            // Roter l'image 90°
            sharp(filePath)
              .rotate(90)
              .toFile(filePathb, (err) => {
                if(err){
                  console.log(err);
                }
              });
        }
        //console.log(`${file}: ${orientation}`);
      });
  });
};



// Récupération des fichiers de dirSrc dans le tableau 
tabListeNamePhotos = ListFilesInDir(dirSrc);
// Création du répertoire ***_thumb
createDir(newDirName);
// Création du nom des photos ville***.jpeg
tabListeNewNamePhotos = createNewNamePhoto(ville, tabListeNamePhotos);

console.log(tabListeNamePhotos, tabListeNewNamePhotos);

// console.log(tabListeNamePhotos[0], tabListeNewNamePhotos[0]);

copieFichier(dirSrc,newDirName,tabListeNamePhotos,tabListeNewNamePhotos);

convertInThumbnerNail(dirSrc,newDirName,tabListeNamePhotos,tabListeNewNamePhotos);

//orientationPhoto(newDirName,tabListeNewNamePhotos);
// orientationPhoto(dirSrc,tabListeNamePhotos);
//orientationPhoto(newDirName,tabListeNewNamePhotos);