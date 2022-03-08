import RouteBuilder from "../../pages/RouteBuilder"
import globals from "../../globals"
import SignInPage from "./SignInPage"

window.addEventListener("register-module", e => {
  let routes = []
  routes = routes.concat(new RouteBuilder()
    .title('app-sign-in')
    .path('sign-in')
    .component(SignInPage)
    .langCodes(globals.app.langCodes)
    .build())
  globals.app.addRoutes(routes)
})