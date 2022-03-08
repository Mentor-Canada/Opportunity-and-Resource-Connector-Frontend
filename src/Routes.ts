import WindowInterface from "Interfaces/WindowInterface"
import Handler from "./pages/Handler"

declare const window: WindowInterface

class Routes {
  prefix = ''
  list = []

  /**
   * @deprecated
   */
  add(component: PageInterface) {
    let routes = component.routes(this.prefix)
    for(const route of routes) {
      route.component = component
      let title = ''
      if(route.title) {
        title = `${window.app.t(route.title)} | `
      }
      title += window.app.t('app-mentor-connector')
      route.meta = {}
      route.meta.title = title
    }
    this.list = this.list.concat(routes)
  }
}

/**
 * Exports an array of routes suitable for the vue router https://router.vuejs.org/guide/
 */
export default function() {
  let routes = new Routes()
  // routes.add(PageNotFoundPage)
  let front = `${window.app.language.langcode}`
  routes.list.push({ name: 'front', path: '/', redirect: { path: front } })

  for(const language of window.app.languages.list) {
    const lang = language.langcode
    const prefix =  `${lang}`
    routes.prefix = prefix
    routes.add(Handler)
  }
  return routes.list
}
