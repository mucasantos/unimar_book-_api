const badJsonMiddleware = (err, req, res, next) => {
  console.log(err);

  //verificar o erro, se houver, ou passar para o proximo evento..

  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: 'Verifique o JSON enviado...', error: err.message });
  }

  next();
};

module.exports = badJsonMiddleware;
