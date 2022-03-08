import BaseMixin from "BaseMixin"
import FilterProperties from "./FilterProperties"

export default {
  mixins: [BaseMixin],

  props: {
    properties: {
      type: FilterProperties
    },
    isDialog: {
      type: Boolean
    }
  },

  mounted() {
    const filterComponent = this.$refs['filter-component']
    filterComponent.delegate = this.properties.delegate
    filterComponent.filter = this.properties.filter
    filterComponent.savedFilters = this.properties.filters
    filterComponent.isDialog = this.isDialog

    filterComponent.$on('input', () => {
      this.$emit('input')
    })

    filterComponent.$on('save', () => {
      this.$emit('save')
    })

    filterComponent.$on('delete', (filter) => {
      this.$emit('save', filter)
    })

    filterComponent.$on('clear', () => {
      for(const i in this.properties.open) {
        this.properties.open[i] = false
      }
    })
  },

  methods: {
    refresh() {
      this.$emit('input')
    },

    /**
     * Ensure 'blank' option for filter.
     */
    optionsFilterAdapter(options) {
      for(const property in options) {
        if(options.hasOwnProperty(property)) {
          let option = options[property]
          if(option[0].name != '') {
            option.unshift({name: "", value: ""})
          }
        }
      }
      return options
    }
  }
}
