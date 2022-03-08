import WindowInterface from "Interfaces/WindowInterface";
declare const window: WindowInterface

export default class Role {

  public id: string
  public drupalId: string
  public label: string

  constructor(data?: any) {
    this.id = data.id
    this.drupalId = data.attributes.drupal_internal__id
    this.label = data.attributes.label
  }

}