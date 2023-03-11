// Import express et router 
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false}));

router.use(express.static('public'));
router.use(express.static('css'));
router.use(express.static('js'));

const path = require('path');
console.log(__dirname);

router
.get('/api/rechercheLieu', (req, res, next) => { 
   res.render(path.join(__dirname + "./../IHM/rechercheLieu.ejs"));
});

router.post('/api/rechercheLieu', function(req, res, next) {
    console.log() 
    res.status(200).render('rechercheLieu', "toto"); // pour ejs
});

// Rend accessible l'objet router aux autres fichiers 
module.exports = router;


