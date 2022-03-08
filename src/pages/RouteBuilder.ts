import globals from "../globals"
import RouteInterface from "../RouteInterface"

export default class RouteBuilder {

  private readonly prefix: string = ''
  private _paginated: boolean = false
  private _route: any = {}
  private _langCodes: [] = []

  constructor(prefix: string = "") {
    if(prefix) {
      this.prefix = `/${prefix}`
    }
  }

  path(value): RouteBuilder {
    this._route.path = `${this.prefix}/${value}`
    return this
  }

  component(value): RouteBuilder {
    this._route.component = value
    return this
  }

  title(value, addSite = true): RouteBuilder {
    if(value) {
      value = `${globals.app.t(value)}`
      if(addSite) {
        value += ` | ${globals.app.t('app-mentor-connector')}`
      }
      this._route.title = value
      this._route.meta = {}
      this._route.meta.title = value
    }
    return this
  }

  paginated(value): RouteBuilder {
    this._paginated = value
    return this
  }

  langCodes(value): RouteBuilder {
    this._langCodes = value
    return this
  }

  build(): RouteInterface[] {
    let result = []

    if(!this._langCodes.length) {
      result = result.concat(this.getLocalizedRoutes(null))
    }

    for(const langcode of this._langCodes) {
      result = result.concat(this.getLocalizedRoutes(langcode))
    }

    return result
  }

  private getLocalizedRoutes(langcode) {
    let result = []
    let route = Object.assign({}, this._route)
    if(langcode) route.path = `/${langcode}${route.path}`
    result.push(route)

    if(this._paginated) {
      let paginated = Object.assign({}, route)
      paginated.path = `${route.path}/offset/:offset`
      result.push(paginated)
      route.redirect = `${route.path}/offset/0`
    }
    return result
  }

}
