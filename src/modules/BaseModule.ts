import globals from '../globals';
import RouteInterface from '../RouteInterface';

export default abstract class BaseModule {
  abstract getRoutes(): RouteInterface[];

  constructor() {
    window.addEventListener('register-module', () => {
      const routes = this.getRoutes();
      globals.app.addRoutes(routes);
    });
  }
}
