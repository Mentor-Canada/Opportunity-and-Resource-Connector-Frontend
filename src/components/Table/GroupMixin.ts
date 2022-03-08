export default {

  mounted() {
    document.querySelector("body").addEventListener("click", () => {
      this.$el.querySelectorAll(".vuetable-actions").forEach(el => {
        el.classList.remove("table-row-actions-open")
      })
    })
  },

  methods: {
    menuClicked(e: MouseEvent) {
      e.preventDefault()
      e.stopImmediatePropagation()
      let target: any = e.target
      let parent: HTMLElement = target.parentNode
      this.$el.querySelectorAll(".vuetable-actions").forEach(el => {
        if (el !== parent) {
          el.classList.remove("table-row-actions-open")
        }
      })
      parent.classList.toggle("table-row-actions-open")
    },

    emailClicked(attributes) {
      let name = encodeURIComponent(`${attributes.field_first_name} ${attributes.field_last_name}`)
      window.location.href = `mailto:${name}<${attributes.field_email}>`
    },

    rowClicked(data) {
      let id = data.data.id
      this.router.push(this.link(`${this.delegate.baseUrl}/detail/${id}`))
    }
  }

}