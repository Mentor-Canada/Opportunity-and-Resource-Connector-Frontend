import { AxiosInstance } from 'axios';
import App from '../App';
import WindowInterface from '../WindowInterface';

declare const window: WindowInterface;

export default class Model {
  protected readonly api: AxiosInstance;

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
