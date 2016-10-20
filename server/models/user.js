var mongoose = require('mongoose');
var Schema = mongoose.Schema

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }]
});

mongoose.model("User", UserSchema);
