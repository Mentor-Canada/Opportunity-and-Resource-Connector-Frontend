import GooglePlace from './GooglePlace';

export default class Location {
  public place_id;

  public name;

  public lat;

  public lng;

  public type;

  constructor(place_id: string, name: string, type: string, lat: string, lng: string) {
    this.place_id = place_id;
    this.name = name;
    this.lat = lat;
    this.lng = lng;
    this.type = type;
  }
}
