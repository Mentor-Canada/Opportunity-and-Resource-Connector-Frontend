import App from "../App";
import globals from "../globals";

declare const app: App;

export default class Manager {
  private static instance: Manager;

  public results: any;

  public searchUrl: string;

  public searchRole: string;

  public app: App;

  private constructor() {
    this.app = globals.app;
  }

  public static getInstance(): Manager {
    if (!Manager.instance) {
      Manager.instance = new Manager();
    }
    return Manager.instance;
  }
}
