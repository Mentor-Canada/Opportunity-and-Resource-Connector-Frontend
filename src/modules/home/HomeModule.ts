import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';
import HomePage from './HomePage';

window.addEventListener('register-module', (e) => {
  let routes = [];
  routes = routes.concat(new RouteBuilder()
    .title('')
    .meta('newTypography', true)
    .path('/')
    .component(HomePage)
    .langCodes(globals.app.langCodes)
    .build());
  globals.app.addRoutes(routes);
});
