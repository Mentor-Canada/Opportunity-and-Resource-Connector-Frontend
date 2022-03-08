import FilterEntity from "./FilterEntity"
import OrganizationFilterCollection from "../organizations/list/OrganizationFilterCollection"

export default class FilterProperties {

  delegate
  filter
  open = {}
  filters

  constructor(type, delegate) {
    this.filter = new FilterEntity(type)
    this.filters = new OrganizationFilterCollection(type)
    this.delegate = delegate
  }

}