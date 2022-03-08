import RouteBuilder from "../../pages/RouteBuilder"
import globals from "../../globals"
import PartnerListPage from "./list/PartnerListPage"
import PartnerDetailPage from "./detail/PartnerDetailPage"

window.addEventListener("register-module", e => {
  let routes = []
  routes = routes.concat(new RouteBuilder()
    .title('app-partners')
    .path('admin/partners')
    .paginated(true)
    .component(PartnerListPage)
    .langCodes(globals.app.langCodes)
    .build())
  routes = routes.concat(new RouteBuilder()
    .title('app-partners')
    .path('admin/partners/offset/:offset')
    .paginated(true)
    .component(PartnerListPage)
    .langCodes(globals.app.langCodes)
    .build())
  routes = routes.concat(new RouteBuilder()
    .title('app-add-partner')
    .path('admin/partners/detail')
    .component(PartnerDetailPage)
    .langCodes(globals.app.langCodes)
    .build())
  routes = routes.concat(new RouteBuilder()
    .title('app-edit-partner')
    .path('admin/partners/detail/:id')
    .component(PartnerDetailPage)
    .langCodes(globals.app.langCodes)
    .build())
  globals.app.addRoutes(routes)
})