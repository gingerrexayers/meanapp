var session = require('./../controllers/session.js');
var question = require('./../controllers/questions.js');

module.exports = function(app){
  app.post('/login', session.login);
  app.get('/checkUser', session.checkUser);
  app.get('/user', session.getUser);
  app.get('/logout', session.logout);

  app.get('/questions', question.index);
  app.get('/questions/:id', question.show);
  app.post('/questions', question.create);
  app.post('/questions/:id', question.addAnswer);

  app.post('/like/:id', question.likeAnswer);
}
