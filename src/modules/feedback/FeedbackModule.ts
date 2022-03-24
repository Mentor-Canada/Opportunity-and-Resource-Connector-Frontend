import RouteBuilder from '../../pages/RouteBuilder';
import FeedbackListPage from './list/FeedbackListPage.vue';
import globals from '../../globals';

window.addEventListener('register-module', (e) => {
  let routes = [];
  routes = routes.concat(new RouteBuilder()
    .title('app-notification-requests', true)
    .path('admin/feedback')
    .paginated(true)
    .component(FeedbackListPage)
    .langCodes(globals.app.langCodes)
    .build());
  globals.app.addRoutes(routes);
});
