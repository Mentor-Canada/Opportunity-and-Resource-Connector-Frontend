import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';
import ResultsPage from './ResultsPage.vue';

declare const FLAG_NEW_RESULTS: boolean;

window.addEventListener('register-module', () => {
  let routes = [];
  if (FLAG_NEW_RESULTS) {
    routes = routes.concat(new RouteBuilder()
      .title('app-search-results')
      .path('become-a-mentor/programs/:location')
      .component(ResultsPage)
      .langCodes(globals.app.langCodes)
      .build());
    routes = routes.concat(new RouteBuilder()
      .title('app-search-results')
      .path('find-a-mentor/programs/:location')
      .component(ResultsPage)
      .langCodes(globals.app.langCodes)
      .build());
  } else {
    routes = routes.concat(new RouteBuilder()
      .title('app-search-results')
      .path('search/:id')
      .component(ResultsPage)
      .langCodes(globals.app.langCodes)
      .build());
  }
  globals.app.addRoutes(routes);
});
