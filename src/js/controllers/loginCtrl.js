'use strict';

var app = angular.module('hashnsalts');

app.controller('loginCtrl', function($scope, $http, $state, AuthSvc) {
  $scope.loginUser = function(user){
    AuthSvc.loginUser(user)
    .then(function(res){
      console.log('login response: ',res);

      //store res.body in local storage as token

      // AuthHandler.holdToken(res.body);
      // $state.go('profile');
    }, function(err){
      console.log('login error: ', err);
    });
  }
});
