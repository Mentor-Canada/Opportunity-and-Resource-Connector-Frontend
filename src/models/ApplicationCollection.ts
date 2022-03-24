import Application from 'Models/Application';
import WindowInterface from '../WindowInterface';

import { CollectionInterface } from '../interfaces/CollectionInterface';

declare const window: WindowInterface;

export default class ApplicationCollection implements CollectionInterface {
  public list: Application[] = [];

  load(search?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = '/a/application?sort=-created';
      window.api.get(`${url}`)
        .then((result) => {
          this.list = [];
          result.data.data.forEach((row) => {
            this.list.push(new Application(row));
          });
          resolve();
        });
    });
  }
}
