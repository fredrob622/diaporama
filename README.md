# Fichier README.md du projet Diaporama
----------------------------------------------------------------------------------------------
Le but: faire un diaporama en nodeJS

Entrer un répertoire contenant des photos.
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
		
		

Installation de dotenv
pnpm install dotenv --save

après création du fichier .env
