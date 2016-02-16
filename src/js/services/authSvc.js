'use strict';


app.service('AuthSvc', function($http, $state){


  //REGISTER
  this.registerUser = function(newUser){
    $http.post('/users/register', newUser)
    .then(function(res){
      console.log('register response: ',res);
      $state.go('login');
    }, function(err){
      console.log(err);
    });
  }


  // LOGIN
  this.loginUser = function(user){
    return $http.post('/users/login', user)
  }


  //IS LOGGED IN??
  // this.isLoggedIn = function(){
  //
  //   var daCookie = $cookies.get('userToken');
  //
  //   if(!daCookie){
  //     return false;
  //   }
  //   try {
  //     var payload = jwtHelper.decodeToken(daCookie);
  //   } catch (err){
  //     return false;
  //   }
  //   // if(moment().isAfter( moment(payload.iat, 'X').add(1, 'day') )) {
  //   //   $state.go('login');
  //   // }
  //   return true;
  // }


  //LOGOUT
  // this.logoutUser = function(){
  //   $cookies.remove('userToken');
  //   $state.go('login');
  // }



});
