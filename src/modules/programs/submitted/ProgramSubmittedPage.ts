import BaseMixin from "../../../mixins/BaseMixin"
import PageMixin from "../../../mixins/PageMixin"
import template from "./ProgramSubmitted.html"
import WindowInterface from "Interfaces/WindowInterface"
declare const window: WindowInterface

export default {
  mixins: [BaseMixin, PageMixin],

  template: template,

  async mounted() {
    this.title = this.t("app-program-submitted-headline")

    this.subtitle = this.t("app-program-submitted-subtitle", {
      programName: this.$route.query.title
    })

    this.paragraph = this.t("app-program-submitted-paragraph", {
      email: this.$route.query.email
    })

    this.ready()
  },

  data() {
    return {
      title: "",
      subtitle: "",
      paragraph: "",
      organizationRedirect: !this.$route.query.organization ? "" : '?organization=' + this.$route.query.organization
    }
  }
}