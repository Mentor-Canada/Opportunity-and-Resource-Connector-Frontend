import RouteBuilder from "../../pages/RouteBuilder"
import globals from "../../globals"
import ResetPage from "./ResetPage"

window.addEventListener("register-module", e => {
  let routes = []
  routes = routes.concat(new RouteBuilder()
    .title('app-reset')
    .path('reset')
    .component(ResetPage)
    .langCodes(globals.app.langCodes)
    .build())
  globals.app.addRoutes(routes)
})