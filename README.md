# Budgetbox Project

## Modification de l'URL de l'API

L'API utilisée est par défaut : http://localhost:8080/products/v1.0/ .

Celle-ci peut être modifiée en modifiant les fichiers src\environments\environment.ts et src\environments\environment.prod.ts .

```sh
export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080/products/v1.0/'
};
```

## Serveur de développement

Lancer `ng serve` pour le serveur de développement. Ensuite ouvrir `http://localhost:4200/` dans le navigateur.

## Mise en production

Lancer `ng build` pour compiler le projet. Les fichiers seront placés dans le répertoire `dist/` . Utiliser  l'option `--prod` pour une compilation en production.
Ensuite copier le contenu de  `dist/angular-project-name` dans le répertoire de votre site web.

## Tests unitaires

Lancer `ng test` pour exécuter les tests unitaires via [Karma](https://karma-runner.github.io).


