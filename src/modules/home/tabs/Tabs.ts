import Tab from "./Tab";

export default class Tabs {

  private el: HTMLElement
  private tabs: Tab[] = [];
  private ulEl: HTMLUListElement;
  private liEls: NodeListOf<HTMLLIElement>;

  private activeTab: Tab|null = null;

  private resizeEventListener: EventListener;
  private scrollEventListener: EventListener;
  private linkEventListener: EventListener;

  constructor(el: HTMLElement) {
    this.el = el;

    this.linkEventListener = (e: PointerEvent) => {
      this.onTabClick(e);
    };

    this.ulEl = this.el.querySelector('.tab-list');
    this.liEls = this.ulEl.querySelectorAll('li');
    this.liEls.forEach((li: HTMLLIElement, index: number) => {
      this.tabs.push(new Tab(li, index));
      li.addEventListener('click', this.linkEventListener);
    });

    this.resize();
    this.resizeEventListener = () => {
      this.resize();
    };
    this.scrollEventListener = () => {
      this.scroll();
    };
    window.addEventListener('resize', this.resizeEventListener);
    window.addEventListener('scroll', this.scrollEventListener);
  }

  private scroll() {
    let activeTab = null;

    this.tabs.forEach((tab: Tab) => {
      const rect = tab.section.getBoundingClientRect() as DOMRect;
      if(rect.top <= 0 && rect.bottom > 0) {
        activeTab = tab;
      }
    });

    if(this.activeTab !== activeTab) {
      this.activeTab = activeTab;
      this.updateActiveTab();
    }
  }

  onTabClick(e) {
    const target = e.target as HTMLElement;
    const id = target.getAttribute('data-tab-id');
    const index = target.getAttribute('data-tab-index');
    const section = document.getElementById(id);
    const rect = section.getBoundingClientRect() as DOMRect;
    const top = Math.ceil(rect.top + document.documentElement.scrollTop);
    window.scroll({
      top: top
    });
    this.activeTab = this.tabs[index];
    this.updateActiveTab();
  }

  private updateActiveTab() {
    const w = this.activeTab ? this.activeTab.width : 0;
    const o = this.activeTab ? this.activeTab.offset : 0;
    this.el.style.setProperty('--tabs-indicator-width', `${w}`);
    this.el.style.setProperty('--tabs-indicator-offset', `${o}`);
    this.el.scroll({
      left: o,
      behavior: 'smooth'
    });
  }

  private updateTabMetrics() {
    this.tabs.forEach((tab: Tab) => {
      tab.updateMetrics();
    });
  }

  private resize() {
    this.updateTabMetrics();
    this.scroll();
  }

  public destroy() {
    window.removeEventListener('resize', this.resizeEventListener);
    window.removeEventListener('scroll', this.scrollEventListener);
  }

}
