import WindowInterface from "Interfaces/WindowInterface"

declare const window: WindowInterface

export default class {

  type = ''

  public attributes: any = {
    start: null,
    stop: null,
    title: null
  }

  async load() {
    let query = new URLSearchParams(this.attributes)
    let queryString = query.toString()
    if(queryString != "") queryString = `?${queryString}`
    let url = `/a/utils/stats/${this.type}${queryString}`
    return await window.api.get(url)
  }

}


