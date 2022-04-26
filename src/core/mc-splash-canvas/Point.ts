import ColorRGB from "./ColorRGB"

export default class Point {

  public x: number; // x position
  public y: number; // y position
  public r: number; // radius of point
  public v: number; // orbital velocity of point

  public a: number; // angle of point
  public o: number; // orbital distance of point from center

  public c: ColorRGB; // color
  public s: ColorRGB; // stroke

  public globalScale: number = 1;

  constructor() {}

  public render(ctx: CanvasRenderingContext2D, length: number, sx: number, sy: number) {
    const x = this.t(this.x, length, sx);
    const y = this.t(this.y, length, sy);

    ctx.fillStyle = `rgb(${this.c.r},${this.c.g},${this.c.b})`;
    ctx.strokeStyle = `rgb(${this.s.r},${this.s.g},${this.s.b})`;
    ctx.beginPath();
    ctx.arc(x, y, this.r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }

  public update(t: number) {
    const dv = this.v * t;
    this.a += dv;

    this.x = Math.sin(this.a) * this.o * this.globalScale;
    this.y = Math.cos(this.a) * this.o * this.globalScale;
  }

  private t(n: number, l: number, s: number): number {
    const midpoint = (l / s) / 2;
    const offset = n * (l / 2);
    return midpoint + offset;
  }

}
