import Stats from "Models/stats/Stats"
import WindowInterface from "Interfaces/WindowInterface"

declare const window: WindowInterface

export default class extends Stats {

  type = 'region'
  regions

  constructor() {
    super()
    this.attributes.country = null
  }

  async load() {
    let response = await super.load()
    this.regions = response.data.data.regions
  }

}