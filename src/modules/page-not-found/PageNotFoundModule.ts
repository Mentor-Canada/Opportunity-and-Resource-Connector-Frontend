import RouteBuilder from '../../pages/RouteBuilder';
import PageNotFoundPage from './PageNotFoundPage';
import globals from '../../globals';

window.addEventListener('register-module', (e) => {
  let routes = [];
  routes = routes.concat(new RouteBuilder()
    .title('app-page-not-found')
    .path('*')
    .component(PageNotFoundPage)
    .langCodes(globals.app.langCodes)
    .build());
  globals.app.addRoutes(routes);
});
