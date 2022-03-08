import BaseMixin from "../../mixins/BaseMixin"
import PageMixin from "../../mixins/PageMixin"

export default {

  mixins: [BaseMixin, PageMixin],

  created() {
    this.delegate.offset = this.$route?.params.offset
  },

  beforeRouteUpdate(to, from, next) {
    this.delegate.offset = to.params.offset
    this.$refs['table-component'].request.begin()
    next()
  },

  mounted() {
    this.delegate.offset = this.$route?.params.offset || 0
  },

  methods: {
    refresh() {
      this.$refs['table-component'].refresh()
    },

    getTimestamp(dateString) {
      if(typeof dateString == "string" && dateString) {
        let components = dateString.split('-')
        let utcDate = new Date(Date.UTC(+components[0], +components[1] - 1, +components[2]))
        return utcDate.getTime() / 1000
      }
      else if(typeof dateString == "number") {
        return dateString
      }
      return null
    }
  }

}
