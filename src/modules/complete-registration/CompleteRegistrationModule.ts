import RouteBuilder from "../../pages/RouteBuilder"
import globals from "../../globals"
import CompleteRegistrationPage from "./CompleteRegistrationPage"


window.addEventListener("register-module", e => {
  let routes = []
  routes = routes.concat(new RouteBuilder()
    .title('app-complete-registration')
    .path('complete-registration')
    .component(CompleteRegistrationPage)
    .langCodes(globals.app.langCodes)
    .build())
  globals.app.addRoutes(routes)
})


