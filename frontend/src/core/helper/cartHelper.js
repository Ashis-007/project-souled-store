export const addItemToCart = (item, id = 7, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem(`cart-${id}`)) {
      cart = JSON.parse(localStorage.getItem(`cart-${id}`));
    }
    cart.push({ ...item, count: 1 });
    localStorage.setItem(`cart-${id}`, JSON.stringify(cart));
    next();
  }
};

export const loadCart = (id = 7) => {
  if (typeof window !== undefined) {
    if (localStorage.getItem(`cart-${id}`)) {
      return JSON.parse(localStorage.getItem(`cart-${id}`));
    }
    return [];
  }
};

export const removeItemFromCart = (productId, id = 7) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem(`cart-${id}`)) {
      cart = JSON.parse(localStorage.getItem(`cart-${id}`));
    }
    cart.map((product, index) => {
      if (product._id === productId) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem(`cart-${id}`, JSON.stringify(cart));
  }
  return cart;
};

export const cartEmpty = (id = 7, next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem(`cart-${id}`);
    let cart = [];
    localStorage.setItem(`cart-${id}`, JSON.stringify(cart));

    next();
  }
};
