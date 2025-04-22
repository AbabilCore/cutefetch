export const isValidURL = (url: string) => {
  try {
    return new URL(url);
  } catch (error) {
    return false;
  }
};
