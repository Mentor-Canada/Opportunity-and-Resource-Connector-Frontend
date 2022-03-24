import Stats from 'Models/stats/Stats';
import WindowInterface from 'Interfaces/WindowInterface';

declare const window: WindowInterface;

export default class extends Stats {
  type = 'country';

  countries;

  async load() {
    const response = await super.load();
    this.countries = response.data.data.countries;
  }
}
