import BaseMixin from "./BaseMixin"
import PageMixin from "./PageMixin"
import Utils from "../utils/Utils"
import globals from "../globals"
import Approval from "Models/Approval"

export default {

  mixins: [BaseMixin, PageMixin],

  data() {
    return {
      url: '/en/a/node/approval',
      approval: new Approval(),
      optionsApproval: [
        { value: 'app-allowed', name: this.t('app-allowed') },
        { value: 'app-pending', name: this.t("app-pending") },
        { value: 'app-suspended', name: this.t("app-suspended") }
      ],
      approvalStatusValue: 'app-pending',
      approvalStatusColor: 'color-ui-neutral',
      sortOrder: [{name: 'attributes.title', direction: 'asc', field: 'attributes.title', sortField: 'attributes.title'}],
      fields: [
        { title: this.t('app-user'), name: 'user.attributes.mail'},
        { title: this.t('app-notes'), name: 'attributes.field_notes'},
        { title: this.t('app-status'), name: 'attributes.field_status', sortField: 'attributes.field_status'}
      ]
    }
  },

  methods: {
    clearApproval() {
      this.approval.attributes.status = ""
    },

    getData(apiUrl, httpOptions) {
      this.app.showLoading()
      let params: any = {}
      params.sort = this.getSortParam(this.sortOrder)
      params.include = 'field_user_entity'
      params['filter[field_approval_entity.id]'] = this.$route.params.id
      let query = new URLSearchParams(params)
      let queryString = query.toString()
      if(queryString != "") queryString = `?${queryString}`
      let url = `${apiUrl}${queryString}`
      return globals.api.get(url)
    },

    getSortParam(sortOrder): string {
      return this.sortOrder.map(function (sort) {
        let field = sort.field.replace(/attributes\./, '')
        field = (sort.direction === 'desc' ? '-' : '') + field
        return field
      }).join(',')
    },

    transformData(data) {
      let transformed: any = {}
      transformed.data = []
      for(const row of data.data) {
        row.attributes.field_status = this.t(row.attributes.field_status)
        let includedId = row.relationships.field_user_entity.data?.id
        row.user = Utils.getIncluded(data.included, includedId)
        if(!row.user) {
          continue
        }
        transformed.data.push(row)
      }
      this.empty = transformed.data.length == 0
      this.ready()
      return transformed
    },
  }

}