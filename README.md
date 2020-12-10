# Casewise Webmodeler Teams UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Wikki Page
  [View Wikki pages here](https://github.com/erwin-inc/casewise-webmodeler-teams-mockups/wiki)

## Azure App Registration Details

To run this application on your local environment
  * Goto [Azure App Registration](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)
  * Register a new Application with a name of your choice
  * Add Platform (Single-Page Application) with Redirect URIs as `http://localhost:4200/sign-in/` and Logout URL as `https://localhost:4200/sign-out`
  * In you Local Repo goto [environemt.ts](https://github.com/erwin-inc/casewise-webmodeler-teams-mockups/blob/master/src/environments/environment.ts) file and update 
`AZURE_APP_REGISTRATION: { clientId: 'XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'}`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
