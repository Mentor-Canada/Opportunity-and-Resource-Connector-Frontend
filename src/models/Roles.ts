import WindowInterface from '../WindowInterface';

import Role from './Role';
import Model from './Model';

declare const window: WindowInterface;

export default class Roles extends Model {
  public list: Role[] = [];

  async load() {
    const response = await this.api.get('/a/roles');
    response.data.data.forEach((row) => {
      this.list.push(new Role(row));
    });
  }
}
