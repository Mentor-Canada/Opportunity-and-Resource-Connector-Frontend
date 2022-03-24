import RequestBuilder from 'Models/RequestBuilder';
import ProvinceOptionCollectionBuilder from './ProvinceOptionCollectionBuilder';

export default class ProvinceOptions {
  public options: [] = [];

  async load() {
    const url = new RequestBuilder()
      .langcode('en')
      .resource('a/app/program/filter/provinces')
      .build();
    this.options = await (new ProvinceOptionCollectionBuilder())
      .url(url)
      .execute();
  }
}
