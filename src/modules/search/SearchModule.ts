import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';
import SearchPage from './SearchPage';

window.addEventListener('register-module', (e) => {
  let routes = [];
  routes = routes.concat(new RouteBuilder()
    .title('')
    .path('/')
    .component(SearchPage)
    .langCodes(globals.app.langCodes)
    .build());
  globals.app.addRoutes(routes);
});
