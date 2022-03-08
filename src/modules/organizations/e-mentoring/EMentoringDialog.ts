import template from "./EMentoringDialog.html"
import BaseMixin from "BaseMixin"
import globals from "../../../globals"

export default {
  mixins: [BaseMixin],

  template: template,

  props: [
    'organization'
  ],

  data() {
    return {
      show: false,
      firstName: '',
      lastName: '',
      email: '',
      termsOfService: false
    }
  },

  methods: {
    async request() {
      this.app.showLoading()
      this.show = false

      const data = new FormData()
      data.append('organization_id', this.organization.attributes.id)
      data.append('first_name', this.firstName)
      data.append('last_name', this.lastName)
      data.append('email', this.email)
      data.append('uilang', this.app.language.langcode)

      let fileEl: HTMLInputElement = document.querySelector('.e-mentoring-dialog input[type=file]')
      let file = fileEl.files[0]
      if(file) {
        data.append('files[logo]', file)
      }

      let response = await globals.api.post("/a/app/mtg", data, {
        headers: {'Content-Type': 'multipart/form-data' }
      })
      this.organization.attributes.field_mtg = response.data.data
      this.app.hideLoading()
    }
  }
}