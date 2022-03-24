export default class LocalizedString {
  public source;

  public translation;

  constructor(data: any) {
    this.source = data.source;
    this.translation = data.translation;
  }
}
