import FocusElement from "./FocusElement";

export default class FocusManager {

  private $root: HTMLElement;
  private $els: NodeListOf<HTMLElement>;
  private focusElements: FocusElement[] = [];

  private resizeEventListener: EventListener;
  private scrollEventListener: EventListener;
  private raf: null|number = null;

  constructor(el?: HTMLElement) {
    if(el) {
      this.$root = el;
    } else {
      this.$root = document.body;
    }
    this.$els = this.$root.querySelectorAll('[data-focus-start]');
    this.$els.forEach((el) => {
      this.focusElements.push(new FocusElement(el));
    });

    this.raf = requestAnimationFrame(this.update.bind(this));

    this.resizeEventListener = () => {
      this.resize();
    };
    this.scrollEventListener = () => {
      this.scroll();
    };
    window.addEventListener('resize', this.resizeEventListener);
    window.addEventListener('scroll', this.scrollEventListener);
  }

  scroll() {
    this.focusElements.forEach((focusElement) => {
      focusElement.checkState();
    });
  }

  resize() {
    this.focusElements.forEach((focusElement) => {
      focusElement.onResize();
    });
  }

  update() {
    this.raf = requestAnimationFrame(this.update.bind(this));
    this.focusElements.forEach((focusElement) => {
      if(focusElement.needsVarsUpdate) {
        focusElement.$el.style.setProperty('--focus-percent', `${focusElement.percentInRange}`);
        focusElement.$el.style.setProperty('--focus-percent-excluding-height', `${focusElement.percentInRangeExcludingHeight}`);
        focusElement.needsVarsUpdate = false;
      }
      if(focusElement.needsFocusUpdate) {
        if(focusElement.focused) {
          focusElement.$el.classList.add('focused');
        } else {
          focusElement.$el.classList.remove('focused');
        }
        focusElement.needsFocusUpdate = false;
      }
    });
  }

  public destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.resizeEventListener);
    window.removeEventListener('scroll', this.scrollEventListener);
  }

}
