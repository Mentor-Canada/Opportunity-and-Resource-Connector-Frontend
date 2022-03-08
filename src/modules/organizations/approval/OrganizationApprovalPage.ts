import Organization from "Models/Organization"
import template from "./OrganizationApproval.html"
import ApprovalMixin from "../../../mixins/ApprovalMixin"
import globals from "../../../globals"

export default {
  // routes(prefix: string): Array<any> {
  //   return [{
  //     path: `/${prefix}/admin/organizations/approval/:id`,
  //     title: 'app-organization-settings'
  //   }]
  // },
  
  mixins: [ApprovalMixin],
  
  template: template,

  data() {
    return {
      organization: new Organization(),
      parentUrl: this.link('organizations'),
      emailSent: false,
      emailSentDate: '',
      adminUrl: 'admin/organizations'
    }
  },

  async mounted() {
    this.app.showLoading()

    if(this.app.view.isAdminPage) {
      this.parentUrl = this.link(this.adminUrl)
    }

    this.app.showLoading()
    this.organization.document.id = this.$route.params.id
    this.approval.attributes.entityId = this.$route.params.id
    this.approval.attributes.userId = globals.app.user.id

    await this.approval.load()
    await this.organization.load()

    let standing = this.organization.attributes.standing
    if(standing == "app-allowed" || standing == "app-denied") {
      this.approvalStatusValue = standing
      this.approvalStatusColor = standing == "app-allowed" ? "color-ui-primary-organization-approved" : "color-ui-error"
    }

    if(this.organization.attributes.ready) {
      this.emailSent = true
      this.emailSentDate = this.organization.attributes.ready
    }

    this.ready()
  },

  methods: {
    async save() {
      this.app.showLoading()
      await this.approval.save()
      if(this.app.view.isAdminPage) {
        await this.router.push(this.parentUrl)
      }
      else {
        await this.router.push(this.link(`organizations/submitted/${this.organization.document.id}`))
      }
    },

    async remove() {
      await this.organization.remove()
      await this.router.push(this.link(this.adminUrl))
    },

    onDetailsClick() {
      this.router.push(this.link(`${this.adminUrl}/detail/${this.organization.document.id}`))
    },

    onAdminsClick() {
      this.router.push(this.link(`${this.adminUrl}/administrators/${this.organization.document.id}`))
    },

  }
  
}
