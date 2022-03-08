import FilterAttributes from "./FilterAttributes"
import globals from "../../globals"

export default class FilterEntity {

  id
  attributes = new FilterAttributes()

  private url = "a/app/filter"

  constructor(type) {
    this.attributes.type = type
  }

  async save() {
    await globals.api.post(this.url, this.attributes)
  }

  async delete() {
    await globals.api.delete(`${this.url}/delete/${this.attributes.id}`)
  }

}