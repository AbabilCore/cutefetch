import { RequestConstract } from "@/helper";
import { CuteFetchResponse, IConfig, IRequestOptions } from "@/shared";

class CuteFetch extends RequestConstract {
  constructor(protected config?: IConfig) {
    super(config);
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

  public extra = (path: string, options?: IRequestOptions): Promise<Response> =>
    this.initiator({
      path,
      method: "EXTRA",
      options,
    });
}

export default CuteFetch;
