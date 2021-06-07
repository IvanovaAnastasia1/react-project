import React from 'react';
import axios from 'axios';

class Form extends React.Component {
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
      <form>
        <input type="text" value={inputValue} onChange={this.onChange} />
        <select onChange={(e) => this.setState({ select: e.target.value })}>
          <option disabled>Выберите категорию</option>
          {category.map((el) => (
            <option key={el.id} value={el.text} label={el.text} />
          ))}
        </select>
        <button type="button" onClick={(e) => onKeyDown(e, inputValue, select)}>
          Добавить дело
        </button>
      </form>
    );
  }
}

export default Form;
