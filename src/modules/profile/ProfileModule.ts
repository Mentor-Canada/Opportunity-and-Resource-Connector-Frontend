import RouteBuilder from "../../pages/RouteBuilder"
import globals from "../../globals"
import ProfilePage from "./ProfilePage"

window.addEventListener("register-module", e => {
  let routes = []
  routes = routes.concat(new RouteBuilder()
    .title('app-profile')
    .path('admin/profile')
    .component(ProfilePage)
    .langCodes(globals.app.langCodes)
    .build())
  globals.app.addRoutes(routes)
})