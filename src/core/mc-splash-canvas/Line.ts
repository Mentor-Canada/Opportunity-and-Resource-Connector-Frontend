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
    if(d > visible) return;
    const o = 1 - d / visible;

    const x1 = this.p1.tx;
    const y1 = this.p1.ty;
    const x2 = this.p2.tx;
    const y2 = this.p2.ty;

    const o1 = this.p1.o;
    const o2 = this.p2.o;

    let midA = Math.atan2(this.p1.sinA + this.p2.sinA, this.p1.cosA + this.p2.cosA);
    let midO = (o1 + o2) / 2;

    const normalCx = Math.sin(midA) * midO;
    const normalCy = Math.cos(midA) * midO;

    const cx = this.t(normalCx, length, sx);
    const cy = this.t(normalCy, length, sy);

    const w = length / sx;
    const h = length / sy;

    if(!this.shouldRender(x1, y1, x2, y2, cx, cy, w, h)) return;

    ctx.globalAlpha = o * 0.5;
    ctx.strokeStyle = `rgb(${this.c.r},${this.c.g},${this.c.b})`;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cx, cy, x2, y2);
    ctx.stroke();
  }

  private shouldRender(x1, y1, x2, y2, cx, cy, w, h): boolean {

    if(x1 >= 0 && x1 <= w && y1 >= 0 && y1 <= h) return true;
    if(x2 >= 0 && x2 <= w && y2 >= 0 && y2 <= h) return true;
    if(cx >= 0 && cx <= w && cy >= 0 && cy <= h) return true;

    const l = [
      { x: 0, y: 0 },
      { x: w, y: 0 },
      { x: w, y: h},
      { x: 0, y: h}
    ];

    for(let i = 0; i < 4; i++) {
      let p1 = i;
      let p2 = i === 3 ? 0 : i + 1;
      if(this.intersects(x1, y1, x2, y2, l[p1].x, l[p1].y, l[p2].x, l[p2].y)) {
        return true;
      }
      if(this.intersects(x1, y1, cx, cy, l[p1].x, l[p1].y, l[p2].x, l[p2].y)) {
        return true;
      }
      if(this.intersects(x2, y2, cx, cy, l[p1].x, l[p1].y, l[p2].x, l[p2].y)) {
        return true;
      }
    }

    return false;
  }

  private intersects(a,b,c,d,p,q,r,s): boolean {
    let det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  }

  private t(n: number, l: number, s: number): number {
    const midpoint = (l / s) / 2;
    const offset = n * (l / 2);
    return midpoint + offset;
  }

  private getDistance(): number {
    const dx = this.p1.x - this.p2.x;
    const dy = this.p1.y - this.p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

}
