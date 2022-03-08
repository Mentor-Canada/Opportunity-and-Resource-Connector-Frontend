import WindowInterface from "Interfaces/WindowInterface"
declare const window: WindowInterface

import UserAccount from "./UserAccount"

export default class Accounts {

  public list: UserAccount[] = [];

  async get(search?: string) {
    let filter
    if(search) {
      filter = `&filter[mail][value]=${search}&filter[mail][operator]=CONTAINS`
    }
    else {
      filter = ""
    }

    let url = `/a/app/accounts?${filter}`

    return new Promise(async (resolve, reject) => {
      let response = await window.api.get(url)
      this.list = []
      response.data.data.forEach((row, i) => {
        if(row.attributes.display_name == "Anonymous") {
          return
        }
        const account = new UserAccount(row)
        this.list.push(account)
        })
      resolve()
    })
  }

}