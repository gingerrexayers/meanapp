(function() {
  "use strict";

  angular.module('app')
    .controller('addQuestionController', addQuestionController);

  function addQuestionController($scope, $location, sessionFactory, questionFactory) {
    sessionFactory.checkUser(function(data){
      $scope.currUser = data.user;

      if(!$scope.currUser){
        $location.url('/')
      }
    });

    $scope.create = function() {
      if(!$scope.form || $scope.form.text.length < 10){
        alert("Question must be at least 10 characters");
      }else{
        $scope.form.author = $scope.currUser;
        questionFactory.create($scope.form, function(data){
          $location.url('/dashboard');
        });
      }
    }
  }
})();
