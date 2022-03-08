import WindowInterface from "Interfaces/WindowInterface"
import BaseMixin from "BaseMixin"
import template from "./Forgot.html"

declare const window: WindowInterface

export default {

  mixins: [BaseMixin],

  template: template,

  beforeRouteEnter(to, from, next) {
    document.querySelector("body").classList.add("loading")
    if(window.app.user.id) {
      window.router.replace("/searches")
    }
    else {
      next()
    }
  },

  mounted() {
    this.app.hideLoading()
  },

  data() {
    return {
      email: this.$route.query.email
    }
  },

  methods: {
    submit() {
      this.app.showLoading()
      window.api.post(
        '/user/lost-password?_format=json',
        { mail: this.email },
        { headers: {'content-type': 'application/json'} })
        .then(() => {
          this.router.push(this.link('sign-in?checkemail=confirm'))
        })
        .catch(() => {
          this.app.hideLoading()
          this.$refs.emailInput.setError(this.t("app-invalid-user"))
        })
    }

  }

}


