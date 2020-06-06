import { API } from "../../backend";

// CATEGORY

// create new category

export const createCategory = (userId, token, category) => {
  return fetch(`/api/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// get a category

export const getCategory = (categoryId) => {
  return fetch(`/api/category/${categoryId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// get all categories

export const getAllCategories = () => {
  return fetch(`/api/category/all`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// update a category

export const updateCategory = (userId, token, category, categoryId) => {
  return fetch(`/api/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// delete a category

export const deleteCategory = (userId, token, categoryId) => {
  return fetch(`/api/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// PRODUCT

export const createProduct = (userId, token, product) => {
  return fetch(`/api/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

// get all products

export const getAllProducts = () => {
  return fetch(`/api/products`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// get a product

export const getProduct = (productId) => {
  return fetch(`/api/product/${productId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// update a product

export const updateProduct = (userId, token, product, productId) => {
  return fetch(`/api/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// delete a product

export const deleteProduct = (userId, token, productId) => {
  return fetch(`/api/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};