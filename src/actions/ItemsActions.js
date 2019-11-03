export const getItems = () => {
  return fetch("/api/v1/items")
  .then(res =>{
    console.log("res", res);
    return res.json();
  });
};
