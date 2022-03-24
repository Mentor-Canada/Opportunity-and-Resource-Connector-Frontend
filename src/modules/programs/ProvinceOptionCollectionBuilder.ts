import globals from '../../globals';

export default class ProvinceOptionCollectionBuilder {
  private _url: string;

  url(url: string): ProvinceOptionCollectionBuilder {
    this._url = url;
    return this;
  }

  async execute() {
    const response = await globals.api.get(this._url);
    const provinces = response.data;
    const extras = [];
    extras.push({ name: globals.app.t('app-all'), value: 'app-all' });
    const unknown = provinces.find((row) => row.value == 'app-unknown');
    if (unknown) {
      unknown.name = globals.app.t(unknown.value);
      provinces.splice(provinces.indexOf(unknown), 1);
      extras.push(unknown);
    }
    const without = provinces.find((row) => row.value == 'app-without-physical-location');
    if (without) {
      without.name = globals.app.t(without.value);
      provinces.splice(provinces.indexOf(without), 1);
      extras.push(without);
    }
    if (provinces.length) {
      extras.push({ name: '----------', value: '-' });
    }
    provinces.unshift(...extras);
    return provinces;
  }
}
