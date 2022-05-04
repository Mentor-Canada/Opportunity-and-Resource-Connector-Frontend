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

  public tx: number;
  public ty: number;
  public sinA: number;
  public cosA: number;

  private PI2: number = Math.PI * 2;

  constructor() {}

  public render(ctx: CanvasRenderingContext2D, length: number, sx: number, sy: number) {
    this.tx = this.t(this.x, length, sx);
    this.ty = this.t(this.y, length, sy);
    const w = length / sx;
    const h = length / sy;
    if(this.tx < -this.r - 1 || this.ty < -this.r - 1 || this.tx > w + this.r + 1 || this.ty > h + this.r + 1) return;

    ctx.globalAlpha = 1;
    ctx.fillStyle = `rgb(${this.c.r},${this.c.g},${this.c.b})`;
    ctx.strokeStyle = `rgb(${this.s.r},${this.s.g},${this.s.b})`;
    ctx.beginPath();
    ctx.arc(this.tx, this.ty, this.r, 0, this.PI2, false);
    ctx.fill();
    ctx.stroke();
  }

  public update(t: number) {
    const dv = this.v * t;
    this.a += dv;

    this.sinA = Math.sin(this.a);
    this.cosA = Math.cos(this.a);
    this.x = this.sinA * this.o * this.globalScale;
    this.y = this.cosA * this.o * this.globalScale;
  }

  private t(n: number, l: number, s: number): number {
    const midpoint = (l / s) / 2;
    const offset = n * (l / 2);
    return midpoint + offset;
  }

}
