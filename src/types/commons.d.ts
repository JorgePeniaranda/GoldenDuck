interface ErrorResponse {
  error: string;
}

export type InternalReponse<Data> = ErrorResponse | Data;
