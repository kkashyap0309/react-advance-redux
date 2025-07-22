const BASE_URL = "http://localhost:4000"

export async function getUserSelectedPlaces() {
  const response = await fetch(BASE_URL+"/cart");
  const resData = await response.json();
  if (!response.ok) {
    throw new Error();
  }

  return resData.cart;
}

export async function updateCartAsync(cart) {
  const updateResponse = await fetch(BASE_URL+"/user-cart-product", {
    method: "PUT",
    body: JSON.stringify({ cart }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!updateResponse.ok) {
    throw new Error();
  }

  const resData = await updateResponse.json();
  return resData.message;
}

export function updateCart(cart) {
  const updateResponse = fetch(BASE_URL+"/user-cart-product", {
    method: "PUT",
    body: JSON.stringify({ cart }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!updateResponse.ok) {
    throw new Error();
  }

  const resData = updateResponse.json();
  return resData.message;
}