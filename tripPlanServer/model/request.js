const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const requestSchema = new Schema({
  startDate     : Date,
  endDate       : Date,
  expert        : {type: Schema.Types.ObjectId, ref: 'Expert'},
  user          : {type: Schema.Types.ObjectId, ref: 'User'},
  completed     : {type: Boolean, default: false},
  accepted      : {type: Boolean, default: false}
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
