import App from "../App";
import {AxiosInstance} from "axios";
import WindowInterface from "../WindowInterface";
declare const window: WindowInterface

export default class Model {

  protected readonly api: AxiosInstance

  constructor() {
    this.api = window.api;
  }

  // get app(): App {
  //   return window.app
  // }
  //
  // get api(): AxiosInstance {
  //   return window.app.api
  // }

}
