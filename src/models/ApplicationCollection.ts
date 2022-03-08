import WindowInterface from "../WindowInterface";
declare const window: WindowInterface

import {CollectionInterface} from "../interfaces/CollectionInterface";
import Application from "Models/Application";

export default class ApplicationCollection implements CollectionInterface {

  public list: Application[] = [];

  load(search?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = `/a/application?sort=-created`
      window.api.get(`${url}`)
        .then((result) => {
          this.list = []
          result.data.data.forEach((row) => {
            this.list.push(new Application(row))
          })
          resolve()
        });

    })
  }

}