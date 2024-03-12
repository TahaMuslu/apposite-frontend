import { AxiosRequestConfig } from "axios";

export type AxiosResponse<T = any> = {
    data?: T;
    messages?: string[];
    pagination?: {
        pageNumber: number;
        pageSize: number;
        totalPages: number;
        totalRecords: number;
    }
    status: boolean;
    headers: any;
    config: any;
    request?: any;
  };
  
  export type TRequestHandlerParams<TRequest> = {
    options?: Record<string, string>;
    axiosConfig?: AxiosRequestConfig<TRequest>;
    data: TRequest;
  };
  
  export type RequestHandler<TRequest = null> = (params: TRequestHandlerParams<TRequest>) => Promise<AxiosResponse>;
  
  export interface IRequestModel {
    /**
     *
     * @param {D} data
     * @param {AxiosRequestConfig} config
     * @returns {Promise<AxiosResponse<R>>}
     */ <R, D = void>(data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<R>>;
  }
  