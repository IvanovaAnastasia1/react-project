/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Form from './Form';

class List extends React.Component {
  constructor() {
    super();
    this.state = { todos: [], category: [] };
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3001/list').then((res) => this.setState({ todos: res.data }));
  }

  handleClick(event, value, select) {
    event.preventDefault();
    const { todos } = this.state;

    axios
      .post('http://localhost:3001/list', {
        id: Math.random(),
        status: false,
        text: value,
        category: select,
      })
      .then((result) =>
        axios.get('http://localhost:3001/list').then((res) => this.setState({ todos: res.data })),
      );
  }

  toggle(itemId) {
    const { todos } = this.state;
    const list = todos.map((item) => {
      const toggleStat = item.id === itemId ? !item.status : item.status;

      return { ...item, status: toggleStat };
    });
    this.setState({ todos: list });
  }

  deleteItem(event, id) {
    const { todos } = this.state;

    event.preventDefault();
    const arr = todos.filter((item) => item.id !== id);
    this.setState({ todos: arr });
  }

  create(todo) {
    return (
      <li key={todo.id}>
        <span>{todo.text}</span> <span>{`[${todo.category}]`}</span>
        <input type="checkbox" checked={todo.status} onChange={() => this.toggle(todo.id)} />
        <button type="button" onClick={(e) => this.deleteItem(e, todo.id)}>
          Удалить
        </button>
      </li>
    );
  }

  render() {
    const { todos } = this.state;

    const todoList = todos.map(this.create.bind(this));
    return (
      <div>
         <Link to='/'>Список дел    </Link>
         <Link to='/addcategory'>    Категории</Link>
        <Form onKeyDown={this.handleClick} />
        <ul>{todoList}</ul>
      </div>
    );
  }
}

export default List;
