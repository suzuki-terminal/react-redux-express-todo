import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';

import {
  setTodosFetch,
  setTodos,
  addTodosItem,
  updateTodosItem,
  deleteTodosItem,
} from '../redux-modules/todos/action';

const propTypes = {
  todos: PropTypes.shape({
    fetch: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.number.isRequired,
    })),
  }),
  setTodosFetch: PropTypes.func,
  setTodos: PropTypes.func,
  addTodosItem: PropTypes.func,
  updateTodosItem: PropTypes.func,
  deleteTodosItem: PropTypes.func,
};

class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.state = { title: '' };

    this.fetchTodos = this.fetchTodos.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickTodoToggleCompleted = this.handleClickTodoToggleCompleted.bind(this);
    this.handleClickTodoDelete = this.handleClickTodoDelete.bind(this);
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.props.setTodosFetch({ fetch: true });

    axios
      .get('/api/todos')
      .then(({ data: { todos } }) => {
        this.props.setTodos({ todos });
        this.props.setTodosFetch({ fetch: false });
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios
      .post('/api/todos', {
        title: this.state.title,
      })
      .then(({ data: { todo } }) => {
        this.setState({ title: '' });
        this.props.addTodosItem({ todo });
      });
  }

  handleClickTodoToggleCompleted(todo) {
    axios
      .put(`/api/todos/${todo.id}`, {
        todo: Object.assign({}, todo, {
          completed: !todo.completed,
        })
      })
      .then(({ data: { todo } }) => {
        this.props.updateTodosItem({ todo });
      });
  }

  handleClickTodoDelete(todo) {
    axios
      .delete(`/api/todos/${todo.id}`)
      .then(() => {
        this.props.deleteTodosItem({ todo });
      });
  }

  render() {
    return (
      <div
        className="container"
        style={{ padding: '20px' }}
      >
        <form
          className="form-inline"
          onSubmit={this.handleSubmit}
        >
          <input
            className="form-control form-control-lg"
            type="text"
            value={this.state.title}
            onChange={({ target: { value } }) => this.setState({ title: value })}
          />

          <button className="btn btn-primary">追加</button>
        </form>

        <br />

        {this.props.todos.fetch
          ? (
            <p>Loading...</p>
          ) : (
            <table className="table">
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
                {this.props.todos.items.map(todo =>
                  <tr key={todo.id}>
                    <td>{todo.title}</td>
                    <td>{todo.completed ? '完了' : '未完了'}</td>
                    <td>{moment(todo.createdAt).format('YYYY/MM/DD HH:mm')}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={this.handleClickTodoToggleCompleted.bind(null, todo)}
                      >
                        {todo.completed ? '未完了に戻す' : '完了にする'}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={this.handleClickTodoDelete.bind(null, todo)}
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setTodosFetch,
    setTodos,
    addTodosItem,
    updateTodosItem,
    deleteTodosItem,
  }, dispatch);
}

AppContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
