import {API} from "../config";


export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=4`, {
     method: "GET",
     })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};
