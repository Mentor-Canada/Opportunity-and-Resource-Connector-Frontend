import WindowInterface from 'Interfaces/WindowInterface';

declare const window: WindowInterface;

export default class {
  accounts: number = 0;

  start;

  end;

  mail;

  async load() {
    const params: any = {};
    if (this.start) params.start = this.start;
    if (this.end) params.end = this.end;
    if (this.mail) params.mail = this.mail;
    const query = new URLSearchParams(params);
    let queryString = query.toString();
    if (queryString != '') queryString = `?${queryString}`;
    const url = `/a/utils/stats/account${queryString}`;
    const response = await window.api.get(url);
    this.accounts = response.data.data.searches;
  }
}
