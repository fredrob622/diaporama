console.log("diaporama.js")

function diapo(){
    // Récupérer le nom du répertoire d'images
    var repertoire = prompt("Veuillez entrer le nom du répertoire d'images :");

    // Récupérer toutes les images du répertoire et de ses sous-répertoires
    var images = [];
    function getImagesFromDirectory(dir) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", dir, false);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
        var fileNames = xhr.responseText.split("\n");
        for (var i = 0; i < fileNames.length; i++) {
            var fileName = fileNames[i].trim();
            if (fileName !== "") {
            var fileExt = fileName.split(".").pop().toLowerCase();
            if (fileExt === "JPG" || fileExt === "jpeg" || fileExt === "png") {
                images.push(dir + "/" + fileName);
               
            }
            }
        }
        }
    };
    xhr.send();
    }
    console.log(repertoire);
    getImagesFromDirectory("public/images/" + repertoire);
    //console.log(__dirname); D:\prog-nodeJS\diaporama\routes
    
    // Créer le diaporama
    var currentIndex = 0;

    function showImage() {
    var img = new Image();
    img.onload = function() {
        var imgContainer = document.getElementById("img-container");
        imgContainer.innerHTML = "";
        imgContainer.appendChild(img);
    };
    img.src = images[currentIndex];
    }

    function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
    }

    function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
    }

    // Détecter l'orientation des images
    function detectOrientation(imageUrl, callback) {
    var img = new Image();
    img.onload = function() {
        var orientation;
        if (img.width > img.height) {
        orientation = "horizontal";
        } else if (img.width < img.height) {
        orientation = "vertical";
        } else {
        orientation = "square";
        }
        callback(orientation);
    };
    img.src = imageUrl;
    }

    // Lancer le diaporama avec la première image
    detectOrientation(images[currentIndex], function(orientation) {
    var imgContainer = document.createElement("div");
    imgContainer.id = "img-container";
    imgContainer.className = orientation;
    document.body.appendChild(imgContainer);
    showImage();
    });

    // Ajouter les boutons de navigation
    var nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.onclick = nextImage;
    document.body.appendChild(nextButton);

    var prevButton = document.createElement("button");
    prevButton.textContent = "Prev";
    prevButton.onclick = prevImage;
    document.body.appendChild(prevButton);

}