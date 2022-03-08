import WindowInterface from "Interfaces/WindowInterface"
import Organization from "Models/Organization"
import RequestBuilder from "Models/RequestBuilder"

declare const window: WindowInterface

export default class OrganizationCollection {

  public list: Organization[] = []

  load(search?: string, organizationId?: string): Promise<any> {
    let url = new RequestBuilder()
      .langcode('en')
      .resource('a/node/organization')
      .build()
    return new Promise((resolve, reject) => {

      let params: any = {}
      params['sort'] = 'title'
      // params['filter[field_standing]'] = 'app-allowed'

      let filter
      if(search) {
        params['filter[title][value]'] = search
        params['filter[title][operator]'] = 'CONTAINS'
      }
      if(organizationId) {
        params['organizationId'] = organizationId
      }

      let query = new URLSearchParams(params)
      let queryString = query.toString()
      if(queryString != "") queryString = `?${queryString}`
      url += queryString

      window.api.get(url)
        .then((result) => {
          this.list = []
          result.data.data.forEach((row) => {
            this.list.push(new Organization(row))
          })
          resolve()
        })

    })
  }

}