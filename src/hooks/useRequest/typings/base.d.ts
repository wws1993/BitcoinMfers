declare namespace API {
  type Response<T> = Promise<{
    code: number;
    data: T;
    message: string;
  }>
}