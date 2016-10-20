var mongoose = require('mongoose');
var Schema = mongoose.Schema

var QuestionSchema = new Schema({
  text: {
    type : String,
    required: true
  },
  description: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }]
});

mongoose.model("Question", QuestionSchema);
