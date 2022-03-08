import WindowInterface from "../WindowInterface";
declare const window: WindowInterface

import Role from "./Role";
import Model from "./Model";

export default class Roles extends Model {

  public list: Role[] = [];

  async load() {
    const response = await this.api.get(`/a/roles`)
    response.data.data.forEach(row => {
      this.list.push(new Role(row))
    })
  }

}