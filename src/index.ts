import "core-js/stable"
import "regenerator-runtime/runtime"

import Vue from "../node_modules/vue/dist/vue"
import * as Sentry from "@sentry/vue"

Vue.config.errorHandler = (err, vm, info) => {
  if(err == 'Not Implemented') {
    window.app.view.snackBarText = err
    window.app.view.showSnackbar = true
    return
  }
  if(err.request?.status == 403) {
    window.app.hideLoading()
    window.app.view.snackBarText = window.app.t("app-access-denied")
    window.app.view.showSnackbar = true
  }
  if(err.isAxiosError) {
    window.app.hideLoading()
    window.app.view.snackBarText = window.app.t("app-network-error")
    window.app.view.showSnackbar = true
  }
  throw err
}

Vue.config.warnHandler = function(msg, vm, trace) {
}

import VueRouter from "../node_modules/vue-router/dist/vue-router"
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
  MdSwitch
} from './contrib/vue-material/dist/components'

import MdChips from './contrib/vue-material/src/components/MdChips/MdChips.vue'
Vue.component('md-chips', MdChips)

import MdChip from './contrib/vue-material/src/components/MdChips/MdChip.vue'
Vue.component('md-chip', MdChip)

import MdFile from './contrib/vue-material/src/components/MdField/MdFile/MdFile.vue'
Vue.component('md-file', MdFile)

import MdDatepicker from './contrib/vue-material/src/components/MdDatepicker/MdDatepicker.vue'
Vue.component('md-datepicker', MdDatepicker)

import MdDialogActions from './contrib/vue-material/src/components/MdDialog/MdDialogActions.vue'
Vue.component('md-dialog-actions', MdDialogActions)

import MdDialogContent from './contrib/vue-material/src/components/MdDialog/MdDialogContent.vue'
Vue.component('md-dialog-content', MdDialogContent)

import MdDialogTitle from './contrib/vue-material/src/components/MdDialog/MdDialogTitle.vue'
Vue.component('md-dialog-title', MdDialogTitle)

import MdDialog from './contrib/vue-material/src/components/MdDialog/MdDialog.vue'
Vue.component('md-dialog', MdDialog)

import MdSnackbar from './contrib/vue-material/src/components/MdSnackbar/MdSnackbar.vue'
Vue.component('md-snackbar', MdSnackbar)

import LogoUploader from "./components/LogoUploader.vue"
Vue.component('logo-uploader', LogoUploader)

import appTemplate from "./app.html"

import App from "./App"
import WindowInterface from "Interfaces/WindowInterface"
import axios from "axios"
import routes from "./Routes"
import "./modules/Modules"

import BaseMixin from "./mixins/BaseMixin"

declare const window: WindowInterface

Vue.use(VueRouter)
Vue.use(MdField)
Vue.use(MdTabs)
Vue.use(MdButton)
Vue.use(MdChips)
Vue.use(MdSnackbar)
Vue.use(MdDialog)
Vue.use(MdCheckbox)
Vue.use(MdEmptyState)
Vue.use(MdAutocomplete)
Vue.use(MdList)
Vue.use(MdRadio)
Vue.use(MdDatepicker)
Vue.use(MdMenu)
Vue.use(MdTable)
Vue.use(MdContent)
Vue.use(MdSwitch)

let htmlEl = document.querySelector("html")
htmlEl.classList.remove('md-theme-default')

import Vuetable from 'vuetable-2/src/components/Vuetable.vue'
Vue.component('vuetable', Vuetable)

import AccountDetailRow from "./modules/account/list/AccountDetailRow.vue"
Vue.component("account-detail-row", AccountDetailRow)

import AppInput from "./components/AppInput.vue"
Vue.component('app-input', AppInput)

import AppTextarea from "./components/AppTextarea.vue"
Vue.component('app-textarea', AppTextarea)

import AppSelect from "./components/AppSelect.vue"
Vue.component('app-select', AppSelect)

import AppRadios from "./components/AppRadios.vue"
Vue.component('app-radios', AppRadios)

import Checkboxes from "./components/Checkboxes.vue"
Vue.component('checkboxes', Checkboxes)

import UserReference from "./components/UserReference.vue"
Vue.component('user-reference', UserReference)

import AddUser from "./components/AddUser.vue"
Vue.component('add-user', AddUser)

import RoleReference from "./components/RoleReference.vue"
Vue.component('role-reference', RoleReference)

import PlacePicker from "./components/PlacePicker.vue"
Vue.component('place-picker', PlacePicker)

import MultiPlacePicker from "./components/MultiPlacePicker.vue"
Vue.component('multi-place-picker', MultiPlacePicker)

import RegionPlacePicker from "./components/RegionPlacePicker.vue"
Vue.component('region-place-picker', RegionPlacePicker)

import MultiRegionPicker from "./components/MultiRegionPicker.vue"
Vue.component('multi-region-picker', MultiRegionPicker)

import OrganizationReference from "./components/OrganizationReference.vue"
Vue.component('organization-reference', OrganizationReference)

import PartnerReference from "./components/PartnerReference.vue"
Vue.component('partner-reference', PartnerReference)

import TableActions from "./components/Table/TableActions.vue"
Vue.component('table-actions', TableActions)

import CountryReference from "./components/CountryReference.vue"
Vue.component('country-reference', CountryReference)

import TableComponent from "./components/Table/Table"
Vue.component('table-component', TableComponent)

import AppModal from "./components/AppModal.vue"
Vue.component('app-modal', AppModal)

import Breadcrumbs from "./components/Breadcrumbs.vue"
import AdminMenu from "./AdminMenu"
import Feedback from "./components/Feedback.vue"
Vue.component('breadcrumbs', Breadcrumbs)

import Checkbox from "./components/Checkbox.vue"
Vue.component('app-checkbox', Checkbox)

import AxiosDecorator from "./AxiosDecorator"

window.api = new AxiosDecorator()
window.app = new App()
window.app.setColorContrast()
window.app.load()
    .then(() => {

      window.app.routes = routes()
      window.dispatchEvent(new CustomEvent('register-module'))

      window.router = new VueRouter({
        mode: 'history',
        routes: window.app.routes,
        scrollBehavior(to, from, savedPosition) {
          if (savedPosition) {
            return savedPosition
          } else {
            return { x: 0, y: 0 }
          }
        }
      })

      window.router.beforeEach((to, from, next) => {
        document.querySelector("body").classList.remove("page-search")
        if(window.app.view) window.app.view.adminMenuOpen = false
        const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
        if(nearestWithTitle) {
          document.title = nearestWithTitle.meta.title
        }
        else {
          document.title = window.app.t("app-mentor-connector")
        }

        const open = ['page-not-found', 'front', 'sign-in', 'programs']
        if(window.app.view) {
          if(to.fullPath.match(/\/.*\/admin($|\/.*)/)) {
            window.app.view.adminSection = window.app.getAdminSection(to.fullPath)
          }
        }

        if(to.fullPath.match(/\/.*\/admin($|\/.*)/)) {
          (window as any).addEventListener('resize', window.app.adminResize)
        }
        else {
          (window as any).removeEventListener('resize', window.app.adminResize)
        }

        if(to.fullPath.match(/\/.*\/admin($|\/.*)/)) {
          if(!window.app.user.id) {
            next({path: `/${window.app.language.langcode}/sign-in`, query: { dest: to.fullPath }})
            return
          }
          next()
        }
        else {
          next()
        }
      })

      window.app.view = new Vue({
        mixins: [BaseMixin],
        router: window.router,
        template: appTemplate,

        components: {
          'feedback': Feedback
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
              : `https://mentoringcanada.ca/${window.app.language.langcode}`
          }
        },

        methods: {
          onTransitionBeforeEnter() {
            document.querySelector("body").classList.add("transition")
          },
          onTransitionAfterEnter() {
            document.querySelector("body").classList.remove("transition")
          },
          async onLogout() {
            await this.app.user.signOut()
            window.location.href = this.countryCode == 'us' ? "https://www.mentoring.org/what-we-do/mentoring-connector/"
              : '/'
          },
          openFeedback() {
            this.$refs['feedback'].openFeedback()
          }
        }

      })

      window.app.view.$mount('#app')
    })
