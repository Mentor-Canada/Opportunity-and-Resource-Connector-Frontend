import template from "./PartnerList.html"
import TableMixin from "../../../components/Table/TableMixin"
import globals from "../../../globals"
import PartnerListDelegate from "./PartnerListDelegate"

export default {

  beforeRouteEnter(to, from, next) {
    if(!globals.app.ui.partners()) {
      console.error('access denied')
      return
    }
    next()
  },

  mixins: [TableMixin],
  
  template: template, 

  data() {
    return {
      delegate: new PartnerListDelegate(),
      vueTableSlots: null,
    }
  },

  methods: {
    rowClicked(data: any) {
      let id = data.data.id
      this.router.push(this.link(`${this.delegate.baseUrl}/detail/${id}`))
    }
  }
  
}

