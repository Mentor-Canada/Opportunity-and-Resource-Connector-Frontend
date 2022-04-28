import FocusManager from "./FocusManager";
import MCSplashCanvas from "../../core/mc-splash-canvas/MCSplashCanvas";
import SplitText from "./SplitText";

export default class Home {

  public splash: MCSplashCanvas;
  private hero: HTMLElement;
  private links: NodeListOf<HTMLElement>;
  private resizeEventListener;

  constructor() {
    new FocusManager();
    this.splash = new MCSplashCanvas();
    this.splash.parent = 'home!';

    this.hero = document.getElementById('hero');
    this.hero.classList.add('focused');
    setTimeout(() => {
      this.splash.startRender();
    }, 1200);

    this.links = document.querySelectorAll('#section-nav li');
    this.links.forEach((link) => {
      link.addEventListener('click', (e) => this.onClick(e));
    });

    const statPercentages = document.querySelectorAll('.stat');
    statPercentages.forEach((el) => {
      new SplitText({
        el: el,
        delay: 100,
        delimiter: ''
      })
    })

    this.resize();
    this.resizeEventListener = () => {
      this.resize();
    }
    window.addEventListener('resize', this.resizeEventListener);
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
    window.scroll({
      top: top,
      behavior: 'smooth'
    });
  }

}
