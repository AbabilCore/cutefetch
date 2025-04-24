import { RequestHandler } from "@/helper";
import {
  bodyLessMethodProps,
  cacheProps,
  CF_ERROR,
  credentialsProps,
  CuteFetchResponse,
  GenURLParams,
  IConfig,
  InitiatorParams,
  InspectObject,
  IRequestOptions,
  isValidURL,
  modeProps,
} from "@/shared";

export class RequestConstract extends RequestHandler {
  constructor(protected config?: IConfig) {
    super();
  }

  protected initiator = <T = CuteFetchResponse>({
    path,
    method,
    options,
  }: InitiatorParams): Promise<T> => {
    let {
      baseURL,
      cache,
      credentials,
      mode,
      methods,
      method: requestOptionsMethod,
      timeout,
      body,
      headers,
      query,
      transformErrorResponse,
      transformResponse,
      inspect,
    }: IRequestOptions = {
      ...this.config,
      ...options,
      headers: { ...this.config?.headers, ...options?.headers },
    };

    // check baseURL is not valid URL
    if (baseURL && !isValidURL(baseURL))
      throw new CF_ERROR(`invalid 'baseURL' for CuteFetch!\n-> ${baseURL}\n`);

    // check if path is empty
    if (!path) throw new CF_ERROR(`Path should be empty!`);

    // Check if path is not valid URL
    if (
      (path?.startsWith("http") || path?.startsWith("https")) &&
      !isValidURL(path)
    )
      throw new CF_ERROR(
        `invalid url for cf.${method.toLowerCase()}(${path}) method.`
      );

    // replace baseURL by path if path is a valid url
    if (path?.startsWith("http") || path?.startsWith("https")) {
      baseURL = path;
    }

    // Check if corresponding request methods is enabled
    if (method !== "EXTRA" && !methods?.includes(method))
      throw new CF_ERROR(`Please enable '${method}' in CuteFetch Config.`);

    if (
      method === "EXTRA" &&
      requestOptionsMethod &&
      !methods?.includes(requestOptionsMethod)
    )
      throw new CF_ERROR(
        `Please enable '${requestOptionsMethod}' in CuteFetch Config.`
      );

    // Check request method is present in cf.extra() metods
    if (method === "EXTRA" && !options?.method)
      throw new CF_ERROR(
        `Please add request method for request options in cf.extra() methods`
      );

    // Check if override the request method
    if (method !== "EXTRA" && options?.method && method !== options?.method)
      throw new CF_ERROR(
        `You can not override '${method}' to '${
          options?.method
        }' method for cf.${method.toLowerCase()}() methods`
      );

    // check if invalid cache value provide
    if (cache && !cacheProps.includes(cache))
      throw new CF_ERROR(`Invalid cache value '${cache}' for http request!`);

    // check if invalid credentials value provide
    if (credentials && !credentialsProps.includes(credentials))
      throw new CF_ERROR(
        `Invalid credentials value '${credentials}' for http request!`
      );

    // check if invalid mode value provide
    if (mode && !modeProps.includes(mode))
      throw new CF_ERROR(`Invalid mode value '${mode}' for http request!`);

    // check if body present in bodyless http request
    if (
      body &&
      (requestOptionsMethod || method) &&
      bodyLessMethodProps.includes(requestOptionsMethod || method)
    )
      throw new CF_ERROR(
        `http request '${
          requestOptionsMethod || method
        }' does not allow 'body' property in request options`
      );

    // check is valid timeout value provided
    if (timeout && (isNaN(timeout) || timeout < 0))
      throw new CF_ERROR(`timeout must be a valid positive number `);

    // check if transformErrorResponse and transformResponse present in extra instance method
    if (method === "EXTRA" && (transformErrorResponse || transformResponse))
      throw new CF_ERROR(
        `You can not use ${
          (transformErrorResponse && "transformErrorResponse") ||
          (transformResponse && "transformResponse")
        } in cf.extra() methods!`
      );

    // set method in request options methods
    if (method !== "EXTRA") requestOptionsMethod = method;

    return this._bridge({
      path,
      method,
      options: {
        baseURL,
        cache,
        credentials,
        mode,
        methods,
        method: requestOptionsMethod,
        timeout,
        body,
        headers,
        query,
        transformErrorResponse,
        transformResponse,
        inspect,
      },
    });
  };

  private _genURL = ({ path, baseURL, query }: GenURLParams) => {
    let url_instance;

    if (isValidURL(path)) {
      url_instance = new URL(path);
    } else if (baseURL && isValidURL(baseURL)) {
      url_instance = new URL(baseURL);

      if (
        baseURL.charAt(baseURL.length - 1) === "/" &&
        path.charAt(0) === "/"
      ) {
        url_instance.href = baseURL.slice(0, baseURL.length - 1) + path;
      } else if (
        baseURL.charAt(baseURL.length - 1) !== "/" &&
        path.charAt(0) !== "/"
      ) {
        url_instance.href = baseURL + "/" + path;
      } else {
        url_instance.href = baseURL + path;
      }
    } else {
      throw new CF_ERROR(`Faild to generate URL -> ${path}`);
    }

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url_instance.searchParams.append(key, value);
      });
    }

    return url_instance.href;
  };

  private _inspector = (url: string, options?: IRequestOptions) => {
    if (!options || !options.inspect) return;

    const { callback, name_space, rule } = options?.inspect() || {};

    const inspectObject = {} as InspectObject;

    if (rule?.methods && this.config)
      inspectObject.methods = this.config.methods;
    if (rule?.method) inspectObject.method = options.method;
    if (rule?.timeout) inspectObject.timeout = options.timeout;
    if (rule?.credentials) inspectObject.credentials = options.credentials;
    if (rule?.mode) inspectObject.mode = options.mode;
    if (rule?.cache) inspectObject.cache = options.cache;
    if (rule?.baseURL) inspectObject.baseURL = options.baseURL;
    if (rule?.full_url) inspectObject.full_url = url;
    if (rule?.headers) inspectObject.headers = options.headers;
    if (rule?.body) inspectObject.body = options.body;
    if (rule?.query) inspectObject.query = options.query;

    if (callback) {
      let key = name_space ?? "CuteFetch Inspector";
      callback({
        [key]: inspectObject,
        extract: () => inspectObject,
      });
    }
  };

  private _bridge = <T = CuteFetchResponse>({
    method,
    path,
    options,
  }: InitiatorParams): Promise<T> => {
    const url = this._genURL({
      path,
      baseURL: options?.baseURL,
      query: options?.query,
    });

    this._inspector(url, options);

    switch (method) {
      case "GET":
        return this.reqGET({ url, options }) as Promise<T>;

      case "POST":
        return this.reqPOST({ url, options }) as Promise<T>;

      case "PUT":
        return this.reqPUT({ url, options }) as Promise<T>;

      case "PATCH":
        return this.reqPATCH({ url, options }) as Promise<T>;

      case "DELETE":
        return this.reqDELETE({ url, options }) as Promise<T>;

      case "EXTRA":
      default:
        return this.reqEXTRA({ url, options }) as Promise<T>;
    }
  };
}
