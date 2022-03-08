import CollectionRequestUrlBuilder from "../../../pages/CollectionRequestUrlBuilder"

export default class AccountListUrlBuilder extends CollectionRequestUrlBuilder {
  search(value: string): AccountListUrlBuilder {
    if(value) {
      this.params["filter[mail][value]"] = value
      this.params["filter[mail][operator]"] = "CONTAINS"
    }
    return this
  }

  accountType(value: string): AccountListUrlBuilder {
    if(value) {
      this.params["filter[accountType]"] = value
    }
    return this
  }

  mentorCity(value: string): AccountListUrlBuilder {
    if(value) {
      this.params["filter[mentorCity]"] = value
    }
    return this
  }
}
