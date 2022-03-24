import WindowInterface from 'Interfaces/WindowInterface';

declare const window: WindowInterface;

export default class {
  type = '';

  public attributes: any = {
    start: null,
    stop: null,
    title: null,
  };

  async load() {
    const query = new URLSearchParams(this.attributes);
    let queryString = query.toString();
    if (queryString != '') queryString = `?${queryString}`;
    const url = `/a/utils/stats/${this.type}${queryString}`;
    return window.api.get(url);
  }
}
