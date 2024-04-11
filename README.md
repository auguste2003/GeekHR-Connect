# GeekHR-Connect
Destinée aux entreprises modernes, GeekHR Connect est la solution idéale pour une gestion des ressources humaines efficace, intuitive et sécurisée.
Guide d'installation et de lancement de GeekHR Connect
Prérequis
Avant de commencer l'installation de GeekHR Connect, assurez-vous que les outils suivants sont installés sur votre système :

Node.js (version 18.x ou supérieure)
Angular CLI (version 17.x)
Java JDK (version 17 ou supérieure)
Maven (version 3.6.x ou supérieure)
Une base de données PostgreSQL (version 16.x ou supérieure) opérationnelle
Installation
Backend
Configurer la base de données:

Créez une nouvelle base de données dans PostgreSQL.
Mettez à jour le fichier src/main/resources/application.properties du projet backend avec les détails de connexion à votre base de données.
Construire et lancer l'API: Ouvrez un terminal dans le dossier racine du projet backend et exécutez les commandes suivantes :

mvn clean install
mvn spring-boot:run
L'API devrait maintenant être en cours d'exécution sur http://localhost:8080.

Frontend
Installer les dépendances: Ouvrez un terminal dans le dossier racine du projet frontend et exécutez la commande suivante :

npm install
Lancer l'application: Toujours dans le dossier racine du projet frontend, lancez l'application avec la commande :

ng serve
Accédez à http://localhost:4200 dans votre navigateur pour voir l'application en action.

Documentation API
Pour consulter la documentation de l'API, naviguez vers http://localhost:8080/swagger-ui.html après avoir lancé le backend. Vous y trouverez toutes les routes disponibles ainsi que la manière de les utiliser.
