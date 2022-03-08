import globals from "../../globals"
import ResultUtils from "./ResultUtils"

export default class Result {
  private row: any

  readonly title: string
  readonly organization_title: string
  readonly logoUrl: string
  readonly organizationLogoUrl: string
  readonly locations: any[]
  readonly UUID: string

  readonly siteBased: boolean
  readonly communityBased: boolean
  readonly eMentoring: boolean
  readonly physicalTip: string
  readonly googleMapUrl: string

  static collection(rows: []): Result[] {
    let collection = []
    for(const i in rows) {
      collection.push(new Result(rows[i]))
    }
    return collection
  }

  constructor(row) {
    this.row = row

    this.title = row.title
    this.organization_title = row.organization_title
    if(row.uri) this.logoUrl = row.url
    if(row.organization_uri) this.organizationLogoUrl = row.organization_logo_url
    this.locations = row.locations
    this.UUID = row.UUID
    this.physicalTip = ResultUtils.getPhysicalTip(row.distance)
    this.siteBased = !!parseInt(row.siteBased)
    this.googleMapUrl = row.googleMapUrl
    this.communityBased = !!parseInt(row.communityBased)
    this.eMentoring = !!parseInt(row.eMentoring)
  }

}