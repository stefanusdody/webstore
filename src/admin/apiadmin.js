import {API} from "../config";
import queryString from 'query-string';

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
     method: "POST",
     headers: {
       Accept: 'application/json',
       "Content-Type": 'application/json',
       Authorization: `Bearer ${token}`
     },
     body: JSON.stringify(category)
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err)
  })
};


export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
     method: "POST",
     headers: {
       Accept: 'application/json',
       Authorization: `Bearer ${token}`
     },
     body: product
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
     method: "GET",
     })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};

export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
     method: "GET",
     headers: {
       Accept: 'application/json',
       Authorization: `Bearer ${token}`
        }
     })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
     method: "GET",
     headers: {
       Accept: 'application/json',
       Authorization: `Bearer ${token}`
        }
     })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
     method: "PUT",
     headers: {
       Accept: 'application/json',
       "Content-Type": 'application/json',
       Authorization: `Bearer ${token}`
       },
      body: JSON.stringify({status, orderId})
     })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};

//to perform crud on product


//get all Products
export const getProducts = () => {
  return fetch(`${API}/products?limit=100`, {
     method: "GET",
     })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};

//get all Products
export const getPayments = () => {
  return fetch(`${API}/payments`, {
     method: "GET",
     })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};

//get a single product
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
     method: "GET",
     })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};

//delete single product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
     method: "DELETE",
     headers: {
       Accept: 'application/json',
       "Content-Type": 'application/json',
       Authorization: `Bearer ${token}`
       },
     })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};

//delete payments confirmation
export const deletePayment = (paymentId, userId, token) => {
  return fetch(`${API}/payment/${paymentId}/${userId}`, {
     method: "DELETE",
     headers: {
       Accept: 'application/json',
       "Content-Type": 'application/json',
       Authorization: `Bearer ${token}`
       },
     })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};

//update single product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
     method: "PUT",
     headers: {
       Accept: 'application/json',
       Authorization: `Bearer ${token}`
       },
       body: product
     })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};

//get all orders
export const getOrders = () => {
  return fetch(`${API}/orders`, {
     method: "GET",
     })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};

export const list = params => {
  const query = queryString.stringify(params)
  console.log('query', query);
  return fetch(`${API}/orders?${query}`, {
     method: "GET",
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};


//get single orders
export const getOrder = (orderId) => {
  return fetch(`${API}/order/${orderId}`, {
     method: "GET",
     })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
};
