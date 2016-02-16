
var app = angular.module('hashnsalts');

//send headers with requests
app.factory('httpRequestInterceptor', function(AuthSvc){
  return {
    request: function(config){
      if(AuthSvc.token){
        config.headers = {'Authentication': 'Bearer ' + AuthSvc.token}
      }
      return config;
    }
  };
});

app.config(function($httpProvider){
  $httpProvider.interceptors.push('httpRequestInterceptor');
});
