app.controller('loginController', function($scope, sessionFactory, $location){
  $scope.login = function(){
    if(!$scope.logReg || $scope.logReg.name.length < 3){
      alert("Name must be at least 3 characters");
    }else{
      sessionFactory.login($scope.logReg);
    }
  }
  sessionFactory.checkUser(function(data){
    $scope.currUser = data.user;

    if(!$scope.currUser){
      $location.url('/')
    }
  });
})
