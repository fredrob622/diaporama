//   <!-- JavaScript pour le diaporama -->

    // Récupérer les images depuis Node.js (exemple avec un tableau d'URLs d'images)
    const imgTab = <%- JSON.stringify(imgTab) %>;
  
    // Variables pour le diaporama
    let currentIndex = -1;
    var tempo = 2000;
    var diapoRun = true;
    const slideshowImages = document.querySelector('.slideshow-images');

    // retour au début du diporama
    function razDiapo(){
        diapoRun = true;
        currentIndex = 0;
        slideshowImages.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
    
    // Régler la temporisation
    function setTempo(){
        tempo = prompt("Entrer l'intervalle entre 2 photos en seconde: ")
        tempo = tempo * 1000;
    }; 

    // Démarrage du diaporama
    function startDiapo(){       
        // Lancer le diaporama
        intervalID = setInterval(changeImage, tempo); // Délai en mili-secondes entre chaque image  
    };

    // Fonction pour changer d'image
    function changeImage() {
      currentIndex++;
      if (currentIndex === imgTab.length) {
        currentIndex = 0;
      }
      slideshowImages.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Mise en pause (Arrêt) du diaporama
    function demarrer(){
        if(diapoRun){
            // demarrer le diaporama
            startDiapo();
            document.getElementById("action-start").innerHTML = "Pause";
        } else {
            // met en pause le diaporama
            clearInterval(intervalID);
            document.getElementById("action-start").innerHTML = "Start";
        }
        diapoRun = !diapoRun;
    };

    var slideIndex = 0;    

    function currentSlide(n) {
        showSlides(slideIndex = n);
        };

    showSlides(slideIndex);

    function showSlides(n) {
        var j;
        var slides = document.getElementsByClassName("slideshow-images");
            
        if (n > slides.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides.length}
            for (j= 0; j < slides.length; j++) {
                changeImage()
            }
        };

    function plusSlides(n) {    
        if (n > 0) {
            console.log(`currentIndex " ${currentIndex}`);
            currentIndex = currentIndex + n ;
            slideshowImages.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
        else{
            if(currentIndex > 0){
                currentIndex = currentIndex + n ;
                slideshowImages.style.transform = `translateX(-${currentIndex * 100}%)`;
                }
            }
        } 
    
        