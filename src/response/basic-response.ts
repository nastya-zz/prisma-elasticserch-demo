export class BasicResponse<T> {
  readonly data: T | null = null;
  readonly message: string | null = null;
  readonly success: boolean = false;

  constructor(data: T, message = '', success = false) {
    this.data = data;
    this.message = message;
    this.success = success;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

  static getSuccess(data, msg) {
    return new BasicResponse.builder()
      .setSuccess(true)
      .setMessage(msg)
      .setData(data);
  }

  static getError(msg) {
    return new BasicResponse.builder()
      .setSuccess(false)
      .setMessage(msg)
      .setData(null);
  }
}
