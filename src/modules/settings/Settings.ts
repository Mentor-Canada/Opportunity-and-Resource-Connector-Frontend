import SettingsListPage from "./list/SettingsListPage"
import SettingsLanguagesPage from "./languages/SettingsLanguagesPage"
import RouteBuilder from "../../pages/RouteBuilder"

export default class Settings {

  static getRoutes(lang: string, addSite: boolean = false) {
    let routes = []
    routes = routes.concat(new RouteBuilder(lang)
      .title('app-settings', addSite)
      .path('admin/settings')
      .component(SettingsListPage)
      .build())
    routes = routes.concat(new RouteBuilder(lang)
      .title('app-languages', addSite)
      .path('admin/settings/languages')
      .component(SettingsLanguagesPage)
      .build())
    return routes
  }

}