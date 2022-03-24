import format from 'date-fns/format';
import frLocale from 'date-fns/locale/fr-CA';
import globals from '../globals';

export default class DateStringBuilder {
  private dateOptions: any = {};

  private date: Date;

  private _formats: any = {};

  public unixtimestamp(value: any): DateStringBuilder {
    this.date = new Date(value * 1000);
    return this;
  }

  public format(value: string, langcode: string): DateStringBuilder {
    this._formats[langcode] = value;
    return this;
  }

  public build(): string {
    const { langcode } = globals.app.language;
    let formatString = this._formats[langcode];
    if (!formatString) {
      formatString = this._formats.en;
    }
    if (langcode == 'fr') {
      this.dateOptions.locale = frLocale;
    }
    return format(this.date, formatString, this.dateOptions);
  }
}
