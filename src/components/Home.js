import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "./Base";
import { isAuthenticated } from "./helper/auth";

import { createItem, getItems, deleteItem } from "./helper/ItemApiCalls";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getItems(user._id, token).then((data) => {
      if (!data.success) {
        console.log(data.error);
      } else {
        setItems(data.items);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisItem = (itemId) => {
    deleteItem(itemId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");

    createItem(user._id, token, { title, description })
      .then((data) => {
        if (!data.success) {
          console.log(data);
        } else {
          preload();
          setTitle("");
          setDescription("");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Base title="Home Page" description="Welcome to the Tshirt store">
      <div className="container">
        <div className="card p-4 mt-4">
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              style={{
                border: "1px solid black",
                borderRadius: "3px",
                outline: "none",
                width: "100%",
                marginBottom: "10px",
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
                border: "1px solid black",
                borderRadius: "3px",
                outline: "none",
                width: "100%",
                marginBottom: "10px",
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
              Add
            </button>
          </form>
        </div>
        <div>
          <div>
            <div className="row">
              {items.map((item, index) => {
                return (
                  <div key={index} className="card mt-3 mb-3 p-4 col-sm-12">
                    {!item.title && !item.description && "Empty Note"}
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <div className="col-sm-6">
                      <Link
                        className=" btn btn-danger mr-4"
                        to={`/item/update/${item._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={(e) => deleteThisItem(item._id)}
                        className="btn btn-warning"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
