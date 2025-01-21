const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

export const postItems = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
};

export const deleteItems = (itemId) => {
    return fetch(`${baseUrl}/items/${itemId}`,{
        method: "DELETE",
    })
    .then(checkResponse)
};
