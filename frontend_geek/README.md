# FrontendGeek

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# Backend :
- Modelisation 
- Creation du projet 
- ![Overview](image.png)
- Tester sur swagger en utilisant l'API  

# partie 1 : Prime flex :  

- On utilise le systeme de gride de prime flex 
- prime ng 
-shakai 

# partie 2 : Definition et présentation globale des employes pour la présentations .
- creer 03 pakahes : enums(employee) , position(Position), Type(UUID)

# partie 3 Les services 
 
- Le service nous permet d'utiliser notre backend .(provider hoot)
- le provider peut etre mis dans un service avec 
- httpcall 

- creer un package service 

- provide in root injecte dans le app.module.ts directement 

- constructeur injecte les dependances . 

- utilisation des modules http

- Définir l'url de l'api est le dirigé vers le backend 

- utiliser les observables (rxjx (données asynchrones ))

- Observable (recevoir des fichier ou des données en direct | on ne connait pas le temps que le backend prend|la lenteur )

- Promesse () retourne une seule valeur 

# partie 4 appelle des collaborateurs 
- Utiliser notre composant 

- appeller le backend 

- subscription (avec un pipe pour les pertes de mémores(la valleur récupßerer , on detuit l'observable) ) : next nous permet de récupérer des employées . 

- oninit(pour dire que chaque fois que l'initialisation  )

- aller au backend et utiliser le 

- config /WebConfig implements WebMvxConfigurer /override addCordMapping 

- BihaviorObject / Devinir la variable dans les services et l'utiliser partout .
 
# partie 5 : Les composants 

- tous les composant de bases vont du composant de base , AppComponent . 

- Dans le AppModule avec bootstrap , on fixe AppComponent comme point de départ .

- cycle de vie 
- ngOnInit() : Chaque foie que le composant est créé , on fait une action .
- ngOnChanges(changes : SimpleChanges ):void{}  : changer la valeur qui a changé avec input()
- ngOnDestroy() : 
- ngAfterViewInit() : 
- ngDoCheck() : 

- input() : Envoyer des données de parent á enfant 
- Dans enfant , on definit qu'un élement est que recoit des valeurs de l'exterieur 
- on l'appelle l'enfant et lui donne la valeur en comme un id par exemple 

# partie 6 : Les pipe 

-le pipe retourne des valleurs changées . Changer la forme des données dans 
{{employee | date : 'dd MMMM yyyy' }}
{{age|maitres l'age á partir de l'age de naissance }}

# partie 7 : Injektion de dépendances 

- basée sur le constructeur 

- injection basée sur l'injecteur 

# partie 8 : Utilisation des pipes pour le formatage et l'affichage dynamique dans Angular .

- Formater des chaines de caracteres et autres 
- ng g pipe pipe-name pour generer une pipe 

# patie 9 : Creation de CollaborateurItem et gestion des données avec @Input 

- @Input sur employeeItem nous permet de preparer le composant á recevoir un employée 
- Changer des information et rendre le composant réutilisable 

# patie 10 .: Emploi de directives 

- les directives structurelles : Ajout ou sprimme les élements du DOM et nous permet de garder nos données structurées . 
- Directives d'attributs : ngClass ngModel ngStyle

# parties 11 ajouter des filtres 
- Ajouter notre boutton 


# partie ajouter des formulaire . 
On utilise des formodule de primeNG et inporte juste le modal de primeNG 

Avec les calender , input text et tous autres . 

# partie : trackbyId :
- Chaque changement ne pousse pas á la creation de nouveaux élements dans le dom 
- Il faut toujour déabonner apres les subscreabes en utilisant un ngOnDestroy() 