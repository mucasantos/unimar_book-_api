//importar o mongoose
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  pages: { type: Number, required: true },
  genre: { type: String, required: true }
});

//
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

/**
 * Outra  forma de export
 * module.exports = mongoose.model('Book', bookSchema);
 */
