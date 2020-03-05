import React, { Component } from "react";
import axios from "axios";

import List from "./ List";
import NewListForm from "./NewListForm";
import EditListForm from "./EditItemForm";

class ListsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      editingListId: null
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

  addNewItem = (title, excerpt) => {
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

  editList = ({ id, title, excerpt }) => {
    axios
      .put(`/api/v1/lists/${id}`, { list: { title, excerpt } })
      .then(response => {
        this.setState(({ lists }) => {
          const listsDup = [...lists];
          let editingListIndex = listsDup.find(item => item.id === id);
          listsDup[editingListIndex] = { id, title, excerpt };
          return { lists: listsDup, editingListId: null };
        });
      })
      .catch(error => console.log(error));
  };

  setEditingList = id => {
    this.setState({ editingListId: id });
  };

  render() {
    const { lists, editingListId } = this.state;
    return (
      <div className="lists-container">
        {lists.map(list => (
          <div key={list.id}>
            <div>
              <List
                list={list}
                removeHandler={this.removeList}
                editHandler={this.setEditingList}
              />
              {list.id === editingListId && (
                <EditListForm list={list} submitHandler={this.editList} />
              )}
            </div>
            <hr />
          </div>
        ))}
        <NewListForm onNewList={this.addNewItem} />
      </div>
    );
  }
}

export default ListsContainer;
