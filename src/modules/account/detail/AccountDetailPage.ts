import UserAccount from "Models/UserAccount"
import BaseMixin from "../../../mixins/BaseMixin"
import PageMixin from "../../../mixins/PageMixin"
import template from "./AccountDetail.html"
import globals from "../../../globals"

export default {

  beforeRouteEnter(to, from, next) {
    if(!globals.app.ui.accounts()) {
      console.error('access denied')
      return
    }
    next()
  },

  mixins: [BaseMixin, PageMixin],

  template: template,

  data() {
    return {
      title: "Create Account",
      account: new UserAccount(),
      showSnackbar: false,
      showRemoveConfirmation: false,
      snackbarMessage: "",
      mail: "",
      admin: false,
      showDuplicateEmail: false
    }
  },

  async mounted() {
    this.app.showLoading()

    if(this.$route.params.id) {
      this.account.id = this.$route.params.id
      await this.account.load()
      this.title = 'Edit Account'
      this.mail = this.account.mail
      this.admin = this.account.isAdmin
    }

    this.ready()
  },

  methods: {
    async save() {
      this.app.showLoading()
      this.showSnackbar = false
      this.snackbarMessage = ""
      let response = await this.account.save()
      if(response.data) {
        this.router.push(this.link('admin/accounts'))
      }
      else if(response == 422) {
        this.showDuplicateEmail = true
      }
      this.app.hideLoading()
    },

    showRemoveConfirmationDialog() {
      this.showRemoveConfirmation = true
    },

    remove() {
      this.app.showLoading()
      this.showRemoveConfirmation = false
      this.account.remove(() => {
        this.router.replace(this.link("admin/accounts"))
        this.app.hideLoading()
      })
    }
  }

}