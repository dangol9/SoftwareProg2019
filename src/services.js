const basePath = "/api/v1";

export const getItems = () => {
  return fetch(`${basePath}/items`)
  .then(res => {
    if(!res.ok) throw "getItems failed!";
    return res.json();
  });
};

export const getItem = ({itemId}) => {
  return fetch(`${basePath}/items/${itemId}`)
  .then(res => {
    if(!res.ok) throw "getItem failed!";
    return res.json();
  });
};

export const getUser = ({userId, token}) => {
  return fetch(`${basePath}/users/${userId}`, {
    headers:{
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => {
    if(!res.ok) throw "getUser failed!";
    return res.json();
  });
};

export const addItemToCart = ({itemId, token, userId}) => {
  return fetch(`${basePath}/users/${userId}/cart/${itemId}`, {
    method: "PUT",
    headers:{
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => {
    if(!res.ok) throw "Additemtocart failed";
    return true;
  });

};

export const removeItemFromCart = ({userId, itemId, token}) => {
  return fetch(`${basePath}/users/${userId}/cart/${itemId}`, {
    method: "DELETE",
    headers:{
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => {
    if(!res.ok) throw "removeItemFromCart failed";
    return true;
  });
};

export const login = ({email, password}) => {
  return fetch(`${basePath}/auth/login`, {
    method: "POST",
    headers:{
      "content-type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then(res => {
    if(!res.ok) throw "login failed!";
    return res.json();
  });
};

export const signup = ({email, password}) => {
  return fetch(`${basePath}/auth/signup`, {
    method: "POST",
    headers:{
      "content-type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then(res => {
    if(!res.ok) throw "signup failed!";
    return res.json();
  });
};

export const getPayments = ({userId, token}) => {
  return fetch(`${basePath}/users/${userId}/payments`, {
    method: "GET",
    headers:{
      "Authorization": `Bearer ${token}`
    },
  })
  .then(res => {
    if(!res.ok) throw "getPayments failed!";
    return res.json();
  });
};

export const checkout = ({stripeToken, userId, token}) => {
  return fetch(`${basePath}/users/${userId}/checkout`, {
    method: "POST",
    headers:{
      "content-type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(stripeToken)
  })
  .then(res => {
    if(!res.ok) throw "checkout failed!";
  });
};
