import FocusManager from "./FocusManager";
import MCSplashCanvas from "../../core/mc-splash-canvas/MCSplashCanvas";

export default class Home {

  private hero: HTMLElement;

  constructor() {
    new FocusManager();
    const splash = new MCSplashCanvas();
    setTimeout(() => {
      splash.startRender();
    }, 1200);

    this.hero = document.getElementById('hero');

    // this.resize();
    // window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const vh = window.innerHeight;
    const rect = this.hero.getBoundingClientRect() as DOMRect;
    if(rect.height > vh) {
      const top = vh - rect.height;
      this.hero.style.setProperty('--mc-home-hero-sticky-top', `${top}px`);
    } else {
      this.hero.style.setProperty('--mc-home-hero-sticky-top', '');
    }
  }

}
