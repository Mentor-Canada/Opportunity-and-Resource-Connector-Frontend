export default class FocusElement {

  public $el: HTMLElement;
  private readonly startExpression: string;
  private readonly endExpression: string;
  private start: any;
  private end: any;

  private rect: DOMRect;

  public focused: boolean;
  private toggle: boolean;
  private vars: boolean;

  private windowHeight: any;

  public percentInRange: number;
  public percentInRangeExcludingHeight: number;
  public percentInRangeWithDecay: number;
  public percentInRangeExcludingHeightWithDecay: number;

  private currentPercentInRangeWithDecay: number = 0;
  private currentPercentInRangeExcludingHeightWithDecay: number = 0;

  public needsVarsUpdate: boolean = false;
  public needsFocusUpdate: boolean = false;

  constructor(el) {
    this.$el = el;
    this.startExpression = this.$el.getAttribute('data-focus-start');
    this.endExpression = this.$el.getAttribute('data-focus-end');
    this.toggle = this.$el.getAttribute('data-focus-toggle') != 'false';
    this.vars = this.$el.getAttribute('data-focus-vars') == 'true';
    this.onResize();
  }

  onResize() {
    this.windowHeight = window.innerHeight;
    this.start = this.calc(this.startExpression);
    this.end = this.calc(this.endExpression);
    this.checkState(1);
  }

  checkState(normalizedTime: number) {
    this.rect = this.$el.getBoundingClientRect();

    if(this.startExpression && this.endExpression && this.vars) {
      let percentInRange = Math.min(Math.max(0, this.getPercentInRange(this.rect.top, this.start, this.end - this.rect.height)), 1);
      let percentInRangeExcludingHeight = Math.min(Math.max(0, this.getPercentInRange(this.rect.top, this.start, this.end)), 1);

      let percentInRangeWithDecay = this.currentPercentInRangeWithDecay;
      percentInRangeWithDecay += (percentInRange - percentInRangeWithDecay) / (15 * normalizedTime);
      this.currentPercentInRangeWithDecay = percentInRangeWithDecay;

      let percentInRangeExcludingHeightWithDecay = this.currentPercentInRangeExcludingHeightWithDecay;
      percentInRangeExcludingHeightWithDecay += (percentInRangeExcludingHeight - percentInRangeExcludingHeightWithDecay) / (15 * normalizedTime);
      this.currentPercentInRangeExcludingHeightWithDecay = percentInRangeExcludingHeightWithDecay;

      if(Math.abs(percentInRangeWithDecay - percentInRange) < 0.0001) {
        this.currentPercentInRangeWithDecay = percentInRange;
      }
      if(Math.abs(percentInRangeExcludingHeightWithDecay - percentInRangeExcludingHeight) < 0.0001) {
        this.currentPercentInRangeExcludingHeightWithDecay = percentInRangeExcludingHeight;
      }

      if(
        percentInRange != this.percentInRange ||
        percentInRangeExcludingHeight != this.percentInRangeExcludingHeight ||
        percentInRangeWithDecay != this.percentInRangeWithDecay ||
        percentInRangeExcludingHeightWithDecay != this.percentInRangeExcludingHeightWithDecay
      ) {
        this.percentInRange = percentInRange;
        this.percentInRangeExcludingHeight = percentInRangeExcludingHeight;
        this.percentInRangeWithDecay = percentInRangeWithDecay;
        this.percentInRangeExcludingHeightWithDecay = percentInRangeExcludingHeightWithDecay;
        this.needsVarsUpdate = true;
      }
    }

    if(this.toggle) {
      if(this.rect.top <= this.start) {
        if(!this.focused) this.requestFocusChange(true);
      } else {
        if(this.rect.top > this.windowHeight) {
          if(this.focused) this.requestFocusChange(false);
        }
      }
      return;
    }

    if(this.focused && !this.endExpression) return;

    if(this.rect.top <= this.start && !this.endExpression) {
      this.requestFocusChange(true);
      return;
    }

    if(this.rect.top <= this.start && this.rect.bottom > this.end) {
      if(!this.focused) this.requestFocusChange(true);
    } else {
      if(this.focused) this.requestFocusChange(false);
    }
  }

  private calc(expression: string): any {
    if(!expression) return null;
    const origin = expression.substr(0, 1) == 't' ? 0 : this.windowHeight;
    const dir = expression.substr(1, 1) == '+' ? 1 : -1;
    const offset = expression.substr(2, expression.length - 2);
    let units = offset.slice(-2);
    let value = offset.substr(0, offset.length - 2) as unknown as number;
    if(units == 'vh') {
      value = value * this.windowHeight / 100;
    }
    return origin + (value * dir);
  }

  private requestFocusChange(focused: boolean) {
    this.focused = focused;
    this.needsFocusUpdate = true;
  }

  private getPercentInRange(input, min, max) {
    return (input - min) / (max - min);
  }

}
