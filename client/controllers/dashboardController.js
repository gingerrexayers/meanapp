(function() {
  "use strict";

  angular.module('app')
    .controller('dashboardController', dashboardController);

  function dashboardController($scope, $location, sessionFactory, questionFactory) {
    sessionFactory.checkUser(function(data){
      $scope.currUser = data.user;

      if(!$scope.currUser){
        $location.url('/')
      }
    });

    sessionFactory.getUser(function(data){
      $scope.user = data;
    });

    questionFactory.index(function(data){
      $scope.questions = data.data.data;
    });

  }
})();
