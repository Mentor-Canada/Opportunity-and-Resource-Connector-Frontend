import Point from "./Point";
import ColorRGB from "./ColorRGB"

export default class Line {

  private p1: Point;
  private p2: Point;

  public c: ColorRGB;
  public linkThreshold: number;
  public globalScale: number = 1;

  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }

  public render(ctx: CanvasRenderingContext2D, length: number, sx: number, sy: number) {
    const visible = this.linkThreshold * this.globalScale;
    const d = this.getDistance();
    const clamped = Math.min(d, visible);
    const o = 1 - clamped / visible;
    if(o <= 0) return;

    ctx.strokeStyle = `rgba(${this.c.r},${this.c.g},${this.c.b},${o * 0.5})`;
    // this.renderLinearLine(ctx, length, sx, sy, o);
    this.renderQuadraticLine(ctx, length, sx, sy, o);
  }

  renderLinearLine(ctx: CanvasRenderingContext2D, length: number, sx: number, sy: number, o: number) {
    const x1 = this.t(this.p1.x, length, sx);
    const y1 = this.t(this.p1.y, length, sy);
    const x2 = this.t(this.p2.x, length, sx);
    const y2 = this.t(this.p2.y, length, sy);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  renderQuadraticLine(ctx: CanvasRenderingContext2D, length: number, sx: number, sy: number, o: number) {
    const x1 = this.t(this.p1.x, length, sx);
    const y1 = this.t(this.p1.y, length, sy);
    const x2 = this.t(this.p2.x, length, sx);
    const y2 = this.t(this.p2.y, length, sy);

    const a1 = this.p1.a;
    const o1 = this.p1.o;
    const a2 = this.p2.a;
    const o2 = this.p2.o;

    let midA = Math.atan2(Math.sin(a1) + Math.sin(a2), Math.cos(a1) + Math.cos(a2));
    let midO = (o1 + o2) / 2;

    const normalCx = Math.sin(midA) * midO;
    const normalCy = Math.cos(midA) * midO;

    const cx = this.t(normalCx, length, sx);
    const cy = this.t(normalCy, length, sy);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cx, cy, x2, y2);
    ctx.stroke();
  }

  private t(n: number, l: number, s: number): number {
    const midpoint = (l / s) / 2;
    const offset = n * (l / 2);
    return midpoint + offset;
  }

  private getDistance(): number {
    const dx = this.p1.x - this.p2.x;
    const dy = this.p1.y - this.p2.y;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }

}
