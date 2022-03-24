import globals from '../globals';

export default class ServerVersion {
  version: string;

  async load(): Promise<any> {
    const response = await globals.api.get('/a/app/version');
    this.version = response.data.data.version;
  }
}
