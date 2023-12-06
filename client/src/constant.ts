export const URL: string = "http://localhost:3000";

export const Authorization: string = `Berarer ${localStorage.getItem(
  "userToken"
)}`;

export const UserToken: string = `${localStorage.getItem("userToken")}`;

export const categoryList: string[] = [
  "electronics",
  "men's clothing",
  "women's clothing",
  "jewelery",
];
