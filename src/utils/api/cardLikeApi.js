import { request } from "./apiConfig";
const baseUrl = "http://localhost:3001";

export const likeCard = (token, id) => {
    return request(`${baseUrl}/items/${id}/likes`,{
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
};

export const unLikeCard = (token, id) => {
    return request(`${baseUrl}/items/${id}/likes`,{
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
};