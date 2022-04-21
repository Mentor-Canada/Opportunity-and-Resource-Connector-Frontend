import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';
import SearchPage from './SearchPage';

window.addEventListener('register-module', (e) => {
  let routes = [];
  const title = !FLAG_SPLIT_SEARCH ? '' : 'Search';
  const path = !FLAG_SPLIT_SEARCH ? '/' : 'search';
  routes = routes.concat(new RouteBuilder()
    .title(title)
    .path(path)
    .component(SearchPage)
    .langCodes(globals.app.langCodes)
    .build());
  globals.app.addRoutes(routes);
});
