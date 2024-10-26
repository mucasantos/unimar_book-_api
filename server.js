/**
 * iniciar o projeto - npm init -y
 * npm i express
 * npm i nodemon => para salvamento automatico
 * As minhas respostas e requisições utilizam o JSON => adicionar o middleware express.json
 * Instalar o pacote mongoose e importar o pacote para o projeto
 * Instalar o dotenv => para trabalhar com o arquivo .env
 */
const express = require('express');
const app = express();
const badJsonMiddleware = require('./middleware/badJsonMiddleware');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

//trabalhar com o env
require('dotenv').config();

//middlewares - Global
app.use(express.json()); // conseguir ver (entender/decodificar) o JSON enviado
app.use(badJsonMiddleware);
app.use(helmet());
app.use(cors());

//Rotas da aplicação
//Rotas de  livros
app.use(bookRoutes); //Usar no formato que estava antes...(Sem um nome padrao inicial)

//Rotas  de  user
app.use('/user', userRoutes);
//app.use('/api/v1', bookRoutes) => Filtro inicial chamado /api/v1

//tratameneto de erro 404
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada...' });
});

//tratamento de erros globais!! Erros que ocorream e eu dei Throw

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  res.status(status).json({ message: error.message, error: error.data });
});

//Conectar no DB e subir o servidor
mongoose
  .connect(process.env.DBLINK)
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log('Servidor no ar na porta: ' + process.env.PORT);
    });
    console.log('DB no ar');
  })
  .catch((err) => {
    console.log(err);
  });
