import RouteBuilder from '../../pages/RouteBuilder';
import SubmittedPage from './submitted/ApplicationSubmittedPage';
import ApplicationListPage from './list/ApplicationListPage.vue';
import InquiryDetail from './detail/InquiryDetail.vue';
import globals from '../../globals';

window.addEventListener('register-module', (e) => {
  let routes = [];
  routes = routes.concat(new RouteBuilder()
    .title('app-application')
    .path('applications/submitted')
    .component(SubmittedPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-inquiries')
    .path('admin/applications')
    .paginated(true)
    .component(ApplicationListPage)
    .langCodes(globals.app.langCodes)
    .build());
  routes = routes.concat(new RouteBuilder()
    .title('app-inquiry-details')
    .path('admin/applications/detail/:id')
    .component(InquiryDetail)
    .langCodes(globals.app.langCodes)
    .build());
  globals.app.addRoutes(routes);
});
