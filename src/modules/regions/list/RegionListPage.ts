import RegionListDelegate from "./RegionListDelegate"
import TableMixin from "../../../components/Table/TableMixin"

export default {
  mixins: [TableMixin],

  data() {
    return {
      delegate: new RegionListDelegate(),
    }
  },

  methods: {
    rowClicked(data) {
      let id = data.data.id
      this.router.push(this.link(`${this.delegate.baseUrl}/${id}`))
    }
  }

}