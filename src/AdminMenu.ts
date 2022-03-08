import globals from "./globals"

export default class AdminMenu {

  list: any[] = []

  constructor() {
    const app = globals.app

    this.list.push({ name: 'app-dashboard', url: 'admin'})

    if(app.ui.searches()) {
      this.list.push({ name: 'app-searches', url: 'admin/searches'})
    }

    if(app.ui.feedback()) {
      this.list.push({ name: 'app-feedback', url: 'admin/feedback'})
    }

    this.list.push({ name: 'app-inquiries', url: 'admin/applications'})
    this.list.push({ name: 'app-programs', url: 'admin/programs'})
    if(app.bootstrap.userHasOrganizations) {
      this.list.push({ name: 'app-organizations', url: 'admin/organizations'})
    }
    if(app.user.admin) {
      this.list.push({ name: 'app-mentorcity', url: 'admin/mentorcity'})
    }
    if(app.ui.partners()) {
      this.list.push({ name: 'app-partners', url: 'admin/partners'})
    }
    if(app.ui.regions()) {
      this.list.push({ name: 'app-regions', url: 'admin/regions'})
    }
    if(app.ui.accounts()) {
      this.list.push({ name: 'app-accounts', url: 'admin/accounts'})
    }
    // if(app.user.admin) {
    //   this.list.push({ name: 'app-settings', url: 'admin/settings'})
    // }

    this.list.push({ name: 'app-profile', url: 'admin/profile'})
  }

}
