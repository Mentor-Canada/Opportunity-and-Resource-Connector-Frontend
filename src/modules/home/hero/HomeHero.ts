import Point from "./Point";
import Line from "./Line";
import ColorGroup from "./ColorGroup";
import ColorRGB from "./ColorRGB";

export default class HomeHero {

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private length: number;

  private points: Point[] = [];
  private lines: Line[] = [];
  private renderable: (Point|Line)[] = [];

  private radialDensity: number;
  private orbitalDensity: number;
  private linkThreshold: number;

  private animateInProgress: number = 0;
  private globalScale: number = 1;
  private globalOpacity: number = 1;

  private initialGlobalScale: number = 0.8;
  private initialGlobalOpacity: number = 0;
  private targetGlobalScale: number = 1;
  private targetGlobalOpacity: number = 1;

  private pointColorsCount: number = 4;
  private pointColors: ColorGroup[] = [];
  private lineColor: ColorRGB;

  // private radialDensityN = 335;
  // private orbitalDensityN = 0.757;
  // private linkThresholdN = 1.5;

  private radialDensityN = 400;
  private orbitalDensityN = 0.757;
  private linkThresholdN = 1.5;

  private ringCount;

  private raf: null|number = null;
  private ts: number;
  private sx: number;
  private sy: number;

  constructor() {
    this.canvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');

    this.globalScale = this.initialGlobalScale;
    this.globalOpacity = this.initialGlobalOpacity;
    this.getColors();
    this.resize();

    window.addEventListener('resize', () => this.resize());
    window.addEventListener('scroll', () => this.scroll());

    setTimeout(() => {
      this.startRender();
    }, 1200);
  }

  startRender() {
    this.ts = performance.now();
    this.render();
  }

  stopRender() {
    if(this.raf !== null) {
      this.raf = null;
      cancelAnimationFrame(this.raf);
    }
  }

  getColors() {
    const cs = getComputedStyle(this.canvas) as CSSStyleDeclaration;
    for(let i = 0; i < this.pointColorsCount; i++) {
      const fill = cs.getPropertyValue(`--mc-home-point-${i + 1}-fill`);
      const stroke = cs.getPropertyValue(`--mc-home-point-${i + 1}-stroke`);
      const colorFill = new ColorRGB(fill);
      const colorStroke = new ColorRGB(stroke);
      const colorGroup = new ColorGroup();
      colorGroup.fill = colorFill;
      colorGroup.stroke = colorStroke;
      this.pointColors.push(colorGroup);
    }
    const stroke = cs.getPropertyValue(`--mc-home-line-stroke`);
    this.lineColor = new ColorRGB(stroke);
  }

  scroll() {
    const rect = this.canvas.getBoundingClientRect() as DOMRect;
    if(rect.bottom <= 0) {
      if(this.raf !== null) this.stopRender();
    } else {
      if(this.raf === null) this.startRender();
    }
  }

  resize() {
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    this.length = Math.max(this.width, this.height);
    const scale = window.devicePixelRatio;
    this.canvas.width = Math.floor(this.width * scale);
    this.canvas.height = Math.floor(this.height * scale);
    this.ctx.scale(scale, scale);
    this.sx = 1 / Math.min(this.width / this.height, 1);
    this.sy = 1 / Math.min(this.height / this.width, 1);

    if(Math.ceil(1 / (this.radialDensityN / this.length)) != this.ringCount) {
      this.points = [];
      this.lines = [];
      this.setDensity();
      this.setPoints();
      this.setLines();
      this.setRenderable();
    }
  }

  setDensity() {
    this.radialDensity = this.radialDensityN / this.length;
    this.orbitalDensity = this.radialDensity * this.orbitalDensityN;
    this.linkThreshold = this.radialDensity * this.linkThresholdN;
  }

  setPoints() {
    this.ringCount = Math.ceil(1 / this.radialDensity);
    for(let i = 1; i <= this.ringCount; i++) {
      const r = this.radialDensity * i;
      const c = this.getCircumference(r);
      const points = Math.ceil(c / this.orbitalDensity);
      for(let j = 0; j < points; j++) {
        const point = new Point();
        point.r = 8 * Math.random() + 2; // radius of point

        // const v = (0.5 * Math.random() + 0.5) * -0.001; // orbital velocity of point
        // point.v = 0.01;
        // console.log(v);


        // const v = (0.5 * Math.random() + 0.5) * -0.001; // orbital velocity of point
        const v = (Math.random() - 0.5) * 0.004; // orbital velocity of point
        // point.v = j % 2 == 0 ? -0.001 : v;
        // point.v = (i/2) * -0.001;

        point.v = (i / this.ringCount) * -0.001 - 0.001;
        point.v = v;

        const randomAngleRange = (1 / points) * 0.5;
        const randomAngle = Math.random() * randomAngleRange;
        const angle = (j / points) + randomAngle;

        const randomOrbitalRange = (1 / this.ringCount) * 0.5;
        const randomOrbital = Math.random() * randomOrbitalRange;
        const orbital = (i / this.ringCount) + randomOrbital;

        point.a = 2 * Math.PI * angle; // angle of point
        point.o = orbital; // orbital distance of point from center

        point.globalScale = this.globalScale;

        const pointColor = this.pointColors[j % this.pointColorsCount];
        point.c = pointColor.fill;
        point.s = pointColor.stroke;

        point.update(0);
        this.points.push(point);
      }
    }
  }

  setLines() {
    const totalPoints = this.points.length;
    for(let i = 0; i < totalPoints; i++) {
      for(let j = i + 1; j < totalPoints; j++) {
        const p1 = this.points[i];
        const p2 = this.points[j];
        const line = new Line(p1, p2);
        line.c = this.lineColor;
        line.linkThreshold = this.linkThreshold;
        line.globalScale = this.globalScale;
        this.lines.push(line);
      }
    }
  }

  setRenderable() {
    this.renderable = [].concat(this.lines, this.points);
  }

  render() {
    this.raf = requestAnimationFrame(this.render.bind(this));
    const ts = performance.now();
    const dt = ts - this.ts;
    this.ts = ts;
    if(dt == 0) return;

    const framerate = 1000 / 60
    const normalizedTime = dt / framerate;

    if(this.animateInProgress < 1) this.animateIn(normalizedTime);

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.points.forEach((point: Point) => {
      point.update(normalizedTime);
    });
    this.renderable.forEach((renderable: Point|Line) => {
      renderable.render(this.ctx, this.length, this.sx, this.sy);
    });
  }

  animateIn(normalizedTime: number) {
    const deltaAnimateInProgress = 1 - this.animateInProgress;
    const decayAnimateInProgress = deltaAnimateInProgress * 0.05 * normalizedTime;
    this.animateInProgress += decayAnimateInProgress;

    this.globalScale = this.initialGlobalScale + (this.targetGlobalScale - this.initialGlobalScale) * this.animateInProgress;
    this.globalOpacity = this.initialGlobalOpacity + (this.targetGlobalOpacity - this.initialGlobalOpacity) * this.animateInProgress;

    if(Math.abs(1 - this.animateInProgress) < 0.001) {
      this.globalScale = this.targetGlobalScale;
      this.globalOpacity = this.targetGlobalOpacity;
      this.animateInProgress = 1;
    }
    this.renderable.forEach((renderable: Point|Line) => {
      renderable.globalScale = this.globalScale;
    })
    this.ctx.globalAlpha = this.globalOpacity;
  }

  getCircumference(r): number {
    return 2 * Math.PI * r;
  }

}
