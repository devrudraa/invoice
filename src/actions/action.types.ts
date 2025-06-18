export interface ErrorType {
  type: "error";
  errors: Record<string, string[]>;
}

export interface SuccessType {
  type: "success";
  message: string;
}

export interface CustomErrorType {
  type: "Custom-Error";
  error: string;
}

export type ActionReturnType = ErrorType | SuccessType | CustomErrorType;
