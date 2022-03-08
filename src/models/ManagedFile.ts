export default class ManagedFile {

  public url: URL
  public clear: boolean = false

  public setData(jsonApiFileData: any) {
    this.url = this.urlAdapter(jsonApiFileData.attributes.uri.url)
  }

  public remove() {
    this.url = null
    this.clear = true
  }

  private urlAdapter(urlString: string): URL {
    let apiUrl = new URL(API_URL)
    let baseUrl = `${apiUrl.protocol}//${apiUrl.host}`
    return new URL(urlString, baseUrl)
  }

}
