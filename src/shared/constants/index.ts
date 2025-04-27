import { ConfigProps, RequestMethod } from "@/src/shared";

export const credentialsProps: RequestCredentials[] = [
  "include",
  "same-origin",
  "omit",
];

export const modeProps: RequestMode[] = [
  "cors",
  "no-cors",
  "same-origin",
  "navigate",
];

export const cacheProps: RequestCache[] = [
  "default",
  "no-cache",
  "reload",
  "force-cache",
  "only-if-cached",
  "no-store",
];

export const methodsProps: RequestMethod[] = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
  "EXTRA",
];

export const bodyLessMethodProps: RequestMethod[] = [
  "GET",
  "HEAD",
  "OPTIONS",
  "DELETE",
];

export const confgPropsProps: ConfigProps[] = [
  "baseURL",
  "cache",
  "credentials",
  "methods",
  "mode",
  "timeout",
  "headers",
];

export const defaultTimeout: number = 5000;
