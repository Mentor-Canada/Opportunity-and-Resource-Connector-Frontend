import RouteBuilder from "../../pages/RouteBuilder"
import globals from "../../globals"
import ResultsPage from "./ResultsPage.vue"

window.addEventListener("register-module", e => {
  let routes = []
  routes = routes.concat(new RouteBuilder()
    .title('app-search-results')
    .path('search/:id')
    .component(ResultsPage)
    .langCodes(globals.app.langCodes)
    .build())
  globals.app.addRoutes(routes)
})