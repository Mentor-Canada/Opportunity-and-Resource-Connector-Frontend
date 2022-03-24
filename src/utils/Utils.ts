import WindowInterface from 'Interfaces/WindowInterface';

declare const window: WindowInterface;

export default class Utils {
  static getIncluded(included, id) {
    if (!included || !id) return null;
    for (const row of included) {
      if (row.id == id) {
        return row;
      }
    }
  }

  static addLangToLink(link) {
    return `/${window.app.language.langcode}${link}`;
  }
}
