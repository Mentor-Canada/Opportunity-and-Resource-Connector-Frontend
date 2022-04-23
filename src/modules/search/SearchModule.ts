import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';
import SearchPage from './SearchPage';

declare const FLAG_SPLIT_SEARCH: boolean;
declare const FLAG_NEW_RESULTS: boolean;

window.addEventListener('register-module', (e) => {
  let routes = [];
  if (FLAG_SPLIT_SEARCH) {
    routes = routes.concat(new RouteBuilder()
      .title('search')
      .path('search')
      .component(SearchPage)
      .langCodes(globals.app.langCodes)
      .build());
    globals.app.addRoutes(routes);
  } else {
    routes = routes.concat(new RouteBuilder()
      .title('')
      .path('/')
      .component(SearchPage)
      .langCodes(globals.app.langCodes)
      .build());
    globals.app.addRoutes(routes);
  }
});
