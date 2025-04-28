export const isValidURL = (url: string) => {
  try {
    return new URL(url);
  } catch (error) {
    return false;
  }
};

export class CF_ERROR extends Error {
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = "CuteFetch";
    this.message = message;
  }
}
