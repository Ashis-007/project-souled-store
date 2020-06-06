import { API } from "../../backend";

export const getAllProducts = () => {
  return fetch(`api/products`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
