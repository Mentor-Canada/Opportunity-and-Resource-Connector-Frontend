import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as Sentry from '@sentry/vue';
import WindowInterface from 'Interfaces/WindowInterface';
import axios from 'axios';
import Vuetable from 'vuetable-2/src/components/Vuetable.vue';
import Vue from '../node_modules/vue/dist/vue';
import VueI18n from 'vue-i18n';
import messagesEn from './locale/en.yml';
import messagesFr from './locale/fr.yml';

import VueRouter from '../node_modules/vue-router/dist/vue-router';
import {
  MdField,
  MdTabs,
  MdButton,
  MdCheckbox,
  MdEmptyState,
  MdAutocomplete,
  MdList,
  MdRadio,
  MdMenu,
  MdTable,
  MdContent,
  MdSwitch,
} from './contrib/vue-material/dist/components';

import MdChips from './contrib/vue-material/src/components/MdChips/MdChips.vue';

import MdChip from './contrib/vue-material/src/components/MdChips/MdChip.vue';

import MdFile from './contrib/vue-material/src/components/MdField/MdFile/MdFile.vue';

import MdDatepicker from './contrib/vue-material/src/components/MdDatepicker/MdDatepicker.vue';

import MdDialogActions from './contrib/vue-material/src/components/MdDialog/MdDialogActions.vue';

import MdDialogContent from './contrib/vue-material/src/components/MdDialog/MdDialogContent.vue';

import MdDialogTitle from './contrib/vue-material/src/components/MdDialog/MdDialogTitle.vue';

import MdDialog from './contrib/vue-material/src/components/MdDialog/MdDialog.vue';

import MdSnackbar from './contrib/vue-material/src/components/MdSnackbar/MdSnackbar.vue';

import LogoUploader from './components/LogoUploader.vue';

import appTemplate from './app.html';

import App from './App';
import routes from './Routes';
import './modules/Modules';

import BaseMixin from './mixins/BaseMixin';

import AccountDetailRow from './modules/account/list/AccountDetailRow.vue';

import AppInput from './components/AppInput.vue';

import AppTextarea from './components/AppTextarea.vue';

import AppSelect from './components/AppSelect.vue';

import AppRadios from './components/AppRadios.vue';

import Checkboxes from './components/Checkboxes.vue';

import UserReference from './components/UserReference.vue';

import AddUser from './components/AddUser.vue';

import RoleReference from './components/RoleReference.vue';

import PlacePicker from './components/PlacePicker.vue';

import MultiPlacePicker from './components/MultiPlacePicker.vue';

import RegionPlacePicker from './components/RegionPlacePicker.vue';

import MultiRegionPicker from './components/MultiRegionPicker.vue';

import OrganizationReference from './components/OrganizationReference.vue';

import PartnerReference from './components/PartnerReference.vue';

import TableActions from './components/Table/TableActions.vue';

import CountryReference from './components/CountryReference.vue';

import TableComponent from './components/Table/Table';

import AppModal from './components/AppModal.vue';

import Breadcrumbs from './components/Breadcrumbs.vue';
import AdminMenu from './AdminMenu';
import Feedback from './components/Feedback.vue';

import Checkbox from './components/Checkbox.vue';

import AxiosDecorator from './AxiosDecorator';
import PathAdapter from "./utils/PathAdapter";

Vue.config.errorHandler = (err, vm, info) => {
  if (err == 'Not Implemented') {
    window.app.view.snackBarText = err;
    window.app.view.showSnackbar = true;
    return;
  }
  if (err.request?.status == 403) {
    window.app.hideLoading();
    window.app.view.snackBarText = window.app.t('app-access-denied');
    window.app.view.showSnackbar = true;
  }
  if (err.isAxiosError) {
    window.app.hideLoading();
    window.app.view.snackBarText = window.app.t('app-network-error');
    window.app.view.showSnackbar = true;
  }
  throw err;
};

Vue.config.warnHandler = function (msg, vm, trace) {
};
Vue.component('md-chips', MdChips);
Vue.component('md-chip', MdChip);
Vue.component('md-file', MdFile);
Vue.component('md-datepicker', MdDatepicker);
Vue.component('md-dialog-actions', MdDialogActions);
Vue.component('md-dialog-content', MdDialogContent);
Vue.component('md-dialog-title', MdDialogTitle);
Vue.component('md-dialog', MdDialog);
Vue.component('md-snackbar', MdSnackbar);
Vue.component('logo-uploader', LogoUploader);

declare const window: WindowInterface;

Vue.use(VueRouter);
Vue.use(MdField);
Vue.use(MdTabs);
Vue.use(MdButton);
Vue.use(MdChips);
Vue.use(MdSnackbar);
Vue.use(MdDialog);
Vue.use(MdCheckbox);
Vue.use(MdEmptyState);
Vue.use(MdAutocomplete);
Vue.use(MdList);
Vue.use(MdRadio);
Vue.use(MdDatepicker);
Vue.use(MdMenu);
Vue.use(MdTable);
Vue.use(MdContent);
Vue.use(MdSwitch);

const htmlEl = document.querySelector('html');
htmlEl.classList.remove('md-theme-default');
Vue.component('vuetable', Vuetable);
Vue.component('account-detail-row', AccountDetailRow);
Vue.component('app-input', AppInput);
Vue.component('app-textarea', AppTextarea);
Vue.component('app-select', AppSelect);
Vue.component('app-radios', AppRadios);
Vue.component('checkboxes', Checkboxes);
Vue.component('user-reference', UserReference);
Vue.component('add-user', AddUser);
Vue.component('role-reference', RoleReference);
Vue.component('place-picker', PlacePicker);
Vue.component('multi-place-picker', MultiPlacePicker);
Vue.component('region-place-picker', RegionPlacePicker);
Vue.component('multi-region-picker', MultiRegionPicker);
Vue.component('organization-reference', OrganizationReference);
Vue.component('partner-reference', PartnerReference);
Vue.component('table-actions', TableActions);
Vue.component('country-reference', CountryReference);
Vue.component('table-component', TableComponent);
Vue.component('app-modal', AppModal);
Vue.component('breadcrumbs', Breadcrumbs);
Vue.component('app-checkbox', Checkbox);

const messages = {
  en: messagesEn,
  fr: messagesFr,
};

const components = window.location.pathname.split('/');
const locale = components[1] === 'fr' ? 'fr' : 'en';

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: locale,
  messages,
});

window.api = new AxiosDecorator();
const version = window.app.version
window.app = new App();
window.app.version = version;
window.app.setColorContrast();
window.app.load()
  .then(() => {
    window.app.routes = routes();
    window.dispatchEvent(new CustomEvent('register-module'));

    window.router = new VueRouter({
      mode: 'history',
      routes: window.app.routes,
      scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition;
        }
        return { x: 0, y: 0 };
      },
    });

    window.router.beforeEach((to, from, next) => {
      document.querySelector('body').classList.remove('page-search');
      document.querySelector('body').setAttribute('data-path', PathAdapter.kebabCase(to.fullPath));
      if (window.app.view) window.app.view.adminMenuOpen = false;
      const nearestWithTitle = to.matched.slice().reverse().find((r) => r.meta && r.meta.title);
      if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title;
      } else {
        document.title = window.app.t('app-mentor-connector');
      }

      const open = ['page-not-found', 'front', 'sign-in', 'programs'];
      if (window.app.view) {
        if (to.fullPath.match(/\/.*\/admin($|\/.*)/)) {
          window.app.view.adminSection = window.app.getAdminSection(to.fullPath);
        }
      }

      if (to.fullPath.match(/\/.*\/admin($|\/.*)/)) {
        (window as any).addEventListener('resize', window.app.adminResize);
      } else {
        (window as any).removeEventListener('resize', window.app.adminResize);
      }

      if (to.fullPath.match(/\/.*\/admin($|\/.*)/)) {
        if (!window.app.user.id) {
          next({ path: `/${window.app.language.langcode}/sign-in`, query: { dest: to.fullPath } });
          return;
        }
        next();
      } else {
        next();
      }
    });

    window.app.view = new Vue({
      i18n,
      mixins: [BaseMixin],
      router: window.router,
      template: appTemplate,

      components: {
        feedback: Feedback,
      },

      data() {
        return {
          user: window.app.user,
          signedIn: !!window.app.user.id,
          adminSection: window.app.getAdminSection(),
          adminMenuCompact: false,
          adminMenuOpen: false,
          showSnackbar: false,
          snackBarText: '',
          menu: new AdminMenu(),
          organizationUrl: window.app.bootstrap.country == 'us'
            ? 'https://www.mentoring.org/'
            : `https://mentoringcanada.ca/${window.app.language.langcode}`,
        };
      },

      methods: {
        onTransitionBeforeEnter() {
          document.querySelector('body').classList.add('transition');
        },
        onTransitionAfterEnter() {
          document.querySelector('body').classList.remove('transition');
        },
        async onLogout() {
          await this.app.user.signOut();
          window.location.href = this.countryCode == 'us' ? 'https://www.mentoring.org/what-we-do/mentoring-connector/'
            : '/';
        },
        openFeedback() {
          this.$refs.feedback.openFeedback();
        },
      },

    });

    window.app.view.$mount('#app');
  });
