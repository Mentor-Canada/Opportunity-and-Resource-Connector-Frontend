import template from "./SettingsListPage.html"
import BaseMixin from "BaseMixin"
import Settings from "../Settings"
import globals from "../../../globals"
import PageMixin from "../../../mixins/PageMixin"

export default {
  mixins: [BaseMixin, PageMixin],

  template: template,

  data() {
    return {
      list: {},
      fields: [
        { title: '', name: 'title' },
        { title: '', name: 'icon-slot' },
      ]
    }
  },

  async mounted() {
    let routes = Settings.getRoutes(globals.app.language.langcode)
    routes.splice(routes.findIndex(route =>
      route.path == `/${globals.app.language.langcode}/admin/settings`), 1)
    this.list = routes
    this.ready()
  },

  methods: {
    rowClicked(payload: any) {
      this.router.push(payload.data.path)
    }
  }

}
