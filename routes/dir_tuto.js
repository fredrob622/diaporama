const fs = require("fs").promises;  // pour avoir les méthodes asynchrone afin d'avoir des promesse

// création fonction asynchrone main

async function main() {
    // permet de récupérer les fichiers
    await listeFichier("./public"); // /02Osaka");
    await filesList("./public");
};

main();

async function listeFichier(folderName){
    const storeFiles = await fs.readdir(folderName);
    console.log(storeFiles);
}

async function filesList(folderName){
  let filesTab = [];

  const items = await fs.readdir(folderName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      filesTab = filesTab.concat(
        await filesList(`${folderName}/${item.name}`)
      );
  } else {
        // if (item.name === "P*.JPG"){
            filesTab.push(`${folderName}/${item.name}`);
        //}
     }
  }
  console.log(filesTab);
  return filesTab;
  
};
