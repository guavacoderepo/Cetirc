export class Result<T, E extends Error> {
  constructor(private value?: T | PromiseLike<T>, private errorValue?: E) {}

  // check if there error
  public isOk(): boolean {
    return this.value !== undefined && !this.errorValue;
  }

  // check if it's error
  public isErr(): boolean {
    return !this.isOk();
  }

  // return error
  public error(): E | PromiseLike<T> {
    return this.errorValue!!;
  }

  // unwrap

  public unwind(): T | PromiseLike<T> {
    if (this.isErr()) {
      console.error("Unwrap error: ", this.errorValue);

      throw this.errorValue;
    }

    return this.value!!;
  }

  static err<T, E extends Error>(err: E): Result<T, E> {
    console.log(err);

    return new this(undefined as T, err);
  }

  static ok<T, E extends Error>(val: T): Result<T, E> {
    return new this(val);
  }
}
