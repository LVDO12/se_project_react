const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

function request(url, option) {
  return fetch(url, option).then(checkResponse);
}

export const getItems = () => {
  return request(`${baseUrl}/items`);
};

export const postItems = (item) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
};

export const deleteItems = (itemId) => {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  })
};
