import globals from '../globals';

export default class RequestBuilder {
  private _resource: string;

  private _langcode: string;

  protected params: any = {};

  resource(value: string): RequestBuilder {
    this._resource = value;
    return this;
  }

  langcode(value: string): RequestBuilder {
    this._langcode = globals.app.languages.list.length == 1 ? '' : value;
    return this;
  }

  build(): string {
    const url = [];
    if (this._langcode) url.push(this._langcode);
    url.push(this._resource);
    let urlString = url.join('/');
    urlString = urlString.replace('//', '/');

    const query = new URLSearchParams(this.params);
    let queryString = query.toString();
    if (queryString != '') queryString = `?${queryString}`;
    urlString += queryString;

    return urlString;
  }
}
