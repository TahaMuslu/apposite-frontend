import HttpService from "./httpService";
import { IRequestModel } from "./types";

export const loginService: IRequestModel = (data) =>
  HttpService.post("Auth/login", data);
