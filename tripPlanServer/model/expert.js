const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const expertSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  age: Number,
  interests: String,
  description: String,
  locations: [String],
  reviews :
    [{
        userId  : {type: Schema.Types.ObjectId, ref: 'User'},
        name    : String,
        comment : String,
        stars   : Number,
        date    : Date
    }]
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Expert = mongoose.model("Expert", expertSchema);
module.exports = User;
