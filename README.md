# Fichier README.md du projet Diaporama
----------------------------------------------------------------------------------------------
Le but: faire un diaporama en nodeJS

> Entrer un répertoire contenant des photos.  
Le nombre de photos dans le répertoire est aléatoire.  
L'orientation des photos peut être verticale ou horizontal.
----------------------------------------------------------------------------------------------
1. # initialisation du projet

	- Intallation de pnpm   
	---------------------
		npm install -g pnpm

    - Initialisation du projet pour créer le fichier package.json
	------------------------------------------------------------

		pnpm init
		Wrote to D:\prog-nodeJS\diaporama\package.json

		{
		  "name": "diaporama",
		  "version": "1.0.0",
		  "description": "",
		  "main": "index.js",
		  "scripts": {
			"test": "echo \"Error: no test specified\" && exit 1"
		  },
		  "keywords": [],
		  "author": "",
		  "license": "ISC"
		}

     - Initialisation git
	 --------------------
	 
		git init
		Initialized empty Git repository in D:/prog-nodeJS/diaporama/.git/
		
		création du fichier .gitignore
		
		cat .gitignore
		node_modules
		
	 - Création du repository sur **github**
	 ---------------------------------------
	 
	 - Premier commit git
	 --------------------
	 
		git add .
			warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it
			warning: in the working copy of 'pnpm-lock.yaml', LF will be replaced by CRLF the next time Git touches it
	    git commit -m "premier commit" -m "Contenant que le serveur express"
			[master (root-commit) 4eac755] premier commit
			90 files changed, 476 insertions(+)
		
		git branch
		
		git remote add origin https://github.com/fredrob622/diaporama.git
        git push -u origin master
		
2. # Initialisation des modules

	- Installation de module dotenv 
	-------------------------------
	
		dotenv charge les variables d'environnement d'un fichier .env dans process.env

		pnpm install dotenv --save
		
		Après création du fichier .env
		
		// pas de ; après les définition
		PORT = 5005
		
	- Installation de module express
	-------------------------------
	 
		Express est un cadre d'application Web Node.js minimal et flexible qui fournit un ensemble robuste de fonctionnalités  
		pour les applications Web et mobiles.
	 
		pnpm install express --save
		
3. # Diagramme du server http

	- Fichier server.js
	-------------------
	
		const app = require("./app");

		// Importer le package pour utiliser les variables d'environnement
		const dotenv = require("dotenv");
			// importer l'application app.js
		// console.log(dotenv);
		const result = dotenv.config();
		console.log(result);

		// configurer le port avec la methode set de express. Attribut la valeur 5005 à port
		app.set("port", process.env.PORT);

		//  URL http://localhost:5005/ renvoie   "Hello world"
		app.get('/', (req, res) => {
			res.send(`Hello World! vous êtes sur localhost et le port ${process.env.PORT} => URL http://localhost:3000/ !`)
		  });

		// Le serveur écoute les requêtes sur le port process.env.PORT  (3000)
		app.listen(process.env.PORT, () => {
			console.log(`Express Application exemple à l'écoute sur le port ${process.env.PORT}!`)
		 });
		 
	- Fichier app.js
	----------------
	
		const express = require("express");

		// creation d'une instance express serveur web et la place dans la variable APP
		const app = express();

		module.exports = app;
	
	- Démarrage du serveur
	----------------------
	
		nodemon server.js
		
		[nodemon] 2.0.15
		[nodemon] to restart at any time, enter `rs`
		[nodemon] watching path(s): *.*
		[nodemon] watching extensions: js,mjs,json
		[nodemon] starting `node server.js`
		{ parsed: { PORT: '5005' } }
		Express Application exemple à l'écoute sur le port 5005!
		
		
		Navigateur http://localhost:5005/
		
		Hello World! vous êtes sur localhost et le port 5005 => URL http://localhost:3000/ !
		
		
	
		