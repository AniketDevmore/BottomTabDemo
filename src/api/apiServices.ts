import { doGet } from "./api"

export const getProductData = () => {
    return doGet("https://fakestoreapi.in/api/products", {}, {});
}