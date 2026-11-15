export interface ValidationDetail {
  field: string;
  message: string;
}

export interface ValidationErrorResponse {
  error: {
    code: string;
    message: string;
    status: number;
    details: ValidationDetail[];
  };
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean
}
export interface UsersResponse {
  data: User[],
  pagination: Pagination
}