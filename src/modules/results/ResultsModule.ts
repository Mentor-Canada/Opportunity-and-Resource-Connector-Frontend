import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';
import ResultsPage from './ResultsPage.vue';

window.addEventListener('register-module', () => {
  let routes = [];
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
  globals.app.addRoutes(routes);
});
