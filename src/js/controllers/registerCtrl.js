'use strict';

var app = angular.module('hashnsalts');

app.controller('registerCtrl', function($scope, $http, $state, AuthSvc) {

  $scope.registerUser = function(newUser){
    AuthSvc.registerUser(newUser);
  }
});
