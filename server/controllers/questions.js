(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Question   = mongoose.model('Question');
    var Answer = mongoose.model('Answer');
    var User = mongoose.model('User');

    module.exports = {
      index: _index,
      create: _create,
      show: _show,
      addAnswer: _addAnswer,
      likeAnswer: _likeAnswer
    };

    function _index(req, res) {
      Question.find({}, function(err, result) {
        if (err) {
          console.log(err);
          res.json({success: false});
        }
        else {
          res.json({success: true, data: result});
        }
      })
    }

    function _create(req, res) {
      User.findOne({_id: req.body.author}, function(err, u){
        if (err) {
          console.log(err);
          res.json({success: false});
        } else {
          var q = new Question({text: req.body.text, description: req.body.description, author: u._id});
          u.questions.push(q);
          q.save(function(serr){
            if (serr) {
              console.log(serr);
              res.json({success: false});
            } else {
              u.save();
              res.json({success: true});
            }
          });
        }
      });
    }

    function _show(req, res) {
      Question.findOne({_id: req.params.id}).populate({path: 'answers', options: {sort: {'likes': -1}}, populate: {path: 'author'}}).exec(function(err, result){
        if (err) {
          console.log(err);
          res.json({success: false});
        } else {
          res.json({success: true, data: result});
        }
      });
    }

    function _addAnswer(req, res) {
      User.findOne({_id: req.body.author}, function(uerr, u){
        if (uerr) {
          console.log(uerr);
          res.json({success: false, err: 'uerr'});
        } else {
          Question.findOne({_id: req.params.id}, function(qerr, q){
            if (qerr) {
              console.log('Qerr: ' + qerr);
              res.json({success: false, err: 'qerr'});
            } else {
              var a = new Answer({text: req.body.text, details: req.body.details, author: u, question: q});
              u.answers.push(a);
              q.answers.push(a);
              a.save(function(serr){
                if (serr) {
                  console.log('Serr: ' + serr);
                  res.json({success: false, err: 'serr'});
                } else {
                  q.save();
                  u.save();
                  res.json({success: true});
                }
              });
            }
          });
        }
      });
    }

    function _likeAnswer(req, res) {
      User.findOne({_id: req.body}, function (err, u){
        if (err) {
          console.log(err);
          res.json({success: false});
        } else {
          Answer.findOne({_id: req.params.id}, function (err, a){
            if (err) {
              console.log(err);
              res.json({success: false});
            } else {
              var pos = a.likes.indexOf(u._id);
              if (pos > -1) {
                a.likes.splice(pos, 1);
              } else {
                a.likes.push(u._id);
              }
              a.save(function(err){
                if (err) {
                  console.log(err);
                  res.json({success: false});
                } else {
                  res.json({success: true});
                }
              })
            }
          });
        }
      });
    }

})();
