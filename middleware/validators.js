const { body, check } = require('express-validator');

module.exports = {
  isEmailValid: body('email').isEmail().withMessage('Email com formato inválido!'),
  passwordValid: check('password')
    .isLength({ min: 8 })
    .withMessage('A senha precisa ter pelo menos 8 caracters!')
};
