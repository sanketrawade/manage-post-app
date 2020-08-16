const mongoose = require("mongoose");

const UserSchemma = mongoose.Schema({
  username:{type:String,require:true,unique:true},
  password:{type:String,require:true}
});

module.exports = mongoose.model("User",UserSchemma);