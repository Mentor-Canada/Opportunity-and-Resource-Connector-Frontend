import RouteBuilder from "../../pages/RouteBuilder"
import globals from "../../globals"
import PartnerCompactSearchPage from "./compact/SearchPage"

window.addEventListener("register-module", e => {
  let routes = []
  routes = routes.concat(new RouteBuilder()
    .path('partner/search/compact/:id')
    .component(PartnerCompactSearchPage)
    .langCodes(globals.app.langCodes)
    .build())
  globals.app.addRoutes(routes)
})
