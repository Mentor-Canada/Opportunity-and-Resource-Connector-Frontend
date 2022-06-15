import FocusElement from "./FocusElement";

export default class FocusManager {

  private $root: HTMLElement;
  private $els: NodeListOf<HTMLElement>;
  private focusElements: FocusElement[] = [];

  private resizeEventListener: EventListener;
  private raf: null|number = null;
  private rafLastTimestamp: number;

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

    this.rafLastTimestamp = performance.now();
    this.raf = requestAnimationFrame(this.update.bind(this));

    this.resizeEventListener = () => {
      this.resize();
    };
    window.addEventListener('resize', this.resizeEventListener);
  }

  resize() {
    this.focusElements.forEach((focusElement) => {
      focusElement.onResize();
    });
  }

  update() {
    this.raf = requestAnimationFrame(this.update.bind(this));

    const rafCurrentTimestamp = performance.now();
    const rafDelta = rafCurrentTimestamp - this.rafLastTimestamp;
    if(rafDelta == 0) return;
    this.rafLastTimestamp = rafCurrentTimestamp;
    const targetFrameRate = 1000/60;
    const normalizedTime = targetFrameRate / rafDelta;


    this.focusElements.forEach((focusElement) => {
      focusElement.checkState(normalizedTime);
      if(focusElement.needsVarsUpdate) {
        focusElement.$el.style.setProperty('--focus-percent', `${focusElement.percentInRange}`);
        focusElement.$el.style.setProperty('--focus-percent-excluding-height', `${focusElement.percentInRangeExcludingHeight}`);
        focusElement.$el.style.setProperty('--focus-percent-with-decay', `${focusElement.percentInRangeWithDecay}`);
        focusElement.$el.style.setProperty('--focus-percent-excluding-height-with-decay', `${focusElement.percentInRangeExcludingHeightWithDecay}`);
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
  }

}
