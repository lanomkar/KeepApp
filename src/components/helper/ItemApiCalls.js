import { API } from "../../Backend";

//item create
export const createItem = (userId, token, item) => {
  return fetch(`${API}item/create/${userId}`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get all categories

export const getItems = (userId, token) => {
  return fetch(`${API}/items/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete a item
export const deleteItem = (itemId, userId, token) => {
  return fetch(`${API}item/${itemId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",

      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get a item
export const getItem = (itemId, userId, token) => {
  return fetch(`${API}item/${itemId}/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//update a product
export const updateItem = (itemId, userId, token, item) => {
  const putMethod = {
    method: "PUT", // Method itself
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item), // We send data in JSON format
  };
  return fetch(`${API}item/${itemId}/${userId}`, putMethod)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
