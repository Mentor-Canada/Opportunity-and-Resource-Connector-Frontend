import RouteBuilder from "../../pages/RouteBuilder"
import SearchListPage from "./list/SearchListPage"
import globals from "../../globals"


window.addEventListener("register-module", e => {
  let routes = []
  routes = routes.concat(new RouteBuilder()
    .title('app-searches')
    .path('admin/searches')
    .paginated(true)
    .component(SearchListPage)
    .langCodes(globals.app.langCodes)
    .build())
  globals.app.addRoutes(routes)
})