import * as Sentry from '@sentry/vue';
import WindowInterface from 'Interfaces/WindowInterface';

import Model from './Model';
import UserAccount from './UserAccount';
import globals from '../globals';

declare const window: WindowInterface;

export default class User extends Model {
  public id: string;

  public account: UserAccount;

  public admin: boolean;

  signIn(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.post('/user/login?_format=json', {
        name: email,
        pass: password,
      })
        .then(async (result) => {
          resolve(result);
        })
        .catch((result) => {
          reject(result);
        });
    });
  }

  load(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const response = await this.api.get('/a/');
      if (response.data.meta) {
        this.id = response.data.meta.links.me.meta.id;
        if (this.id) {
          const response = await Promise.all([
            this.api.get('/session/token'),
            this.api.get(`/a/users/${this.id}`),
          ]);
          globals.api.axios.defaults.headers.common['X-CSRF-Token'] = response[0].data;
          const { data } = response[1].data;
          this.account = new UserAccount(data);
          Sentry.setUser({ email: this.account.mail });
          this.admin = data.attributes.field_global_administrator;
        }
      }
      resolve();
    });
  }

  async signOut(): Promise<any> {
    const response = await this.api.get('/session/logouttoken?_format=json');
    const logoutToken = response.data.logout_token;
    return this.api.post(`/user/logout?_format=json&token=${logoutToken}`);
  }
}
