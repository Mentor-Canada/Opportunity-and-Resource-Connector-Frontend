import RequestBuilder from "Models/RequestBuilder"

export default class ResultMapRequestBuilder extends RequestBuilder {
  lat(lat): ResultMapRequestBuilder {
    this.params.lat = lat
    return this
  }

  lng(lng): ResultMapRequestBuilder {
    this.params.lng = lng
    return this
  }

  id(id: string): ResultMapRequestBuilder {
    this.resource(`a/app/search/map/${id}`)
    return this
  }

  bounds(bounds: any): ResultMapRequestBuilder {
    this.params.bounds = bounds
    return this
  }
}