(function() {
  "use strict";

  angular.module('app')
    .controller('addAnswerController', addAnswerController);

  function addAnswerController($scope, $location, $routeParams, sessionFactory, questionFactory) {
    sessionFactory.checkUser(function(data){
      $scope.currUser = data.user;

      if(!$scope.currUser){
        $location.url('/')
      }
    });

    questionFactory.show($routeParams.id, function(data){
      $scope.question = data.data.data;
    });

    $scope.create = function() {
      if(!$scope.form || $scope.form.text.length < 5){
        alert("Answer must be at least 5 characters");
      } else {
        $scope.form.author = $scope.currUser;
        questionFactory.addAnswer($routeParams.id, $scope.form, function(data){
          console.log(data);
          console.log('/questions/' + $routeParams.id);
          $location.path('/question/' + $routeParams.id);
        });
      }
    }
  }
})();
