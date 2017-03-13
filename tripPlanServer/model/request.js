const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User          = require("./user");


const requestSchema = new Schema({
  startDate     : Date,
  endDate       : Date,
  traveler      : {type: Schema.Types.ObjectId, ref: 'User'},
  expert        : {type: Schema.Types.ObjectId, ref: 'User'},
  whoIsTravelling: String,
  mainInterests : String,
  mustKnows     : String,
  completed     : {type: Boolean, default: false},
  accepted      : {type: Boolean, default: false}
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
