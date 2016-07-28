# Angular 2 Chat App
This is a chat web app built using Angular 2 as a front-end framework and Webpack as a module bundler/dev server. It is using [mockapi.io](http://mockapi.io) to host the (you guessed it) API. It was started using the [preboot/angular2-webpack](https://github.com/preboot/angular2-webpack) boilerplate.

### Demo
View it live at [this site](http://taylorkmho.com/gists/angularjs-2-chat/).

### Getting Started
* To start run `npm install`.
* Then run `npm start`.

There are more npm scripts available, as created by preboot. See this project's [package.json](https://github.com/taylorkmho/angularjs-2-chat/blob/master/package.json#L5-L24) for more details.

## Running Tests
### End-to-End Tests (aka. e2e, integration)
This project uses [Angular Protractor](https://github.com/angular/protractor) for e2e testing. If you do not already have it installed, you can follow the instructions on how to do so at [their website](http://www.protractortest.org/#/).

* `npm start` to start a local server using Webpack (if not already running).
* `npm run webdriver-start`* to start the Selenium server.
* `npm run e2e`* to run the Protractor –spec.js files.

*Must be in their own terminal/bash tabs.
