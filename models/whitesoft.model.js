/**
 * WHITESOFT - User Data Model
 */
const mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  country: { type: String, required: true },
});

module.exports = mongoose.model("user_details", UserSchema);
