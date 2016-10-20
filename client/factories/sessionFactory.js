app.factory('sessionFactory', ["$http", "$location", function($http, $location){

  var factory = {};

  factory.login = function(user){
    $http.post('/login', user)
    .then(function(data){
      if(data.data.status){
        $location.url('/dashboard')
      }else{
        alert("SOMETHING WENT WRONG NOOO")
      }
    })
  }

  factory.checkUser = function(callback){
    $http.get('/checkUser')
    .then(function(data){
      callback(data.data);
    })
  }

  factory.getUser = function(callback) {
    $http.get('/user')
    .then(function(data){
      callback(data.data.user);
    })
  }

  return factory;
}]);
