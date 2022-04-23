import VueRouter from 'vue-router';
import Manager from './Manager';
import routes from './Routes';

export default class RouterFactory {
  public static create(): VueRouter {
    Manager.getInstance().app.routes = routes();
    window.dispatchEvent(new CustomEvent('register-module'));

    let list = Manager.getInstance().app.routes;
    RouterFactory.moveCatchAllRoutesToEnd(list);

    return new VueRouter({
      mode: 'history',
      routes: list,
      scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition;
        }
        return { x: 0, y: 0 };
      },
    });
  }

  private static moveCatchAllRoutesToEnd(list: any[]) {
    const pageNotFoundRegExp = RouterFactory.catchAllPathRegExp();
    list.sort((a, b) => {
      if (pageNotFoundRegExp.exec(a.path)) {
        return 1;
      }
      if (pageNotFoundRegExp.exec(b.path)) {
        return -1;
      }
      return 0;
    });
  }

  private static catchAllPathRegExp(): RegExp {
    const langPattern = Manager.getInstance().app.langCodes.join('|');
    return new RegExp(`(?:${langPattern})\\\/\\*`);
  }
}
