# BudgetboxProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.3.

## Change API url

The url to use the API is available in the files src\environments\environment.ts and src\environments\environment.prod.ts

```sh
export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080/products/v1.0/'
};
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Prepare for deployment

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
Then copy the content of dist/angular-project-name to your server web folder.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


