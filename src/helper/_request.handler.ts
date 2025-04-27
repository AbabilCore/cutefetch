import {
  CuteFetchResponse,
  defaultTimeout,
  IRequestOptions,
  NormalizedReqOptions,
  ReqParams,
} from "@/src/shared";
import { CF_ERROR } from "@/module";

export class RequestHandler {
  private _timout = (timeout: number) => {
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

  private _normalized_request_options = (
    options?: IRequestOptions
  ): NormalizedReqOptions => {
    const {
      body,
      cache,
      credentials,
      headers,
      method,
      mode,
      timeout,
      transformErrorResponse,
      transformResponse,
    } = options || {};

    return Object.fromEntries(
      Object.entries({
        body,
        cache,
        credentials,
        headers,
        method,
        mode,
        transformErrorResponse,
        transformResponse,
        signal: this._timout(timeout || defaultTimeout).signal,
      }).filter(([, value]) => value !== undefined)
    );
  };

  private _parse_response = async (response: Response) => {
    const contentType = response.headers.get("Content-Type");

    if (!contentType)
      return `Unable to detect Content-Type. \n Consider using 'cf.extra()' to handle this manually.`;

    if (contentType.startsWith("application/json")) {
      try {
        return await response.json();
      } catch (error: any) {
        return `Failed to parse JSON! The requested source might be sending invalid JSON data.\n${
          error?.message || error
        }`;
      }
    }

    if (contentType.startsWith("text/")) {
      try {
        return await response.text();
      } catch (error: any) {
        return `Failed to parsing TEXT ! Maybe requested sources sending invalid text data\n${
          error?.message || error
        }`;
      }
    }

    if (
      contentType.startsWith("image/") ||
      contentType.startsWith("audio/") ||
      contentType.startsWith("video/") ||
      contentType === "application/pdf" ||
      contentType === "application/octet-stream"
    ) {
      return await response.blob();
    }

    throw new CF_ERROR(
      `Unknown Content-Type: ${contentType}. Unable to parse response.\nConsider using 'cf.extra()' to handle ${contentType}.`
    );
  };

  private _cute_fetch_response = async (
    res: Response,
    options: IRequestOptions
  ): Promise<CuteFetchResponse> => {
    let result = await this._parse_response(res);

    if (options.transformResponse && res.ok) {
      result = options.transformResponse(result);
    }

    if (options.transformErrorResponse && !res.ok) {
      result = options.transformErrorResponse(result);
    }

    return {
      status: res.status,
      statusText: res.statusText,
      data: res.ok ? result : null,
      error: !res.ok ? result : null,
    };
  };

  //.................................
  // Handle All Request
  //..................................
  protected reqGET = async ({ url, options }: ReqParams) => {
    options = this._normalized_request_options(options);
    const resonse = await fetch(url, options);
    return await this._cute_fetch_response(resonse, options);
  };

  protected reqPOST = async ({ url, options }: ReqParams) => {
    options = this._normalized_request_options(options);
    const resonse = await fetch(url, options);
    return await this._cute_fetch_response(resonse, options);
  };

  protected reqPUT = async ({ url, options }: ReqParams) => {
    options = this._normalized_request_options(options);
    const resonse = await fetch(url, options);
    return await this._cute_fetch_response(resonse, options);
  };

  protected reqPATCH = async ({ url, options }: ReqParams) => {
    options = this._normalized_request_options(options);
    const resonse = await fetch(url, options);
    return await this._cute_fetch_response(resonse, options);
  };

  protected reqDELETE = async ({ url, options }: ReqParams) => {
    options = this._normalized_request_options(options);
    const resonse = await fetch(url, options);
    return await this._cute_fetch_response(resonse, options);
  };

  protected reqEXTRA = async ({ url, options }: ReqParams) => {
    options = this._normalized_request_options(options);
    return await fetch(url, options);
  };
}
