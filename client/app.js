var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider){
  $routeProvider
  .when("/", {
    templateUrl : "/partials/login.html",
    controller: "loginController"
  })
  .when("/dashboard", {
    templateUrl : "/partials/dashboard.html",
    controller: "dashboardController"
  })
  .when("/new_question", {
    templateUrl : "/partials/addQuestion.html",
    controller: "addQuestionController"
  })
  .when('/question/:id', {
    templateUrl: '/partials/showQuestion.html',
    controller: 'showQuestionController'
  })
  .when('/question/:id/new_answer', {
    templateUrl: '/partials/addAnswer.html',
    controller: 'addAnswerController'
  })
  .otherwise({
    redirectTo : '/dashboard'
  })

})
