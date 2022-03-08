import WindowInterface from "Interfaces/WindowInterface"
declare const window: WindowInterface

export default class UserAccount {

  public mail: string
  public organizationId: string

  async save() {
    let data: any = {
      "mail": this.mail,
      "organizationId": this.organizationId
    }
    let result = await window.api.post(`/a/organization/set-administrator`, data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
    )
  }
}