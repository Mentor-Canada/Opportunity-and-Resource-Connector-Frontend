export default class GooglePlace {
  public title: string = '';

  public place_id: string = '';

  public lat: string = '';

  public lng: string = '';

  public province: string = '';

  private type: string = '';

  private data: any;

  private postal_code: any;

  private components: any;

  constructor(data?: any) {
    if (data) {
      this.update(data);
    }
  }

  update(data: any) {
    this.data = data;
    this.title = data.formatted_address || data.name;
    this.place_id = data.place_id;
    this.lat = data.lat;
    this.lng = data.lng;
    this.postal_code = data.postal_code;
    this.components = data.components || JSON.stringify(data.address_components);

    if (data.province) {
      this.province = data.province;
    } else if (data.address_components) {
      this.province = this.getProvince();
    }

    if (data.type) {
      this.type = data.type;
    } else if (data.types) {
      this.type = data.types[0];
    }
  }

  getCountry(): string {
    let name;
    this.data?.address_components.forEach((item) => {
      if (item.types.includes('country')) {
        name = item.long_name;
      }
    });
    return name;
  }

  getPostalCode(): string {
    let name;
    this.data?.address_components.forEach((item) => {
      if (item.types.includes('postal_code')) {
        name = item.long_name;
      }
    });
    return name;
  }

  getProvince(): string {
    let name;
    this.data?.address_components.forEach((item) => {
      if (item.types.includes('administrative_area_level_1')) {
        name = item.long_name;
      }
    });
    return name;
  }

  serialize(): any {
    return this.data;
  }
}
