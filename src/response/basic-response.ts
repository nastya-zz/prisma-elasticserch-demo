export class BasicResponse<T> {
  readonly data: T | null = null;
  readonly message: string | null = null;
  readonly success: boolean = false;

  constructor(data: T, message = '', success = false) {
    this.data = data;
    this.message = message;
    this.success = success;
  }

  // @ts-ignore
  static builder = class<R> {
    data: R | null = null;
    message: string | null = null;
    success = false;

    setSuccess(flag: boolean) {
      this.success = flag;
      return this;
    }
    setData(data: R) {
      this.data = data;
      return this;
    }
    setMessage(message: string) {
      this.message = message;
      return this;
    }

    build(): BasicResponse<R> {
      return new BasicResponse<R>(this.data, this.message, this.success);
    }
  };
}
