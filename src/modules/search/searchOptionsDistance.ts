import globals from "../../globals"
import CAOptions from "Models/CAOptions"

export default function searchOptionsDistance(countryCode = null) {
  if (countryCode == 'ca') {
    return CAOptions.distanceOptions()
  }
  return [
    {value: "5", name: globals.app.t("app-5-miles")},
    {value: "10", name: globals.app.t("app-10-miles")},
    {value: "15", name: globals.app.t("app-15-miles")},
    {value: "25", name: globals.app.t("app-25-miles")},
  ]
}