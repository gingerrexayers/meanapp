(function(){
  "use strict";
  angular.module('app')
    .factory('questionFactory', questionFactory);

  function questionFactory($http) {
    var factory = {
      index: _index,
      show: _show,
      create: _create,
      addAnswer: _addAnswer,
      likeAnswer: _likeAnswer
    }

    function _index (callback) {
      $http.get('/questions').then(callback);
    }

    function _show (id, callback) {
      $http.get('/questions/' + id).then(callback);
    }

    function _create (data, callback) {
      $http.post('/questions', data).then(callback);
    }

    function _addAnswer (id, data, callback) {
      $http.post('/questions/' + id, data).then(callback);
    }

    function _likeAnswer (id, user, callback) {
      $http.post('/like/' + id, user).then(callback);
    }

    return factory;
  }
})();
