import RequestBuilder from 'Models/RequestBuilder';
import globals from '../../globals';

export default class LocationResultsCollectionBuilder {
  public readonly queryStringParams: any = {};

  private location: string;

  constructor(location: string) {
    this.location = location;
  }

  lat(lat): LocationResultsCollectionBuilder {
    this.queryStringParams.lat = lat;
    return this;
  }

  lng(lng): LocationResultsCollectionBuilder {
    this.queryStringParams.lng = lng;
    return this;
  }

  offset(offset): LocationResultsCollectionBuilder {
    this.queryStringParams['page[offset]'] = offset;
    return this;
  }

  limit(limit): LocationResultsCollectionBuilder {
    this.queryStringParams['page[limit]'] = limit;
    return this;
  }

  async build() {
    const queryString = new URLSearchParams(this.queryStringParams);

    const url = new RequestBuilder()
      .langcode(globals.app.language.langcode)
      .resource(`a/app/search/results/${this.location}?${queryString.toString()}`)
      .build();

    return globals.api.get(url);
  }
}
