import Stats from 'Models/stats/Stats';
import WindowInterface from 'Interfaces/WindowInterface';

declare const window: WindowInterface;

export default class extends Stats {
  type = 'partner';

  partners;

  async load() {
    const response = await super.load();
    this.partners = response.data.data.partners;
  }
}
