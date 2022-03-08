import globals from "../../globals"
import RequestBuilder from "Models/RequestBuilder"

export default class ResultCollectionBuilder {

  private readonly queryStringParams: any = {}
  private id: string

  constructor(id: string) {
    this.id = id
  }

  lat(lat): ResultCollectionBuilder {
    this.queryStringParams.lat = lat
    return this
  }

  lng(lng): ResultCollectionBuilder {
    this.queryStringParams.lng = lng
    return this
  }

  offset(offset): ResultCollectionBuilder {
    this.queryStringParams["page[offset]"] = offset
    return this
  }

  limit(limit): ResultCollectionBuilder {
    this.queryStringParams["page[limit]"] = limit
    return this
  }

  async build() {
    let queryString = new URLSearchParams(this.queryStringParams)

    let url = new RequestBuilder()
      .langcode(globals.app.language.langcode)
      .resource(`a/app/search/results/list/${this.id}?${queryString.toString()}`)
      .build()

    return await globals.api.get(url)
  }

}