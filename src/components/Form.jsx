import React from 'react';

class Form extends React.Component {
  constructor() {
    super();
    this.state = { inputValue: '' };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  render() {
    const { inputValue } = this.state;
    const { onKeyDown } = this.props;

    return (
      <form>
        <input type="text" value={inputValue} onChange={this.onChange} />
        <button type="button" onClick={(e) => onKeyDown(e, inputValue)}>
          Добавить дело
        </button>
      </form>
    );
  }
}

export default Form;
