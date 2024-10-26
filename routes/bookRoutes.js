//Para utitlizar o Router do express faremos assim;
const express = require('express');
const router = express.Router();
const {
  addBook,
  listBooks,
  getBookById,
  updateBookById,
  deleteBookById,
  getByAuthor
} = require('../controllers/bookController');
const verifyJWTMiddleware = require('../middleware/verifyJWTMiddleware');

//Minhas rotas ==>

//rotas
router.get('/', (req, res) => {
  res.status(200).json({ message: 'BOOKs API - Aulas Unimar 2024 - POS FullStack' });
});

router.post('/book', verifyJWTMiddleware, addBook); //protegida

router.get('/books', listBooks);

router.get('/book/:id', getBookById);

router.patch('/book/:id', verifyJWTMiddleware, updateBookById); //protegida

router.delete('/book/:id', verifyJWTMiddleware, deleteBookById); //protegida

module.exports = router;
