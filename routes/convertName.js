// Import express et router 
const { log } = require("console");
const express = require("express");
const router = express.Router();
const path = require("path");


// import du module fs file system
const fs = require('fs');
const { mainModule } = require("process");

// Pour servir des fichiers statiques tels que les images, les fichiers CSS et les fichiers 
// JavaScript, utilisez la fonction intégré express.static dans Express.

// le répertoire public/images/nom_rep
router.use(express.static('public'));

const dirSrc = "./public/02Osaka"  // définition du répertoire source

// Méthode de routage est dérivée de l’une des méthodes HTTP ex get
router.get( '/api/convertName', (req,res) => {})
    
    const newName = dirSrc.substring(dirSrc.lastIndexOf("/")+3,dirSrc.length);
    const newDirName = dirSrc.substring(0,dirSrc.lastIndexOf("/")+3) + newName + "_thumb";
    console.log(newName,newDirName);

function createDir(newDirName) {
  fs.mkdir(newDirName, (err) => {
    if (err) {
      console.log(err.message);
      console.log(`Le répertoire ${newDirName} existe déjà !`);

      fs.readdir(newDirName, (err, files) => {
        if (err) {
          console.log(err.message);
          return
        // } else {
        //   console.log(`Les fichiers dans le répertoire ${newDirName} sont :`);
        //   files.forEach(file => console.log(file));
         }
      //   })
        else {
        console.log(`Le répertoire ${newDirName} a été créé avec succès.`);
        fs.readdir(newDirName, (err, files) =>{
            if (err) {
              console.log(err.message);
            } else {
              console.log(`Les fichiers dans le répertoire ${newDirName} sont :`);
              files.forEach(file => console.log(file));
            }
        });  
    }})
   }
  })
}
  // console.log(tabFile);

  fs.cp(`${dirSrc}`, newDirName, {recursive: true}, (err) => {
    if (err) {
        console.log("Error Found", err);
    } else {
        fs.readdir(newDirName, (err, files) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log(`Les fichiers dans le répertoire ${newDirName} sont :`);
              files.forEach(file => console.log(file));
            }
          });
        }
    });

//createDir(newDirName);

// directory path
const directoryPath = newDirName;

// read the directory asynchronously
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory', err);
    return;
  }

  // array to store file names and directory name
  const fileArray = [];

  // iterate over the files and add their names and directory name to the array
  files.forEach((file) => {
    const filePath = `${directoryPath}/${file}`;
    const stats = fs.statSync(filePath);

    // if (stats.isFile()) {
    //   const fileInfo = {
    //     directory: directoryPath,
    //     filename: file
    //   };
    //   //fileArray.push(fileInfo);
      
    // }
    fileArray.push(filePath);
    //}
  });

  console.log('Files in directory:', fileArray[2]);
})
 module.exports = router;