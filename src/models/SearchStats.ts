import WindowInterface from "Interfaces/WindowInterface"

declare const window: WindowInterface

export default class {

  searches: number = 0
  start
  end
  partnerId

  async load() {
    let params: any = {}
    if(this.start) {
      params.start = this.start
    }
    if(this.end) {
      params.end = this.end
    }
    if(this.partnerId) {
      params.partnerId = this.partnerId
    }
    let query = new URLSearchParams(params)
    let queryString = query.toString()
    if(queryString != "") queryString = `?${queryString}`
    let url = `/a/utils/stats/search${queryString}`
    let response = await window.api.get(url)
    this.searches = response.data.data.searches
  }

}