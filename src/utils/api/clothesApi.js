import { request } from "./apiConfig";
const baseUrl = "http://localhost:3001";

export const getItems = () => {
  return request(`${baseUrl}/items`);
};

export const postItems = (item, token) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(item),
  })
};

export const deleteItems = (itemId, token) => {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
};
