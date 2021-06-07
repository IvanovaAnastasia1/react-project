/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      category: [],
      inputValue: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/category')
      .then((res) => this.setState({ category: res.data }));
  }

  onKeyDown(event, value) {
    event.preventDefault();
    const { category, inputValue } = this.state;

    const exist = category.find((el) => el.text === inputValue);

    if (exist) {
      console.log('exist');
      return
    }
    axios
      .post('http://localhost:3001/category', {
        id: Math.random(),
        text: value,
      })
      .then((result) =>
        axios
          .get('http://localhost:3001/category')
          .then((res) => this.setState({ category: res.data })),
      );
  }

  onChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  render() {
    const { category, inputValue } = this.state;

    return (
      <div>
        <Link to="/">Список дел </Link>
        <Link to="/addcategory"> Категории</Link>
        <form>
          <input type="text" value={inputValue} onChange={this.onChange} />
          <button type="button" onClick={(e) => this.onKeyDown(e, inputValue)}>
            Добавить категорию
          </button>
        </form>
        <ul>
          {category.map((el) => (
            <li key={el.id}>
              <span>{el.text}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Category;
