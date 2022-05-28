import FocusManager from "./FocusManager";
import MCSplashCanvas from "../../core/mc-splash-canvas/MCSplashCanvas";
import SplitText from "./SplitText";
import Tabs from "./tabs/Tabs";

export default class Home {

  private focusManager: FocusManager;
  private splash: MCSplashCanvas;
  private hero: HTMLElement;
  private features: HTMLElement;

  private splashVisible: boolean = false;
  private splashAnimationPending: boolean = true;
  private splashAnimationTimeout: null|number = null;

  private resizeEventListener: EventListener;
  private scrollEventListener: EventListener;

  private tabs: Tabs;

  constructor() {
    this.focusManager = new FocusManager();
    this.splash = new MCSplashCanvas();

    this.hero = document.getElementById('hero');
    this.features = document.getElementById('features');

    const statPercentages = document.querySelectorAll('.stat');
    statPercentages.forEach((el) => {
      new SplitText({
        el: el,
        delay: 100,
        delimiter: ''
      })
    })

    this.tabs = new Tabs(document.querySelector('#section-nav'));

    this.resize();
    this.resizeEventListener = () => {
      this.resize();
    };
    this.scrollEventListener = () => {
      this.scroll();
    };
    window.addEventListener('resize', this.resizeEventListener);
    window.addEventListener('scroll', this.scrollEventListener);

    this.hero.classList.add('animate-in');
    if(!this.splashVisible) this.hero.classList.add('animate-in-immediate');
    this.splashAnimationTimeout = window.setTimeout(() => {
      this.splashAnimationPending = false;
      this.updateRender();
    }, 1200);
  }

  scroll() {
    const rect = this.features.getBoundingClientRect() as DOMRect;
    this.splashVisible = rect.top > 0;
    this.updateRender();
  }

  updateRender() {
    if(this.splashAnimationPending) {
      if(!this.splashVisible) {
        clearTimeout(this.splashAnimationTimeout);
        this.splashAnimationPending = false;
        this.splash.initialGlobalOpacity = 1;
        this.splash.initialGlobalScale = 1;
      }
      return;
    }

    if(this.splashVisible) {
      this.splash.startRender();
    } else {
      this.splash.stopRender();
    }
  }

  resize() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    document.documentElement.style.setProperty('--vw', `${vw}`);
    document.documentElement.style.setProperty('--vh', `${vh}`);
    const rect = this.hero.getBoundingClientRect() as DOMRect;
    if(rect.height > vh) {
      const top = vh - rect.height;
      this.hero.style.setProperty('--mc-home-hero-sticky-top', `${top}px`);
    } else {
      this.hero.style.setProperty('--mc-home-hero-sticky-top', '');
    }
    this.scroll();
  }

  public destroy() {
    this.focusManager.destroy();
    this.splash.destroy();
    this.tabs.destroy();
    window.removeEventListener('resize', this.resizeEventListener);
    window.removeEventListener('scroll', this.scrollEventListener);
    clearTimeout(this.splashAnimationTimeout);
  }

}
