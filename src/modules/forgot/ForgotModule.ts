import RouteBuilder from "../../pages/RouteBuilder"
import globals from "../../globals"
import ForgotPage from "./ForgotPage"

window.addEventListener("register-module", e => {
  let routes = []
  routes = routes.concat(new RouteBuilder()
    .title('app-forgot')
    .path('forgot')
    .component(ForgotPage)
    .langCodes(globals.app.langCodes)
    .build())
  globals.app.addRoutes(routes)
})