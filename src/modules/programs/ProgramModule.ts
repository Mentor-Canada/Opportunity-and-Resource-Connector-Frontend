import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';
import ProgramListPage from './list/ProgramListPage.vue';
import ProgramApplyPage from './apply/ProgramApplyPage.vue';
import ProgramApprovalPage from './approval/ProgramApprovalPage.vue';
import ProgramDetailPage from './detail/ProgramDetailPage';
import ProgramSubmittedPage from './submitted/ProgramSubmittedPage';
import ProgramAdministratorsPage from './administrators/ProgramAdministratorsPage';
import ProgramSettingsPage from './settings/ProgramSettingsPage';

window.addEventListener('register-module', (e) => {
  let routes = [];
  routes = routes.concat(new RouteBuilder()
    .title('app-programs')
    .path('admin/programs')
    .paginated(true)
    .component(ProgramListPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-program-apply')
    .path('search/:searchId/apply/:programId')
    .component(ProgramApplyPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-program-apply')
    .path('program/:programId')
    .component(ProgramApplyPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-program-approval')
    .path('admin/programs/approval/:id')
    .component(ProgramApprovalPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-submit-program')
    .path('programs/add')
    .component(ProgramDetailPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-submit-program')
    .path('programs/add/organization')
    .component(ProgramDetailPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-submit-program')
    .path('programs/add/step/:step')
    .component(ProgramDetailPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-add-program')
    .path('admin/programs/detail')
    .component(ProgramDetailPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-edit-program')
    .path('admin/programs/detail/:id')
    .component(ProgramDetailPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-program-submitted')
    .path('programs/submitted')
    .component(ProgramSubmittedPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-program-administrators')
    .path('admin/programs/administrators/:id')
    .component(ProgramAdministratorsPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-program-settings')
    .path('admin/programs/settings/:id')
    .component(ProgramSettingsPage)
    .langCodes(globals.app.langCodes)
    .build());
  globals.app.addRoutes(routes);
});
