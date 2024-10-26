//next => utilizamos quando queremos passar o controle para a proxima chamada!
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //PAra validar o meu token!!
  const authData = req.headers['authorization'];

  if (!authData) {
    return res.status(403).json({ message: 'Token de acesso não enviado!' });
  }

  const token = authData.split(' ')[1];

  jwt.verify(token, process.env.SECRETKEY, (err, userDecoded) => {
    if (err) {
      return res.status(500).json({ message: 'Token inválido ou expirado...', error: err.message });
    }

    //Eu sei o id do user que salvou este livro!!!
    console.log(userDecoded);
    //Adicionar este usuario na req
    req.user = userDecoded;

    next();
  });
};
