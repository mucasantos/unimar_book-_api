const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save(); //precisa do await

    res.status(201).json({ message: 'Livro salvo com sucesso!' });
  } catch (err) {
    res.status(400).json({ message: 'Verifique as informações..', error: err.message });
  }
};

exports.listBooks = async (req, res) => {
  try {
    const books = await Book.find(); // SEMPRE precisa do  await
    res.status(200).json({ message: 'Lista de livros salvos', books: books });
  } catch (err) {
    res.status(400).json({ message: 'Verifique as informações..', error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  console.log(req.params.id);

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: 'Livro não encontrado no DB...' });
    } else {
      res.status(200).json({ message: 'Lista de livros salvos', book: book });
    }
  } catch (err) {
    res.status(400).json({ message: 'Verifique as informações..', error: err.message });
  }
};

exports.updateBookById = async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);

  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!book) {
      res.status(404).json({ message: 'Livro não encontrado no DB...' });
    } else {
      res.status(201).json({ message: 'livro editado com sucesso!', book: book });
    }
  } catch (err) {
    res.status(400).json({ message: 'Verifique as informações..', error: err.message });
  }
};

exports.deleteBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({ message: 'Livro não encontrado no DB' });
    } else {
      res.status(200).json({ message: 'Livro excluido com sucesso!' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Verifique as informações..', error: err.message });
  }
};
