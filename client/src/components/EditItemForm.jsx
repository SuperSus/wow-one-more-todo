import React, { Component } from "react";

class EditItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...props.list};
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // const { id, title, excerpt } = this.state;
    this.props.submitHandler(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Title..."
          value={this.state.title}
          onChange={this.handleChange}
        />
        <input
          name="excerpt"
          type="text"
          placeholder="Excerpt..."
          value={this.state.excerpt}
          onChange={this.handleChange}
        />
        <button>Update List</button>
      </form>
    );
  }
}
export default EditItemForm;
