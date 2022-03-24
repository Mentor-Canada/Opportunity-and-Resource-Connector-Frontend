import AccountListPage from './list/AccountListPage.vue';
import AccountDetailPage from './detail/AccountDetailPage';
import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';

window.addEventListener('register-module', (e) => {
  let routes = [];
  routes = routes.concat(new RouteBuilder()
    .title('app-accounts')
    .path('admin/accounts')
    .component(AccountListPage)
    .paginated(true)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-add-account')
    .path('admin/accounts/detail')
    .component(AccountDetailPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-edit-account')
    .path('admin/accounts/detail/:id')
    .component(AccountDetailPage)
    .langCodes(globals.app.langCodes)
    .build());
  globals.app.addRoutes(routes);
});
