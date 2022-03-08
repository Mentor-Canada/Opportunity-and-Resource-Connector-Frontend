import WindowInterface from "Interfaces/WindowInterface"
declare const window: WindowInterface

import Region from "./Region"

export default class Regions {

  public list: Region[] = [];

  async get(search: string = "", callback?: () => void) {
    window.app.showLoading()

    let filter
    if(search) {
      filter = `&filter[search][condition][path]=title&filter[search][condition][value]=${search}&filter[search][condition][operator]=CONTAINS`;
    }
    else {
      filter = ""
    }

    return window.api.get(`/a/regions?sort=title${filter}`)
      .then((result) => {
        result.data.data.forEach(data => {
          data.attributes.id = data.id
          const region = new Region(data.attributes)
          this.list.push(region)
        })
        if(callback) {
          callback()
        }
      })

    // const app = new App();
    // console.log(window.app);
    // console.log(window.app);
  }

}