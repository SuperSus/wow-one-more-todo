import React from "react";
const List = ({ list, removeHandler, editHandler}) => (
  <div className="single-list" key={list.id}>
    <h4>{list.title}</h4>
    <p>{list.excerpt}</p>
    <button onClick={() => removeHandler(list.id)}>Erase</button>
    <button onClick={() => editHandler(list.id)}>Edit</button>
  </div>
);
export default List;
