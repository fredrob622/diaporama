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

		Pour modifier le texte d'un commit
		git commit --amend
		
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
	 
		**Express** est un cadre d'application Web Node.js minimal et flexible qui fournit un ensemble robuste de fonctionnalités  
		pour les applications Web et mobiles.
		
		**Express** : Express dans son ensemble est connu comme un framework, pas seulement comme un module.  
		Il vous donne une API, des sous-modules, des fonctions, une méthodologie et des conventions pour taper  
		ensemble rapidement et facilement tous les composants nécessaires à la mise en place d'un serveur Web moderne  
		et fonctionnel avec toutes les commodités nécessaires pour cela (hébergement d'actifs statiques, modèles, gestion CSRF,  
		CORS, analyse des cookies, traitement des données POST et bien d'autres fonctionnalités).
		
		Autre module pas besoin d'installer  
		
		HTTP : il s'agit d'un module intégré qui est préinstallé avec NodeJS. Il est utilisé pour créer un serveur  
		et établir des connexions. Grâce à cette connexion, l'envoi et la réception de données peuvent être effectués  
		tant que les connexions utilisent un protocole de transfert hypertexte.
	 
		pnpm install express --save
		
3. # Fichier du server http

	- Fichier server.js
	-------------------
		// La fonction de base de require consiste à lire un fichier JavaScript, à exécuter le fichier 
		// et à renvoyer l'objet exporté avec exports. 
	
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
		
		Hello World! vous êtes sur localhost et le port 5005 => URL http://localhost:5005/ !

4. # modules à installer

		pnpm install dotenv
        pnpm install expres
		pnpm install sharp
		pnpm install ejs
		pnpm install body-parser
		
5. # Définition dans node.js

		**Require** consiste à lire un fichier JavaScript, à exécuter le fichier et à renvoyer l'objet exporté avec exports. 

		**Export** permettent à l'utilisateur d'exporter ses objets et méthodes créés vers d'autres programmes
		
		**Routage** fait référence à la définition de points finaux d’application (URI) et à la façon dont ils répondent aux demandes client.
		
		**Express** prend en charge les méthodes de routage suivantes qui correspondent aux méthodes HTTP: get,post,put...

		## **Le middleware**
		
		**Le middleware** dans node.js est une fonction qui aura tous les accès pour demander un objet, répondre à un objet et passer à la fonction middleware suivante dans le cycle demande-réponse de l'application .
		
		Les fonctions **middleware** sont des **fonctions** qui ont accès à l'objet de requête (req), à l'objet de  réponse (res) et à la fonction middleware suivante dans le cycle requête-réponse de l'application . 

		La fonction middleware suivante est généralement désignée par une variable nommée next

		## Méthodes **GET et POST**

		Les deux méthodes **GET et POST** sont utilisées pour transférer des données du client au serveur avec le protocole HTTP. La différence clé entre les méthodes POST et GET est que GET transporte le paramètre dans la chaîne d’URL, tandis que POST transporte le paramètre dans le corps du message, ce qui le rend plus sûr le transfère des données du client au serveur avec le protocole http.

		## le router Express.Router

		Les routeurs Express sont un moyen d'organiser votre application Express de sorte que votre fichier app.js principal ne devienne pas gonflé et difficile à raisonner.

		Les routeurs Express sont un moyen d'organiser votre application Express de sorte que votre fichier app.js principal ne devienne pas gonflé et difficile à raisonner.

		Les routeurs sont comme des mini versions des applications Express. Ils fournissent des fonctionnalités pour gérer la mise en correspondance des itinéraires, les demandes et l'envoi de réponses, mais ils ne démarrent pas un serveur séparé et n'écoutent pas sur leurs propres ports
		 
		Les routeurs utilisent toutes les routes .get(), .put(), .post() et .delete()

		## explication de app.use dans le fichier app.js

		Utiliser app.use() sans spécifier l'URL de la requête. Dans un tel cas, ce qu'il fait, 
        c'est qu'il est exécuté à chaque fois, quelle que soit l'URL qui a été touchée. 

			appel du module (dans app)
			---------------

			const rechercheDep     = require("./routes/rechercheDepartement");
			app.use(rechercheDep);

			Dans ./routes/rechercheDepartement.js
            -------------------------------------

			const express = require("express");
			const router = express.Router();

			router.post() fait référence aux demandes POST 
			router.get() fait référence à la demande GET

			GET demande des données à une source spécifiée  

			router.get('/api/rechercheDep', (req, res, next) => { 
   				res.render(path.join(__dirname + "./../IHM/departementRech.ejs"));
			});

			POST soumet des données à une ressource spécifiée pour qu'elle soit traitée.

		## fichier template  fichier .ejs:
        ----------------------------------
			 Un document HTML ou XML avec des inserts de code JavaScript entre les balises <% et >%.

			 les variables passées en tant que paramètres de rendu sont accessibles en 
			 utilisant  <%= var_name %>

             ex: <% for(i=0; i<result.length; i++) { %>
			 		<tr>
						 <td width=5% align=center ><%= result[i].kanji_index %></td>
							 <td><%= result[i].francais %></td> 
					  </tr>  
				  <% } %>

			 L'instruction <%- include('chemin') %> permet d'inclure des parties de pages définies dans d'autres fichiers .ejs.

			 <%- include('../IHM/rechercheKanji2') %>

             Déclaration de moteur ejs
			 -------------------------
			 Dans app.js EJS (Embedded JavaScript Templating)
			 const ejs = require('ejs');  //  est l'un des moteurs de modèles pour générer du HTML.

			 // Définition du moteur d'affichage
			 app.set('view engine', 'ejs');
			 // views, le répertoire dans lequel se trouvent les fichiers modèles ejs. Ici IHM. 
			 app.set('views', 'IHM');

			 **Les fichiers statiques** sont des fichiers que les clients téléchargent tels quels 
			 depuis le serveur. Créez un nouveau répertoire, public . Express, par défaut, ne 
			 vous permet pas de servir des fichiers statiques. Vous devez l'activer à l'aide du middleware intégré suivant.

			 La route racine est maintenant définie sur votre répertoire public:
			 app.use(express.static('public'));

			Ex: Dans le répertoire public fichier "testimage.jpg"
			img(src = "/testimage.jpg", alt = "Testing Image")

			Le module path:
			---------------

		    path module fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires

			La path.dirname()méthode renvoie le nom du répertoire d'un path
			path.dirname('/foo/bar/baz/asdf/quux');
			// Returns: '/foo/bar/baz/asdf'

			La path.join()méthode joint tous pathles segments
			path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
			// Returns: '/foo/bar/baz/asdf'

			La __dirname variable renvoie toujours le chemin absolu de l'emplacement de vos fichiers.





6. # Diagramme logique 

     ## la route rechercheLieu  =>	http://127.0.0.1:5005/API/rechercheLieu

	 Démarrage par nodemon de server.js (Démarrage du serveur HTTP, appel de ./app) 
	                          ---------  	
							        |       const app = require("./app");
									|  		const dotenv = require("dotenv"); => fichier .env (port)
									|
									|		Définition url root http://127.0.0.1:5005/
									|       Création du LISTENER sur le port (5005)
									V  
						Fichier ./app.js (import de express,   
								--------  définition de app puis export  
										  définition du moteur de template ejs 
										  définition des routes)   
															|  
															V  					
							// import des routes 
									const visuRepthumb = require("./routes/visuRepthumb");

							// configuration du middleware
							// Chaque app.use(middleware) est appelée à chaque fois qu'une requête est envoyée au serveur.
									app.use(visuRepthumb);

							module.exports = app; // pour exporter app vers les autres scripts

		Fichier ./routes/visuRepthumb.js:
		---------------------------------
		|
		V
		module (express,body-parser)
		|
		v 
		déclaration des répertoires statics: (public, js, css)
		|
		v

		@http://127.0.0.1:5005/API/rechercheLieu renvoie le formulaire rechercheLieu.ejs  
		router.get('/api/visurepthumb', (req, res, next) => { 
   			res.render(path.join(__dirname + "./../IHM/rechercheLieu.ejs"));
		});


		Le formulaire ./../IHM/rechercheLieu.ejs demande (ile, region, departement ...)
		----------------------------------------
		<form action="/API/rechercheLieu" method="post">

		Le formulaire est soumis à la route /API/rechercheLieu

		router.post('/api/rechercheLieu', function(req, res, next) {
    		if (req) {
				*** la ville du formulaire est récupérée dans le body de la requete ***
        		let dirVil      =    req.body.nom_vil ;

				*** on construit le répertoire contenant lrs thumbernail ***
				dirVil = "./public/images/" + `${dirVil}` + "_thumb";

				*** fonction ListFilesInDir qui lit le répertoire dirVil ***
				*** la fonction renvoie un tableau avec le chemin /nom_photo.JPEG **

				*** appel de la fonction le return est renvoyé dans tabListeNamePhotos ***
				tabListeNamePhotos = ListFilesInDir(dirVil,nameDirVil);

				*** appelle afficheLieu.ejs avec les paramètres tabListeNamePhotos, nameVille ***
				res.status(200).render('afficheLieu', { tabListeNamePhotos, nameVille }); // pour ejs
		
		*** Le fichier ./IHM/afficheLieu.ejs ****
		-----------------------------------------
		 appelle des fichiers
		  <link rel="stylesheet" href="/general.css"> (ainsi que recherche.css, grid.css) 

		  boucle qui lit la table tabListeNamePhotos
		  affichage de la photo thumbernail ( hoover nom de la photo apparait)

          affichage du formulaire de saisie 
		
		
	
		