import { Pagination } from "./common/pagination.types";
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}


export interface UsersResponse {
  data: User[],
  pagination: Pagination
}
