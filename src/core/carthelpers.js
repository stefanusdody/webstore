export const addItem = (item) => {
  let cart = []
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.push({
      ...item,
      count: 1
    });

    // remove duplicates
    // build an Array from new Set and turn it back into array using Array.from
    // so that later we can re-map it
    // new set will only allow unique values in it
    // so pass the ids of each object/product
    // if the loop tries to add the same value again, it'll get ignored
    // ...with the array of ids we got on when first map() was used
    // run map() on it again and return the actual product from the cart


    cart = Array.from(new Set(cart.map((p) => (p._id)))).map(id => {
      return cart.find(p => p._id === id);
    });
    localStorage.setItem('cart', JSON.stringify(cart))
  }
};

export const itemTotal = () => {
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart')).length;
    }
  }
  return 0;
};

export const getCart = () => {
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
  return [];
}

export const updateItem = (productId, count) => {
  let cart = [];
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.map((product, i) => {
      if(product._id === productId) {
        cart[i].count = count
      }
    })
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const removeItem = (productId) => {
  let cart = [];
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.map((product, i) => {
      if(product._id === productId) {
        cart.splice(i, 1)
      }
    })
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

export const emptyCart = () => {
  if(typeof window !== "undefined") {
    localStorage.removeItem("cart")
  }
}

export const emptyAddress = () => {
  if(typeof window !== "undefined") {
    localStorage.removeItem("address")
  }
}

export const addAddress = (item) => {
  let address = []
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('address')) {
      address = JSON.parse(localStorage.getItem('address'))
    }
    address.push({
      ...item,
    });

    // remove duplicates
    // build an Array from new Set and turn it back into array using Array.from
    // so that later we can re-map it
    // new set will only allow unique values in it
    // so pass the ids of each object/product
    // if the loop tries to add the same value again, it'll get ignored
    // ...with the array of ids we got on when first map() was used
    // run map() on it again and return the actual product from the cart


    address = Array.from(new Set(address.map((p) => (p._id)))).map(id => {
      return address.find(p => p._id === id);
    });
    localStorage.setItem('address', JSON.stringify(address))
  }
};

export const getAddress = () => {
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('address')) {
      return JSON.parse(localStorage.getItem('address'));
    }
  }
  return [];
}

export const removeAddress = (productId) => {
  let address = [];
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('address')) {
      address = JSON.parse(localStorage.getItem('address'));
    }
    address.map((p, i) => {
      address.splice(i, 1)
    })

    localStorage.setItem('address', JSON.stringify(address));
  }
  return address;
};

export const addCourier = (item) => {
  let courier = []
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('courier')) {
      courier = JSON.parse(localStorage.getItem('courier'))
    }
    courier.push({
      ...item,
    });

    // remove duplicates
    // build an Array from new Set and turn it back into array using Array.from
    // so that later we can re-map it
    // new set will only allow unique values in it
    // so pass the ids of each object/product
    // if the loop tries to add the same value again, it'll get ignored
    // ...with the array of ids we got on when first map() was used
    // run map() on it again and return the actual product from the cart


    courier = Array.from(new Set(courier.map((p) => (p._id)))).map(id => {
      return courier.find(p => p._id === id);
    });
    localStorage.setItem('courier', JSON.stringify(courier))
  }
};

export const getCourier = () => {
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('courier')) {
      return JSON.parse(localStorage.getItem('courier'));
    }
  }
  return [];
}

export const removeCourier = () => {
  let courier = [];
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('courier')) {
      courier = JSON.parse(localStorage.getItem('courier'));
    }
    courier.map((p, i) => {
      courier.splice(i, 1)
    })

    localStorage.setItem('courier', JSON.stringify(courier));
  }
  return courier;
};

export const emptyCourier = () => {
  if(typeof window !== "undefined") {
    localStorage.removeItem("courier")
  }
}
