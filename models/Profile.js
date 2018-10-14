const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  bio: {
    type: String
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);