/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { Navbar, Nav, Button, Table, Container, Modal, Form, Col } from 'react-bootstrap';

class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      category: [],
      inputValue: '',
      open: false,
      valid: true,
    };
    this.onChange = this.onChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/category')
      .then((res) => this.setState({ category: res.data }));
  }

  openModal() {
    this.setState({
      open: true,
    });
  }

  close() {
    this.setState({
      open: false,
    });
  }

  onKeyDown(event, value) {
    event.preventDefault();
    const { category, inputValue } = this.state;

    const exist = category.find((el) => el.text === inputValue);

    if (exist) {
      console.log('exist');
      this.setState({
        valid: false,
      })
      return;
    }
    axios
      .post('http://localhost:3001/category', {
        id: Math.random(),
        text: value,
      })
      .then((result) =>
        axios
          .get('http://localhost:3001/category')
          .then((res) => {
            this.setState({ category: res.data })
            this.setState({ open: false })
          }),
      );
  }

  onChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  render() {
    const { category, inputValue, valid, open } = this.state;

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
          <Button type="button" onClick={this.openModal}>
            Добавить категорию
          </Button>
        </Navbar>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Категория</th>
              </tr>
            </thead>
            <tbody>
              {category.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.text}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Modal show={open} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить категорию</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Control
                    value={inputValue}
                    onChange={this.onChange}
                    type="text"
                    isInvalid={!valid}
                  />
                  <Form.Control.Feedback type="invalid">Уже существует</Form.Control.Feedback>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.close}>
              Закрыть
            </Button>
            <Button onClick={(e) => this.onKeyDown(e, inputValue)}>
              Добавить
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Category;
