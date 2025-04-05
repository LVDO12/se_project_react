import { request } from "./apiConfig";
const baseUrl = "http://localhost:3001";

export const signup = ({name, avatar, email, password}) => {
  console.log({email,password, name,avatar});
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const signin = ({email, password}) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};
