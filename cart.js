const MAX_PER_DISH = 10;

let cart = [];

function getItemQuantity(dishId) {
  const existing = cart.find((item) => item.id === dishId);
  return existing ? existing.quantity : 0;
}

function addToCart(dish) {
  if (!dish || dish.id === undefined) return cart;

  const existing = cart.find((item) => item.id === dish.id);
  if (existing) {
    if (existing.quantity >= MAX_PER_DISH) {
      existing.quantity = MAX_PER_DISH;
      return cart;
    }
    existing.quantity += 1;
  } else {
    cart.push({
      ...dish,
      quantity: 1
    });
  }

  return cart;
}

function incrementDish(dishId) {
  const existing = cart.find((item) => item.id === dishId);
  if (!existing) return cart;
  if (existing.quantity < MAX_PER_DISH) {
    existing.quantity += 1;
  } else {
    existing.quantity = MAX_PER_DISH;
  }
  return cart;
}

function decrementDish(dishId) {
  const index = cart.findIndex((item) => item.id === dishId);
  if (index === -1) return cart;

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  return cart;
}

function parsePriceValue(price) {
  if (typeof price === "number") return price;
  if (typeof price === "string") {
    const numeric = parseFloat(price.replace(/[^0-9.]/g, ""));
    return Number.isNaN(numeric) ? 0 : numeric;
  }
  return 0;
}

function getCartSubtotal() {
  return cart.reduce((sum, item) => sum + parsePriceValue(item.price) * item.quantity, 0);
}

function isPlusDisabled(dishId) {
  return getItemQuantity(dishId) >= MAX_PER_DISH;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    MAX_PER_DISH,
    cart,
    getItemQuantity,
    addToCart,
    incrementDish,
    decrementDish,
    getCartSubtotal,
    isPlusDisabled
  };
}
