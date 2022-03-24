import Vue from 'vue';
import MentorCityComponent from './MentorCityComponent.vue';
import MentorCityListPage from './list/MentorCityListPage.vue';
import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';

class MentorCityModule {
  static init() {
    Vue.component('mentor-city-component', MentorCityComponent);
  }
}

MentorCityModule.init();

window.addEventListener('register-module', (e) => {
  let routes = [];
  routes = routes.concat(new RouteBuilder()
    .title('app-mentorcity')
    .path('admin/mentorcity')
    .paginated(true)
    .component(MentorCityListPage)
    .langCodes(globals.app.langCodes)
    .build());
  globals.app.addRoutes(routes);
});
