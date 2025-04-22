interface IConfig extends Pick<RequestInit, "credentials" | "mode" | "cache"> {
    baseURL?: string;
    methods?: RequestMethod[];
    timeout?: number;
    headers?: HeadersInit;
}
interface IRequestOptions extends IConfig {
    query?: Record<string, string>;
    method?: RequestMethod;
    body?: BodyInit | null;
}
interface InitiatorParams {
    path: string;
    method: RequestMethod;
    options?: IRequestOptions;
}
interface ReqParams {
    url: string;
    options?: Omit<IRequestOptions, "query" | "baseURL" | "methods">;
}
type CuteFetchResponse = {
    status: number;
    statusText: string;
    data?: any;
    error?: any;
};

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "EXTRA";

declare class RequestHandler {
    private _timout;
    private _normalized_request_options;
    private _parse_response;
    private _cute_fetch_response;
    protected reqGET: ({ url, options }: ReqParams) => Promise<CuteFetchResponse>;
    protected reqPOST: ({ url, options }: ReqParams) => Promise<CuteFetchResponse>;
    protected reqPUT: ({ url, options }: ReqParams) => Promise<CuteFetchResponse>;
    protected reqPATCH: ({ url, options }: ReqParams) => Promise<CuteFetchResponse>;
    protected reqDELETE: ({ url, options }: ReqParams) => Promise<CuteFetchResponse>;
    protected reqEXTRA: ({ url, options }: ReqParams) => Promise<Response>;
}

declare class RequestConstract extends RequestHandler {
    protected config?: IConfig | undefined;
    constructor(config?: IConfig | undefined);
    protected initiator: <T = CuteFetchResponse>({ path, method, options, }: InitiatorParams) => Promise<T>;
    private _genURL;
    private _bridge;
}

declare class CuteFetch extends RequestConstract {
    protected config?: IConfig | undefined;
    constructor(config?: IConfig | undefined);
    get: (path: string, options?: IRequestOptions) => Promise<CuteFetchResponse>;
    post: (path: string, options?: IRequestOptions) => Promise<CuteFetchResponse>;
    put: (path: string, options?: IRequestOptions) => Promise<CuteFetchResponse>;
    patch: (path: string, options?: IRequestOptions) => Promise<CuteFetchResponse>;
    delete: (path: string, options?: IRequestOptions) => Promise<CuteFetchResponse>;
    extra: (path: string, options?: IRequestOptions) => Promise<Response>;
}

export { CuteFetch as default };
