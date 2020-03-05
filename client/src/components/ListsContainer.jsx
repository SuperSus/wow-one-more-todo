import React, { Component } from "react";
import axios from "axios";

import List from "./ List";
import NewListForm from "./NewListForm";

class ListsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/v1/lists.json")
      .then(response => {
        console.log(response);
        this.setState({
          lists: response.data
        });
      })
      .catch(error => console.log(error));
  }

  addNewList = (title, excerpt) => {
    axios
      .post("/api/v1/lists", { list: { title, excerpt } })
      .then(response => {
        console.log(response);
        const lists = [...this.state.lists, response.data];
        this.setState({ lists });
      })
      .catch(error => {
        console.log(error);
      });
  };

  removeList = id => {
    axios
      .delete(`/api/v1/lists/${id}`)
      .then(response => {
        this.setState(({ lists }) => ({
          lists: lists.filter(list => list.id !== id)
        }));
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="lists-container">
        {this.state.lists.map(list => (
          <List list={list} removeHandler={this.removeList} key={list.id} />
        ))}
        <NewListForm onNewList={this.addNewList} />
      </div>
    );
  }
}

export default ListsContainer;
