import globals from "../globals"

export default class OptionCollection {

  public options = [];

  add(value, name = null) {
    name = globals.app.t(name != null ? name : value)
    this.options.push({value, name})
    return this
  }

}