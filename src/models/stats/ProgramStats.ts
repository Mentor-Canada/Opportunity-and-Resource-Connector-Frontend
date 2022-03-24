import Stats from 'Models/stats/Stats';
import WindowInterface from 'Interfaces/WindowInterface';

declare const window: WindowInterface;

export default class extends Stats {
  type = 'program';

  programs;

  async load() {
    const response = await super.load();
    this.programs = response.data.data.programs;
  }
}
