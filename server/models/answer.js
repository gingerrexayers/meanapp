var mongoose = require('mongoose');
var Schema = mongoose.Schema

var AnswerSchema = new Schema({
  text: {
    type : String,
    required: true
  },
  details: {
    type: String
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});

mongoose.model("Answer", AnswerSchema);
