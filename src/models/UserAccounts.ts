import WindowInterface from 'Interfaces/WindowInterface';

import UserAccount from './UserAccount';

declare const window: WindowInterface;

export default class Accounts {
  public list: UserAccount[] = [];

  async get(search?: string) {
    let filter;
    if (search) {
      filter = `&filter[mail][value]=${search}&filter[mail][operator]=CONTAINS`;
    } else {
      filter = '';
    }

    const url = `/a/app/accounts?${filter}`;

    return new Promise(async (resolve, reject) => {
      const response = await window.api.get(url);
      this.list = [];
      response.data.data.forEach((row, i) => {
        if (row.attributes.display_name == 'Anonymous') {
          return;
        }
        const account = new UserAccount(row);
        this.list.push(account);
      });
      resolve();
    });
  }
}
