import { InspectObject } from "@/src/shared";

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

export type CuteFetchResponse = {
  status: number;
  statusText: string;
  data?: any;
  error?: any;
};

export type TransformResponse = (dataFromServer: any) => any;

export type TransformErrorResponse = (errorFromServer: any) => any;

type InspectRule = {
  full_url?: boolean;
  baseURL?: boolean;
  methods?: boolean;
  method?: boolean;
  headers?: boolean;
  query?: boolean;
  body?: boolean;
  timeout?: boolean;
  mode?: boolean;
  cors?: boolean;
  cache?: boolean;
  credentials?: boolean;
};

export type Inspect = () => {
  name_space?: string;
  rule?: InspectRule;
  callback: (result: {
    readonly extract: () => InspectObject;
    [key: string]: InspectObject | (() => InspectObject);
  }) => void;
};
