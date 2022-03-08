import RouteBuilder from "../../pages/RouteBuilder"
import globals from "../../globals"
import AdminPage from "./AdminPage"

window.addEventListener("register-module", e => {
  let routes = []
  routes = routes.concat(new RouteBuilder()
    .title('app-admin')
    .path('admin')
    .component(AdminPage)
    .langCodes(globals.app.langCodes)
    .build())
  globals.app.addRoutes(routes)
})