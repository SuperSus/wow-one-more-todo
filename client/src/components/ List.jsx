import React from "react";
const List = ({ list, removeHandler}) => (
  <div className="single-list" key={list.id}>
    <h4>{list.title}</h4>
    <p>{list.excerpt}</p>
    <button onClick={() => removeHandler(list.id)}>Erase</button>
    <hr />
  </div>
);
export default List;
