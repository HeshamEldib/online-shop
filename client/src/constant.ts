export const MainURL: string = "https://online-shop-api-zeta.vercel.app/";
 
export const Authorization: string = `Berarer ${localStorage.getItem(
  "userToken"
)}`;

export const UserToken: string = `${localStorage.getItem("userToken")}`;
export const CheckUserToken: boolean = UserToken !== "null";

export const categoryList: string[] = [
  "electronics",
  "men's clothing",
  "women's clothing",
  "jewelery",
];
