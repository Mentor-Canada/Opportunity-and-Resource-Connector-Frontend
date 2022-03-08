import WindowInterface from "Interfaces/WindowInterface"

declare const window: WindowInterface

export default {
  methods: {
    async onAddContact() {
      this.app.showLoading()
      let mail = this.entity.attributes.contactEmail
      let data = {
        uilang: this.app.language.langcode,
      }
      let response = await this.api.post(`a/app/${this.entity.type}/${this.entity.document.id}/administrator/${mail}`, data)
        .catch(() => {})
      await this.entity.load()
      this.showAddContactAsAdmin = this.shouldShowAddContactAsAdmin()
      this.app.hideLoading()
    },

    async onNewAdministrator() {
      this.app.showLoading()
      await this.entity.load()
      this.showAddContactAsAdmin = this.shouldShowAddContactAsAdmin()
      this.app.hideLoading()
    },

    async removeUser(account) {
      this.app.showLoading()
      let response = await this.api.delete(`a/app/${this.entity.type}/${this.entity.document.id}/administrator/${account.mail}`)
      await this.entity.load()
      this.showAddContactAsAdmin = this.shouldShowAddContactAsAdmin()
      this.app.hideLoading()
    },

    shouldShowAddContactAsAdmin() {
      for(const account of this.entity.accounts) {
        if(account.mail == this.entity.attributes.contactEmail) {
          return false
        }
      }
      return true
    },

    onAddUser() {
      this.$refs['add-user'].show = true
    }

  },

}