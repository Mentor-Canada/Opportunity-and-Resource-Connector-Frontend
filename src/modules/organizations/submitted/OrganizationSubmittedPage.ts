import BaseMixin from "BaseMixin"
import PageMixin from "../../../mixins/PageMixin"
import template from "./OrganizationSubmitted.html"
import SubmittedOrganization from "./SubmittedOrganization"
import globals from "../../../globals"

export default {
  mixins: [BaseMixin, PageMixin],

  template: template,

  async mounted() {
    this.app.showLoading()

    const submittedOrganization = new SubmittedOrganization()
    await submittedOrganization.load(this.$route.params.id, globals.app.language.langcode)

    this.title = this.t("app-organization-submitted-headline")

    this.subtitle = this.t("app-organization-submitted-subtitle", {
      organizationName: submittedOrganization.title
    })

    this.paragraph = this.t("app-organization-submitted-paragraph", {
      email: submittedOrganization.contactEmail
    })

    this.ready()
  }
}

