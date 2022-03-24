import globals from './globals';

export default class Bootstrap {
  version: string;

  country: string;

  userHasOrganizations: boolean;

  bbbsc: boolean;

  async load(): Promise<any> {
    const response = await globals.api.get('/a/app/bootstrap');
    const { data } = response.data;
    this.version = data.version;
    this.country = data.country;
    this.bbbsc = data.bbbsc;
    this.userHasOrganizations = data.userHasOrganizations;
  }
}
