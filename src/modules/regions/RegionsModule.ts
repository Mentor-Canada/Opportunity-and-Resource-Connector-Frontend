import RouteBuilder from "../../pages/RouteBuilder"
import globals from "../../globals"
import RegionListPage from "./list/RegionListPage.vue"
import RegionDetailPage from "./detail/RegionDetailPage.vue"
import ServiceAreas from "./service-areas/ServiceAreas.vue"

window.addEventListener("register-module", e => {
  let routes = []
  routes = routes.concat(new RouteBuilder()
    .title('app-regions')
    .path('admin/regions')
    .paginated(true)
    .component(RegionListPage)
    .langCodes(globals.app.langCodes)
    .build())
  routes = routes.concat(new RouteBuilder()
    .title('app-add-region')
    .path('admin/regions/detail')
    .component(RegionDetailPage)
    .langCodes(globals.app.langCodes)
    .build())
  routes = routes.concat(new RouteBuilder()
    .title('app-edit-region')
    .path('admin/regions/:id')
    .component(RegionDetailPage)
    .langCodes(globals.app.langCodes)
    .build())
  routes = routes.concat(new RouteBuilder()
    .title('app-service-areas')
    .path('admin/regions/:id/service-areas')
    .component(ServiceAreas)
    .langCodes(globals.app.langCodes)
    .build())
  globals.app.addRoutes(routes)
})