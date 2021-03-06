import { AxiosInstance } from 'axios';
import { VueRouter } from 'vue-router/types/router';
import App from '../App';
import AxiosDecorator from '../AxiosDecorator';

export default interface WindowInterface {
  app: App
  api: AxiosDecorator
  router: VueRouter
  google: any
}
