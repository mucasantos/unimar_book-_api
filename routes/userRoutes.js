//Cadastro de user
//Login de user
//logout de user
//Para utitlizar o Router do express faremos assim;
const express = require('express');
const { loginUser, logoutUser, registerUser } = require('../controllers/userController');
const { isEmailValid, passwordValid } = require('../middleware/validators');
const router = express.Router();

router.post(
  '/cadastro',
  [isEmailValid, passwordValid], //Forma de validar com poucas info...
  registerUser
);
router.post('/login', loginUser);
router.post('/sair', logoutUser);

module.exports = router;
