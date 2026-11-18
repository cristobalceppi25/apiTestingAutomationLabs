import { Pagination } from "./common/pagination.types";
export interface Products {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export interface ProductsResponse {
  data: Products[],
  pagination: Pagination
}