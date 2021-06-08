import React from 'react';
import axios from 'axios';
import { Button, Form, Container } from 'react-bootstrap';

class FormComp extends React.Component {
  constructor() {
    super();
    this.state = { inputValue: '', category: [], select: '' };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/category')
      .then((res) => this.setState({ category: res.data }));
  }

  onChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  render() {
    const { inputValue, category, select } = this.state;
    const { onKeyDown } = this.props;

    return (
      <Container fluid="sm">
        <Form size="md">
          <Form.Row>
            <Form.Label>Запланировать</Form.Label>
            <Form.Control value={inputValue} onChange={this.onChange} type="text" />
            <br />
            <br />
            <Form.Label>Категория</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => this.setState({ select: e.target.value })}
              defaultValue="DEFAULT"
            >
              <option value="DEFAULT" disabled>
                Choose category
              </option>
              {category.map((el) => (
                <option key={el.id} value={el.text} label={el.text} />
              ))}
            </Form.Control>
            <br />
            <br />
            <Button type="button" onClick={(e) => onKeyDown(e, inputValue, select)}>
              Запланировать
            </Button>
          </Form.Row>
          <br />
          <br />
        </Form>
      </Container>
    );
  }
}

export default FormComp;
