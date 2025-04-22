/**
 * @packageName     cutefetch
 * @version         1.0.2
 * @author          Md Ababil Hossain (https://devababil.com)
 * @license         MIT
 * @description     A sleek and minimalistic HTTP client for modern web and Node.js applications, designed with simplicity and elegance in mind.
 * @website         https://www.npmjs.com/package/cutefetch
 * @repository      https://github.com/DevAbabil/cutefetch
 * @created         2024-02-29
 * @lastModified    2025-04-22
 * ------------------------------------------------------------
 */
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/shared/_utils.ts
var isValidURL = (url) => {
  try {
    return new URL(url);
  } catch (error) {
    return false;
  }
};

// src/shared/_AppError.ts
var CF_ERROR = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CuteFetch";
    this.message = message;
  }
};

// src/shared/constants/index.ts
var credentialsProps = [
  "include",
  "same-origin",
  "omit"
];
var modeProps = [
  "cors",
  "no-cors",
  "same-origin",
  "navigate"
];
var cacheProps = [
  "default",
  "no-cache",
  "reload",
  "force-cache",
  "only-if-cached",
  "no-store"
];
var bodyLessMethodProps = [
  "GET",
  "HEAD",
  "OPTIONS",
  "DELETE"
];
var defaultTimeout = 5e3;

// src/helper/_request.handler.ts
var RequestHandler = class {
  constructor() {
    this.c = (timeout) => {
      const aborter = new AbortController();
      const timerId = setTimeout(() => {
        aborter.abort(
          new CF_ERROR(
            `Timout Failed! '${timeout} ms' consider using larger timeout value`
          )
        );
        clearTimeout(timerId);
      }, timeout);
      return aborter;
    };
    this.a = (options) => {
      const { body, cache, credentials, headers, method, mode, timeout } = options || {};
      return Object.fromEntries(
        Object.entries({
          body,
          cache,
          credentials,
          headers,
          method,
          mode,
          signal: this.c(timeout || defaultTimeout).signal
        }).filter(([, value]) => value !== void 0)
      );
    };
    this.d = (response) => __async(this, null, function* () {
      const contentType = response.headers.get("Content-Type");
      if (!contentType)
        return `Unable to detect Content-Type. 
 Consider using 'cf.extra()' to handle this manually.`;
      if (contentType.startsWith("application/json")) {
        try {
          return yield response.json();
        } catch (error) {
          return `Failed to parse JSON! The requested source might be sending invalid JSON data.
${(error == null ? void 0 : error.message) || error}`;
        }
      }
      if (contentType.startsWith("text/")) {
        try {
          return yield response.text();
        } catch (error) {
          return `Failed to parsing TEXT ! Maybe requested sources sending invalid text data
${(error == null ? void 0 : error.message) || error}`;
        }
      }
      if (contentType.startsWith("image/") || contentType.startsWith("audio/") || contentType.startsWith("video/") || contentType === "application/pdf" || contentType === "application/octet-stream") {
        return yield response.blob();
      }
      throw new CF_ERROR(
        `Unknown Content-Type: ${contentType}. Unable to parse response.
Consider using 'cf.extra()' to handle ${contentType}.`
      );
    });
    this.b = (res) => __async(this, null, function* () {
      const result = yield this.d(res);
      return {
        status: res.status,
        statusText: res.statusText,
        data: res.ok ? result : null,
        error: !res.ok ? result : null
      };
    });
    //.................................
    // Handle All Request
    //..................................
    this.reqGET = (_0) => __async(this, [_0], function* ({ url, options }) {
      options = this.a(options);
      const resonse = yield fetch(url, options);
      return yield this.b(resonse);
    });
    this.reqPOST = (_0) => __async(this, [_0], function* ({ url, options }) {
      options = this.a(options);
      const resonse = yield fetch(url, options);
      return yield this.b(resonse);
    });
    this.reqPUT = (_0) => __async(this, [_0], function* ({ url, options }) {
      options = this.a(options);
      const resonse = yield fetch(url, options);
      return yield this.b(resonse);
    });
    this.reqPATCH = (_0) => __async(this, [_0], function* ({ url, options }) {
      options = this.a(options);
      const resonse = yield fetch(url, options);
      return yield this.b(resonse);
    });
    this.reqDELETE = (_0) => __async(this, [_0], function* ({ url, options }) {
      options = this.a(options);
      const resonse = yield fetch(url, options);
      return yield this.b(resonse);
    });
    this.reqEXTRA = (_0) => __async(this, [_0], function* ({ url, options }) {
      options = this.a(options);
      return yield fetch(url, options);
    });
  }
};

// src/helper/_request.constract.ts
var RequestConstract = class extends RequestHandler {
  constructor(config) {
    super();
    this.config = config;
    this.initiator = ({
      path,
      method,
      options
    }) => {
      var _a;
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
        query
      } = __spreadProps(__spreadValues(__spreadValues({}, this.config), options), {
        headers: __spreadValues(__spreadValues({}, (_a = this.config) == null ? void 0 : _a.headers), options == null ? void 0 : options.headers)
      });
      if (baseURL && !isValidURL(baseURL))
        throw new CF_ERROR(`invalid 'baseURL' for CuteFetch!
-> ${baseURL}
`);
      if (!path) throw new CF_ERROR(`Path should be empty!`);
      if (((path == null ? void 0 : path.startsWith("http")) || (path == null ? void 0 : path.startsWith("https"))) && !isValidURL(path))
        throw new CF_ERROR(
          `invalid url for cf.${method.toLowerCase()}(${path}) method.`
        );
      if ((path == null ? void 0 : path.startsWith("http")) || (path == null ? void 0 : path.startsWith("https"))) {
        baseURL = path;
      }
      if (method !== "EXTRA" && !(methods == null ? void 0 : methods.includes(method)))
        throw new CF_ERROR(`Please enable '${method}' in CuteFetch Config.`);
      if (method === "EXTRA" && requestOptionsMethod && !(methods == null ? void 0 : methods.includes(requestOptionsMethod)))
        throw new CF_ERROR(
          `Please enable '${requestOptionsMethod}' in CuteFetch Config.`
        );
      if (method === "EXTRA" && !(options == null ? void 0 : options.method))
        throw new CF_ERROR(
          `Please add request method for request options in cf.extra() methods`
        );
      if (method !== "EXTRA" && method !== (options == null ? void 0 : options.method))
        throw new CF_ERROR(
          `You can not override '${method}' to '${options == null ? void 0 : options.method}' method for cf.${method.toLowerCase()}() methods`
        );
      if (cache && !cacheProps.includes(cache))
        throw new CF_ERROR(`Invalid cache value '${cache}' for http request!`);
      if (credentials && !credentialsProps.includes(credentials))
        throw new CF_ERROR(
          `Invalid credentials value '${credentials}' for http request!`
        );
      if (mode && !modeProps.includes(mode))
        throw new CF_ERROR(`Invalid mode value '${mode}' for http request!`);
      if (body && (requestOptionsMethod || method) && bodyLessMethodProps.includes(requestOptionsMethod || method))
        throw new CF_ERROR(
          `http request '${requestOptionsMethod || method}' does not allow 'body' property in request options`
        );
      if (timeout && (isNaN(timeout) || timeout < 0))
        throw new CF_ERROR(`timeout must be a valid positive number `);
      if (method !== "EXTRA") requestOptionsMethod = method;
      return this.e({
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
          query
        }
      });
    };
    this.f = ({ path, baseURL, query }) => {
      let url_instance;
      if (isValidURL(path)) {
        url_instance = new URL(path);
      } else if (baseURL && isValidURL(baseURL)) {
        url_instance = new URL(baseURL);
        url_instance.pathname = path;
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
    this.e = ({
      method,
      path,
      options
    }) => {
      const url = this.f({
        path,
        baseURL: options == null ? void 0 : options.baseURL,
        query: options == null ? void 0 : options.query
      });
      switch (method) {
        case "GET":
          return this.reqGET({ url, options });
        case "POST":
          return this.reqPOST({ url, options });
        case "PUT":
          return this.reqPUT({ url, options });
        case "PATCH":
          return this.reqPATCH({ url, options });
        case "DELETE":
          return this.reqDELETE({ url, options });
        case "EXTRA":
        default:
          return this.reqEXTRA({ url, options });
      }
    };
  }
};

// src/CuteFetch.ts
var CuteFetch = class extends RequestConstract {
  constructor(config) {
    super(config);
    this.config = config;
    this.get = (path, options) => this.initiator({
      path,
      method: "GET",
      options
    });
    this.post = (path, options) => this.initiator({
      path,
      method: "POST",
      options
    });
    this.put = (path, options) => this.initiator({
      path,
      method: "PUT",
      options
    });
    this.patch = (path, options) => this.initiator({
      path,
      method: "PATCH",
      options
    });
    this.delete = (path, options) => this.initiator({
      path,
      method: "DELETE",
      options
    });
    this.extra = (path, options) => this.initiator({
      path,
      method: "EXTRA",
      options
    });
  }
};
var CuteFetch_default = CuteFetch;
export {
  CuteFetch_default as default
};
