export default class Tab {

  public el: HTMLElement;
  public index: number;
  public id: string;
  public section: HTMLElement;

  public offset: number;
  public width: number;

  constructor(el, index) {
    this.el = el;
    this.index = index;
    this.id = this.el.getAttribute('data-tab-id');
    this.section = document.getElementById(this.id);
  }

  public updateMetrics() {
    this.offset = this.el.offsetLeft;
    this.width = this.el.offsetWidth;
  }

}
