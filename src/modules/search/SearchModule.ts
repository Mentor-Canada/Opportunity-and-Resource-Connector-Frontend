import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';
import SearchPage from './SearchPage';

declare const FLAG_SPLIT_SEARCH: boolean;
declare const FLAG_NEW_RESULTS: boolean;

window.addEventListener('register-module', (e) => {
  let routes = [];
  if (FLAG_NEW_RESULTS) {
    routes = routes.concat(new RouteBuilder()
      .title('become-a-mentor')
      .path('become-a-mentor')
      .component(SearchPage)
      .langCodes(globals.app.langCodes)
      .build());
    routes = routes.concat(new RouteBuilder()
      .title('get-a-mentor')
      .path('get-a-mentor')
      .component(SearchPage)
      .langCodes(globals.app.langCodes)
      .build());
    globals.app.addRoutes(routes);
  } else if (FLAG_SPLIT_SEARCH) {
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
