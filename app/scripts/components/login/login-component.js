'use strict';

bobbin.component('loginComponent', {

  templateUrl: 'app/scripts/components/login/login.html',
  controller: function(authFactory, $state, $scope) {

    $scope.account = {
      email: "",
      password: "",
      name: ""
    };

    $scope.loginGoogle = function() {
      authFactory.authWithProvider()
        .then(function(result) {
          let user = result.user.uid;
          authFactory.setCurrentUser(user);
          console.log('loginGoogleuser: ', user);
          // console.log('loginGoogleuser result: ', result);
          $state.go('projects.items');
          // $scope.$apply();
        }).catch(function(error) {
          console.log('GoogleLogInError', error);
          let errorCode = error.code;
          let errorMessage = error.message;
        });
        $scope.account = {
        email: "",
        password: "",
        name: ""
        };
      };

    $scope.logIn = () => {
      authFactory.logIn($scope.account)
        .then(() => {
          $state.go('projects.items');
        });
    };

    $scope.register = () => {
      // console.log('clicked register');
      authFactory.register({
        email: $scope.account.email,
        password: $scope.account.password
      })
      .then((userData) => {
        console.log('register newUserData', userData);
        $scope.logIn();
      }, (error) => {
        console.log('registerError', error);
      });
    };

  }
});
