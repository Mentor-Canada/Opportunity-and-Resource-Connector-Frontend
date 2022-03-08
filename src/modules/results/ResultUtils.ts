import globals from "../../globals"

export default class ResultUtils {

  static getPhysicalTip(distance): string {
    const result = globals.app.t("app-program-delivery-site-based")
    if(!distance) {
      return result
    }

    let distanceUnit = globals.app.t("app-us-distance-unit")
    if(globals.app.countryCode == "ca") distanceUnit = globals.app.t("app-ca-distance-unit")
    let distanceAway = globals.app.t("app-distance-away")

    let d = Math.round(distance * 10) / 10
    // return `${result}: ${d}${distanceUnit} ${distanceAway}`
    return `${d}${distanceUnit} ${distanceAway}`
  }

}