
declare const API_URL;

export default class ManagedFile {
  public url: URL;

  public clear: boolean = false;

  public setData(jsonApiFileData: any) {
    this.url = this.urlAdapter(jsonApiFileData.attributes.uri.url);
  }

  public remove() {
    this.url = null;
    this.clear = true;
  }

  private urlAdapter(urlString: string): URL {
    const apiUrl = new URL(API_URL);
    const baseUrl = `${apiUrl.protocol}//${apiUrl.host}`;
    return new URL(urlString, baseUrl);
  }
}
