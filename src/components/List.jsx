import React from 'react';
import Form from './Form';

class List extends React.Component {
  constructor() {
    super();
    this.state = { todos: [] };
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleClick(event, value) {
    event.preventDefault();
    this.setState((state) => ({
      todos: [
        ...state.todos,
        {
          id: state.todos.length + 1,
          status: false,
          text: value,
        },
      ],
    }));
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
        <span>{todo.text}</span>
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
        <Form onKeyDown={this.handleClick} />
        <ul>{todoList}</ul>
      </div>
    );
  }
}

export default List;
