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


