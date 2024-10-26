const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

exports.registerUser = (req, res) => {
  //Criar um user no Banco de dados

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //return res.status(500).json({ message: 'verique os dados digitados!!' }); //Forma 1 de retornar o erro para o cliente
    const error = new Error('Erro ao registrar o usuário!!'); //Criei uum objeto Error
    error.statusCode = 400;
    error.data = errors.array();
    throw error;
  }

  //Antes de salvar o user no DB,  preciso criptografar a senha!
  bcrypt
    .hash(req.body.password, 10)
    .then((passHashed) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: passHashed,
        isAdmin: false
      });

      user
        .save()
        .then((createdUser) => {
          createdUser.password = undefined; //Para nao devolver a senha  na resposta para o client
          res.status(201).json({ message: 'Usuario criado com sucesso!', createdUser });
        })
        .catch((err) => {
          return res.status(500).json({ message: 'Falha ao criar o usuário!', err });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: 'Verifique as informações..', error: err.message });
    });
};

exports.loginUser = async (req, res) => {
  //Fazer login do usuario
  /**Login de user ==>
   * Verificar se o email existe no DB
   * Se nao existir retornar erro 404
   * Caso o user exista ==>
   *    1. Pegar  a senha  do user (enviada) e comparar com a do DB
   *        Se a senha for diferente, devolver erro, caso constrario logar o user
   *
   */
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado no DB' });
    } else {
      const isEqual = await bcrypt.compare(req.body.password, user.password);
      if (!isEqual) {
        res.status(403).json({ message: 'Credenciais inválidas. Verique o email ou senha!' });
      } else {
        user.password = undefined;

        //Devolver o tokenjwt para o meu user enviar nas requisições de CRUD

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.SECRETKEY, {
          expiresIn: '5h'
        });

        res.status(200).json({ message: 'Login efetuado com sucesso!', user, token });
      }
    }
  } catch (err) {
    res.status(400).json({ message: 'Verifique as informações..', error: err.message });
  }
};

exports.logoutUser = async (req, res) => {
  //Logout do usuario
};
