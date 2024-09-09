import { doGet } from "./api"

export const getProductData = () => {
    return doGet("https://fakestoreapi.com/products", {}, {});
}