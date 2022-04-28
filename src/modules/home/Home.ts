import FocusManager from "./FocusManager";
import MCSplashCanvas from "../../core/mc-splash-canvas/MCSplashCanvas";

export default class Home {

  private hero: HTMLElement;
  private links: NodeListOf<HTMLElement>

  constructor() {
    new FocusManager();
    const splash = new MCSplashCanvas();

    this.hero = document.getElementById('hero');
    this.hero.classList.add('focused');
    setTimeout(() => {
      splash.startRender();
    }, 1200);

    this.links = document.querySelectorAll('#section-nav li');
    this.links.forEach((link) => {
      link.addEventListener('click', (e) => this.onClick(e));
    });

    this.resize();
    window.addEventListener('resize', () => this.resize());
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

  onClick(e) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const id = target.getAttribute('data-section-id');
    const section = document.getElementById(id);
    const rect = section.getBoundingClientRect() as DOMRect;
    const top = Math.ceil(rect.top + document.documentElement.scrollTop);
    console.log(top);
    window.scroll({
      top: top,
      behavior: 'smooth'
    });
  }

}
