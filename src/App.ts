import WindowInterface from "Interfaces/WindowInterface"
import User from "./models/User"
import LanguageCollection from "Models/LanguageCollection"
import Language from "Models/Language"
import fillTemplate from "es6-dynamic-template"
import UI from "Models/UI"
import AdminMenu from "./AdminMenu"
import RouteInterface from "./RouteInterface"
import Bootstrap from "./Bootstrap"

declare const window: WindowInterface

export default class App {

  private readonly body: HTMLElement

  public user: User
  public view
  public isAdminPage: Boolean = false

  public languages: LanguageCollection
  public language: Language
  public langCodes: any[]
  public adminNavWidth: number = 0
  public adminMenu: AdminMenu
  public ui: UI

  public countries: string[] = ['ca']
  public version: string
  public serverVersion: string

  public pageCount = 20
  public routes: any
  public bootstrap: Bootstrap

  public constructor() {
    this.body = document.querySelector("body")
    this.user = new User()
    this.languages = new LanguageCollection()
    this.ui = new UI()
  }

  async load(): Promise<any> {
    this.bootstrap = new Bootstrap()
    await this.bootstrap.load()

    this.serverVersion = this.bootstrap.version
    await this.user.load()
    await this.languages.load()
    this.langCodes = this.languages.list.map(row => row.langcode)
    document.body.setAttribute('data-language-count', String(this.languages.list.length))
    this.language = this.languages.find(this.getCurrentLanguage())
    await this.language.load()
    this.adminMenu = new AdminMenu()
  }

  setColorContrast() {
    const url_string = window.location.href
    const url = new URL(url_string)
    const colorContrast = url.searchParams.get("high-contrast")
    if(colorContrast) {
      if(colorContrast == "true") {
        document.querySelector("body").classList.add("enforce-a11y-color-contrast")
      }
      if(colorContrast == "false") {
        document.querySelector("body").classList.remove("enforce-a11y-color-contrast")
      }
      return
    }
  }

  showLoading() {
    this.body.classList.add("loading")
  }

  hideLoading() {
    this.body.classList.remove("loading")
  }

  showSpin() {
    this.body.setAttribute('data-show-spin', 'true')
  }

  hideSpin() {
    this.body.removeAttribute("data-show-spin")
  }

  t(source: string, params?: any): string {
    if(source == "all") source = "app-all"
    if(source == "mentor") source = "app-mentor"
    if(source == "mentee") source = "app-mentee"
    for(const string of this.language.strings) {
      if(string.source === source) {
        let result = ""
        try {
          return fillTemplate(string.translation, params)
        }
        catch(e) {
          console.error("An error occurred during localization:", string.translation, params)
          return string.translation
        }
      }
    }
    return source
  }

  getCurrentLanguage(): string {
    let pathname = (window as any).location.pathname
    let components = pathname.split('/')
    return components[1] || 'en'
  }

  getAdminSection(pathname?: string): string {
    if(!pathname) {
      pathname = (window as any).location.pathname
    }
    let components = pathname.split('/')
    return components[4]
  }

  getAdminNavWidth(): number {
    let navwidth = 0
    const nav: HTMLElement = document.querySelector("#admin-nav")
    nav.querySelectorAll("span").forEach((span) => {
      navwidth += span.offsetWidth
    });
    return navwidth
  }

  adminResize() {
    if(this.adminNavWidth == 0) return
    let windowWidth = (window as any).innerWidth
    window.app.view.adminMenuOpen = false
    if(windowWidth * 0.9 < window.app.adminNavWidth) {
      window.app.view.adminMenuCompact = true
    } else {
      window.app.view.adminMenuCompact = false
    }
  }

  link(path: string): string {
    return `/${this.language.langcode}/${path}`
  }

  addRoutes(routes: RouteInterface[]) {
    for(const route of routes as any[]) {
      if(!route.meta && route.title) {
        route.meta = {
          title: route.title
        }
      }
      this.routes.push(route)
    }
  }

}