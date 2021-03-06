export default class RangeAdapter {
  public static readonly DAY_IN_SECONDS = (24 * 60 * 60 * 1000);

  public start;

  public end;

  constructor(params) {
    if (!this[params.type]) {
      console.error(`Unknown type: ${params.type}`);
      return;
    }
    this[params.type](params);
  }

  private lastdays(params) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateOffset = RangeAdapter.DAY_IN_SECONDS * params.value;

    this.start = new Date(today.getTime() - dateOffset);

    if (params.value == 1) {
      /** yesterday * */
      this.end = new Date(today.getTime() - RangeAdapter.DAY_IN_SECONDS);
    } else {
      this.end = new Date();
    }
  }

  private range(params) {
    this.start = new Date(this.parseDateString(params.datepickerValue.dateRange.start));
    this.end = new Date(this.parseDateString(params.datepickerValue.dateRange.end) + RangeAdapter.DAY_IN_SECONDS - 1);
  }

  private parseDateString(str) {
    const components = str.split('/');
    const year = components[2];
    const month = components[1];
    const day = components[0];
    return Date.parse(`${year}-${month}-${day}`);
  }
}
