(function() {
  "use strict";

  angular.module('app')
    .controller('showQuestionController', showQuestionController);

  function showQuestionController($scope, $location, $routeParams, sessionFactory, questionFactory) {
    sessionFactory.checkUser(function(data){
      $scope.currUser = data.user;

      if(!$scope.currUser){
        $location.url('/')
      }
    });

    var load = function() {
      questionFactory.show($routeParams.id, function(data){
        $scope.question = data.data.data;
      });
    }
    load();

    $scope.like = function(id) {
      questionFactory.likeAnswer(id, $scope.currUser, function(data){
        console.log(data.data);
        load();
      });
    }

  }
})();
