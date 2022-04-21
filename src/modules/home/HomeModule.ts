import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';
import HomePage from './HomePage';

if(FLAG_SPLIT_SEARCH) {
  window.addEventListener('register-module', (e) => {
    let routes = [];
    routes = routes.concat(new RouteBuilder()
      .title('')
      .path('/')
      .component(HomePage)
      .langCodes(globals.app.langCodes)
      .build());
    globals.app.addRoutes(routes);
  });
}
