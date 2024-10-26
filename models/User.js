//importar o mongoose
const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Desta forma, o email tem que ser único!!
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: false, default: false }
});

module.exports = mongoose.model('User', userSchema);
