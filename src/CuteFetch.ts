import { RequestConstract } from "@/src/helper";
import {
  CuteFetchResponse,
  IConfig,
  IRequestOptions,
  IRequestOptionsExtra,
} from "@/src/shared";

class CuteFetch extends RequestConstract {
  constructor(protected config?: IConfig) {
    super(config);

    if (this.config) {
      this.config.credentials = config?.credentials ?? "same-origin";
      this.config.cache = config?.cache ?? "default";
      this.config.mode = config?.mode ?? "cors";
    }
  }

  public get = (
    path: string,
    options?: IRequestOptions
  ): Promise<CuteFetchResponse> =>
    this.initiator({
      path,
      method: "GET",
      options,
    });

  public post = (
    path: string,
    options?: IRequestOptions
  ): Promise<CuteFetchResponse> =>
    this.initiator({
      path,
      method: "POST",
      options,
    });

  public put = (
    path: string,
    options?: IRequestOptions
  ): Promise<CuteFetchResponse> =>
    this.initiator({
      path,
      method: "PUT",
      options,
    });

  public patch = (
    path: string,
    options?: IRequestOptions
  ): Promise<CuteFetchResponse> =>
    this.initiator({
      path,
      method: "PATCH",
      options,
    });

  public delete = (
    path: string,
    options?: IRequestOptions
  ): Promise<CuteFetchResponse> =>
    this.initiator({
      path,
      method: "DELETE",
      options,
    });

  public extra = (
    path: string,
    options?: IRequestOptionsExtra
  ): Promise<Response> =>
    this.initiator({
      path,
      method: "EXTRA",
      options,
    });
}

export default CuteFetch;
