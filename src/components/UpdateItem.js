import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Base from "./Base";
import { isAuthenticated } from "./helper/auth";

import { getItem, updateItem } from "./helper/ItemApiCalls";

const UpdateItem = ({ match, history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { user, token } = isAuthenticated();

  const preload = (itemId) => {
    getItem(itemId, user._id, token).then((data) => {
      if (!data.success) {
        console.log(data);
      } else {
        setTitle(data.item.title);
        setDescription(data.item.description);
      }
    });
  };

  useEffect(() => {
    preload(match.params.itemId);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    updateItem(match.params.itemId, user._id, token, {
      title,
      description,
    }).then((data) => {
      if (!data.success) {
        console.log("ERROR");
      } else {
        history.push("/");
      }
    });
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Base title="Home Page" description="Welcome to the Tshirt store">
      <div className="container">
        <div className="card p-4 mt-4">
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              style={{
                border: "0px solid black",
                borderRadius: "3px",
                outline: "none",
                width: "100%",
              }}
              className="p-2 d-block"
              placeholder="Title"
              value={title}
              onChange={(e) => handleChangeTitle(e)}
            />
            <textarea
              type="text"
              value={description}
              style={{
                border: "0px solid black",
                borderRadius: "3px",
                outline: "none",
                width: "100%",
              }}
              className="p-2 d-block"
              placeholder="Description"
              onChange={(e) => handleChangeDescription(e)}
            ></textarea>
            <button
              type="submit"
              onClick={(e) => onSubmit(e)}
              className="btn btn-danger"
            >
              Edit
            </button>
          </form>
        </div>
      </div>
    </Base>
  );
};

export default withRouter(UpdateItem);
