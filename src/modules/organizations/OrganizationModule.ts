import RouteBuilder from '../../pages/RouteBuilder';
import OrganizationListPage from './list/OrganizationListPage.vue';
import OrganizationDetailPage from './detail/OrganizationDetailPage';
import globals from '../../globals';
import OrganizationSubmittedPage from './submitted/OrganizationSubmittedPage';
import OrganizationIntegrationsPage from './integrations/OrganizationIntegrationsPage';
import OrganizationApprovalPage from './approval/OrganizationApprovalPage';
import OrganizationAdministratorsPage from './administrators/OrganizationAdministratorsPage';

window.addEventListener('register-module', (e) => {
  let routes = [];
  routes = routes.concat(new RouteBuilder()
    .title('app-organization-administrators')
    .path('admin/organizations/administrators/:id')
    .component(OrganizationAdministratorsPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-organization-settings')
    .path('admin/organizations/approval/:id')
    .component(OrganizationApprovalPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-submit-organization')
    .path('organizations/add')
    .component(OrganizationDetailPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-add-organization')
    .path('admin/organizations/detail')
    .component(OrganizationDetailPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-edit-organization')
    .path('admin/organizations/detail/:id')
    .component(OrganizationDetailPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-organizations')
    .path('admin/organizations')
    .paginated(true)
    .component(OrganizationListPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-organization-submitted')
    .path('organizations/submitted/:id')
    .component(OrganizationSubmittedPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-organization-integrations')
    .path('admin/organizations/integrations/:id')
    .component(OrganizationIntegrationsPage)
    .langCodes(globals.app.langCodes)
    .build());
  globals.app.addRoutes(routes);
});
