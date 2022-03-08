import BaseMixin from "BaseMixin"
import PageMixin from "../../mixins/PageMixin"
import WindowInterface from "Interfaces/WindowInterface"
import template from "./Profile.html"

declare const window: WindowInterface

export default {

  mixins: [BaseMixin, PageMixin],

  template: template,

  mounted() {
    this.app.hideLoading()
  },

  data() {
    return {
      account: (window as any).app.user.account
    }
  },

  methods: {
    async logout() {
      await this.app.user.signOut()
      window.location.href = this.countryCode == 'us' ? "https://www.mentoring.org/what-we-do/mentoring-connector/"
        : '/'
    },

    async save() {
      this.app.showLoading()
      await this.account.update()
      this.app.hideLoading()
    }
  }

}


