const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Request          = require("./request");

const agendaSchema = new Schema({
  request           : {type: Schema.Types.ObjectId, ref: 'Request'},
  breakfast         : Array,
  lunch             : Array,
  dinner            : Array,
  morningActivity   : Array,
  afternoonActivity : Array,
  eveningActivity   : Array,
  received          : {type: Boolean, default: false}
});

const Agenda = mongoose.model('Agenda', agendaSchema);
module.exports = Agenda;
