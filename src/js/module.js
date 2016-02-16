'use strict';

var app = angular.module('hashnsalts', ['ui.router']);


app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/partials/home.html', controller: 'homeCtrl' })
    .state('register', { url: '/register', templateUrl: '/html/partials/register.html', controller: 'registerCtrl' })
    .state('login', { url: '/login', templateUrl: '/html/partials/login.html', controller: 'loginCtrl' })
  $urlRouterProvider.otherwise('/');
});
