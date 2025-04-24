import {
  Inspect,
  RequestMethod,
  TransformErrorResponse,
  TransformResponse,
} from "@/shared";

export interface IConfig
  extends Pick<RequestInit, "credentials" | "mode" | "cache"> {
  baseURL?: string;
  methods?: RequestMethod[];
  timeout?: number;
  headers?: HeadersInit;
}

export interface IRequestOptions extends IConfig {
  query?: Record<string, string>;
  method?: RequestMethod;
  body?: BodyInit | null;
  transformResponse?: TransformResponse;
  transformErrorResponse?: TransformErrorResponse;
  inspect?: Inspect;
}

export interface IRequestOptionsExtra
  extends Omit<
    IRequestOptions,
    "transformResponse" | "transformErrorResponse"
  > {}

export interface InitiatorParams {
  path: string;
  method: RequestMethod;
  options?: IRequestOptions;
}

export interface GenURLParams {
  path: string;
  baseURL?: string;
  query?: Record<string, string>;
}

export interface ReqParams {
  url: string;
  options?: Omit<IRequestOptions, "query" | "baseURL" | "methods">;
}

export interface NormalizedReqOptions
  extends Omit<IRequestOptions, "methods" | "baseURL" | "timeout" | "query"> {}

export interface InspectObject
  extends Omit<
    IRequestOptions,
    "transformResponse" | "transformErrorResponse"
  > {
  full_url?: string;
}
