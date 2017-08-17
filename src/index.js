import React, { Component } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import axios from 'axios';

class TodoApplication extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      title: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickTodoCompleteToggle = this.handleClickTodoCompleteToggle.bind(this);
    this.handleClickTodoRemove = this.handleClickTodoRemove.bind(this);
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos() {
    axios
      .get('/api/todos')
      .then(({ data: { todos } }) => {
        this.setState({ todos });
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios
      .post('/api/todos', {
        title: this.state.title,
      })
      .then(({ data: { todo } }) => {
        this.setState({
          title: '',
          todos: [...this.state.todos, todo],
        });
      });
  }

  handleClickTodoCompleteToggle(todo) {
    axios
      .put('/api/todos', {
        todo: Object.assign({}, todo, {
          completed: !todo.completed,
        })
      })
      .then(({ data: { todo } }) => {
        this.setState({
          todos: this.state.todos.map(t => t.id === todo.id ? todo : t),
        });
      });
  }

  handleClickTodoRemove(todo) {
    axios
      .delete(`/api/todos/${todo.id}`)
      .then(() => {
        this.setState({ todos: this.state.todos.filter(t => t.id !== todo.id) });
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.title}
            onChange={({ target: { value } }) => this.setState({ title: value })}
          />

          <button>追加</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>タイトル</th>
              <th>ステータス</th>
              <th>作成日</th>
              <th />
              <th />
            </tr>
          </thead>

          <tbody>
            {this.state.todos.map((todo, index) =>
              <tr key={index}>
                <td>{todo.title}</td>
                <td>{todo.completed ? '完了' : '未完了'}</td>
                <td>{moment(todo.createdAt).format('YYYY/MM/DD HH:mm')}</td>
                <td>
                  <button onClick={this.handleClickTodoCompleteToggle.bind(null, todo)}>
                    {todo.completed ? '未完了に戻す' : '完了にする'}
                  </button>
                </td>
                <td>
                  <button onClick={this.handleClickTodoRemove.bind(null, todo)}>
                    削除する
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    );
  }
}

render(
  <TodoApplication />,
  document.getElementById('app')
);
