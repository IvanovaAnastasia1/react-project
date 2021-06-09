/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Navbar, Nav, Table, Container, Button } from 'react-bootstrap';

import Form from './Form';

class List extends React.Component {
  constructor() {
    super();
    this.state = { category: [] };
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    axios.get('https://react-project-server-ivanova.herokuapp.com/list').then((res) => {
      this.props.getTodo(res.data);
    });
  }

  handleClick(event, value, select) {
    event.preventDefault();
    axios
      .post('https://react-project-server-ivanova.herokuapp.com/list', {
        id: Math.random(),
        status: false,
        text: value,
        category: select,
      })
      .then((result) =>
        axios.get('https://react-project-server-ivanova.herokuapp.com/list').then((res) => {
          this.props.getTodo(res.data);
        }),
      );
  }

  toggle(itemId) {
    const { todos } = this.props;
    const list = todos.map((item) => {
      const toggleStat = item.id === itemId ? !item.status : item.status;

      return { ...item, status: toggleStat };
    });
    this.props.getTodo(list);
  }

  deleteItem(event, id) {
    const { todos } = this.props;

    event.preventDefault();
    const arr = todos.filter((item) => item.id !== id);
    this.props.getTodo(arr);
    this.setState({ todos: arr });
    this.props.getTodo(arr);
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
    const { todos } = this.props;

    return (
      <div>
        <Navbar bg="light" expand="lg" className="justify-content-between">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item>
                <Nav.Link href="/">Список дел</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/addcategory">Категории</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Form onKeyDown={this.handleClick} />
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Статус</th>
                <th>Задание</th>
                <th>Категория</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {todos.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.status}
                      onChange={() => this.toggle(item.id)}
                    />
                  </td>
                  <td>{item.text}</td>
                  <td>{item.category}</td>
                  <td>
                    {' '}
                    <Button type="button" onClick={(e) => this.deleteItem(e, item.id)}>
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ todos: state.todos, category: state.category });

const mapDispatchToProps = (dispatch) => {
  return {
    getTodo: (payload) => dispatch({ type: 'GET_TODO', payload }),
    addTodo: (payload) => dispatch({ type: 'ADD_TODO', payload }),
    getCategory: (payload) => dispatch({ type: 'GET_CATEGORY', payload }),
    addCategory: (payload) => dispatch({ type: 'ADD_CATEGORY', payload }),
  };
};

// export default List;
export default connect(mapStateToProps, mapDispatchToProps)(List);
