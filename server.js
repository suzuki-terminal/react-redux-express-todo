const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const shortid = require('shortid');

const config = require('./webpack.config');

class Todo {
  constructor({ title }) {
    this.id = shortid.generate();
    this.title = title;
    this.completed = false;
    this.createdAt = (new Date()).getTime();
  }
}

const API_PORT = 3000;
const APP_PORT = 8080;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [
  new Todo({ title: '女子力をつける' }),
];

app.get('/todos', (req, res, next) => {
  setTimeout(() => {
    res.send({ todos });
  }, 1000);
});

app.post('/todos', (req, res) => {
  const todo = new Todo(req.body);

  todos.push(todo);

  res.send({ todo });
});

app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = req.body.todo;

  todos = todos.map(t => t.id === id ? todo : t);

  res.send({ todo });
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  todos = todos.filter(t => t.id !== id);

  res.send({});
});

app.listen(API_PORT, () => {
  console.log(`Express server listen on port ${API_PORT}`);
});

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  proxy: {
    '/api': {
      target: `http://localhost:${API_PORT}`,
      pathRewrite: {'^/api' : ''}
    }
  }
});
server.listen(APP_PORT, () => {
  console.log(`open http://localhost:${APP_PORT}`);
});