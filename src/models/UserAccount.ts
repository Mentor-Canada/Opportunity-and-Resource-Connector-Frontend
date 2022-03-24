import WindowInterface from 'Interfaces/WindowInterface';
import Role from './Role';

declare const window: WindowInterface;

export default class UserAccount {
  public type: string = 'user--user';

  public id: string;

  public link: string;

  public firstName: string;

  public lastName: string;

  public mail: string;

  public pass: string;

  public isAdmin: boolean = false;

  public data: any;

  public onSaveSuccess: (result: any) => void;

  public onSaveError: (result: any) => void;

  constructor(data?: any) {
    if (data) this.setData(data);
  }

  serialize(): any {
    return {
      type: 'user--user',
      id: this.id,
    };
  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      window.api.get(`/a/users/${this.id}`)
        .then((result) => {
          this.setData(result.data.data);
          resolve();
        });
    });
  }

  loadByMail(mail) {
    return new Promise((resolve, reject) => {
      window.api.get(`/a/users?filter[mail]=${mail}`)
        .then((result) => {
          this.setData(result.data.data[0]);
          resolve();
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  private setData(data: any) {
    this.data = data;
    this.id = data.id;
    this.link = `/accounts/detail/${this.id}`;
    if (data.attributes.firstName) {
      this.mail = data.attributes.mail;
      this.firstName = data.attributes.firstName;
      this.lastName = data.attributes.lastName;
      this.isAdmin = data.attributes.globalAdministrator == '1';
    } else {
      this.mail = data.attributes.name;
      this.firstName = data.attributes.field_first_name;
      this.lastName = data.attributes.field_last_name;
      this.isAdmin = data.attributes.field_global_administrator;
    }
  }

  save() {
    return this.id ? this.update() : this.create();
  }

  private async create() {
    const data: any = {
      name: [{ value: this.mail }],
      mail: [{ value: this.mail }],
      field_global_administrator: [{ value: this.isAdmin }],
      field_first_name: [{ value: this.firstName }],
      field_last_name: [{ value: this.lastName }],
      roles: [{ target_id: 'authenticated' }],
      status: [{ value: 1 }],
    };

    return window.api.post(
      '/a/user?_format=json',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      (error) => {
        if (error.response.status == 422) {
          return '422';
        }
        throw error;
      },
    );
  }

  private async update() {
    const data = {
      type: 'user--user',
      id: this.id,
      attributes: {
        name: this.mail,
        mail: this.mail,
        field_global_administrator: this.isAdmin,
        field_first_name: this.firstName,
        field_last_name: this.lastName,
      },
    };

    return window.api.patch(`/a/users/${this.id}`, { data });
  }

  remove(callback: () => void) {
    window.api.delete(`/a/users/${this.id}`)
      .then((result) => {
        callback();
        window.app.hideLoading();
      });
  }
}
