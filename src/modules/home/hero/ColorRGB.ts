export default class ColorRGB {

  public r: string;
  public g: string;
  public b: string;

  constructor(color: string) {
    const rgb = color.match(/\d+/g);
    this.r = rgb[0];
    this.g = rgb[1];
    this.b = rgb[2];
  }

}
