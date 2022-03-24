import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';
import SettingsListPage from './list/SettingsListPage';
import SettingsLanguagesPage from './languages/SettingsLanguagesPage';

window.addEventListener('register-module', (e) => {
  let routes = [];
  routes = routes.concat(new RouteBuilder()
    .title('app-settings')
    .path('admin/settings')
    .component(SettingsListPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-languages')
    .path('admin/settings/languages')
    .component(SettingsLanguagesPage)
    .langCodes(globals.app.langCodes)
    .build());
  globals.app.addRoutes(routes);
});
