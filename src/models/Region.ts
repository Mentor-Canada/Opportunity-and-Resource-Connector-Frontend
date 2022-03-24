import WindowInterface from '../WindowInterface';
import UserAccount from './UserAccount';

declare const window: WindowInterface;

class Attributes {
  public title = '';

  serialize() {
    return {
      title: this.title,
    };
  }
}

export default class Region implements EntityInterface {
  public id;

  public link;

  public accounts = [];

  public attributes = new Attributes();

  constructor(data?: any) {
    if (data) {
      this.attributes = data;
      this.id = data.id;
      // this.locations = data.field_locations
      this.link = `/regions/detail/${this.id}`;
    }
  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      window.api.get(`/a/regions/${this.id}?include=field_administrators`)
        .then((result) => {
          const { attributes } = result.data.data;
          this.attributes.title = attributes.title;
          if (result.data.included) {
            result.data.included.forEach((account) => {
              this.accounts.push(new UserAccount(account));
            });
          }
          resolve();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  async save(): Promise<any> {
    return new Promise((resolve, reject) => {
      const data: any = {
        type: 'node--region',
        attributes: this.attributes.serialize(),
      };

      data.relationships = {
        field_administrators: {
          data: this.accounts,
        },
      };

      let url = '/a/app/regions';
      if (this.id) {
        data.id = this.id;
        url = `/a/app/regions/${this.id}`;
      }

      window.api.request({
        method: this.id ? 'PATCH' : 'POST',
        url,
        data: {
          data,
        },
      })
        .then((result) => {
          resolve();
        });
    });
  }

  remove(): Promise<any> {
    return new Promise((resolve, reject) => {
      window.api.delete(`/a/app/regions/${this.id}`)
        .then((result) => {
          resolve();
        });
    });
  }
}
