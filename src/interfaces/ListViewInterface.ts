import {CollectionInterface} from "./CollectionInterface"

export const mixin = {
  mounted() {
    this.show()
  },

  data() {
    return {
      search: ''
    }
  },

  methods: {
    show() {
      this.app.showLoading()
      this.collection.load(this.search).then(() => {
        this.app.hideLoading()
        this.ready()
      })
    }
  }

}

export interface data {
  collection: CollectionInterface
  icon: string
  emptyText: string
  [prop: string]: any
}
