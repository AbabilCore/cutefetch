export class CF_ERROR extends Error {
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = "CuteFetch";
    this.message = message;
  }
}
