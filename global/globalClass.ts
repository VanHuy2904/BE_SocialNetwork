export class ResponseData<D> {
  data: D | D[];
  StatusCode: number;
  message: string;

  constructor(data: D | D[], StatusCode: number, message: string) {
    this.data = data;
    this.StatusCode = StatusCode;
    this.message = message;

    return this;
  }
}
