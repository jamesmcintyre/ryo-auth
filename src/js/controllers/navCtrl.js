'use strict';

var app = angular.module('hashnsalts');

app.controller('navCtrl', function($scope, $http, $state, AuthSvc) {

  $scope.isLoggedIn = function(){
    AuthSvc.isLoggedIn();
  }
});
