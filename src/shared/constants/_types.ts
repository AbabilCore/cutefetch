export type RequestMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"
  | "EXTRA";

export type ConfigProps =
  | "baseURL"
  | "methods"
  | "timeout"
  | "headers"
  | "credentials"
  | "mode"
  | "cache";
