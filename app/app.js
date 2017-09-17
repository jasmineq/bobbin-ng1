'use strict';

const bobbin = angular.module('BobbinApp', [
  'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider, authFactory, loginComponent) {

  //page doesn't exist, back to route
  $urlRouterProvider.otherwise('/');

  //state SPA not pages
  $stateProvider
  .state('root', {
    url: '/',
    templateUrl: 'app/templates/pages/home.html'
  })

  // .state('login', {
  //   url: '/login',
  //   views: {
  //     'login': {
  //       template: '<login-component></login-component>'
  //     }
  //   }
  // })

  .state('projects', {
    abstract: true,
    templateUrl: 'app/templates/pages/projects.html'
  })

  .state('projects.items', {
    url: '/projects',
    views: {
      'projects': {
        component: 'projectsComponent'
      }
    }
  });

  // .state('projects.detail', {
  //   url: '/projects',
  //   views: {
  //     'projects': {
  //       component
  //     }
  //   }
  // })
}])

.run(function(FBCreds) {
  let creds = FBCreds;
  let authConfig = {
      apiKey: creds.apiKey,
      authDomain: creds.authDomain,
      databaseURL: creds.databaseURL
  };
  firebase.initializeApp(authConfig);

  let isAuth = (authFactory) => new Promise((resolve, reject) => {
    console.log("authFactory is", authFactory);
    authFactory.isAuthenticated()
      .then((userExists) => {
        if (userExists) {
          console.log("Authenticated, go ahead");
          resolve();
        } else {
          console.log("Authentication reject, GO AWAY");
          reject();
        }
      });
  });
});
