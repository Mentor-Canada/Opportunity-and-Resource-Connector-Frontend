import WindowInterface from 'Interfaces/WindowInterface';
import Language from 'Models/Language';

declare const window: WindowInterface;

export default class LanguageCollection {
  public list: Language[] = [];

  async load() {
    const result = await window.api.get('/a/configurable_language/configurable_language');
    for (const row of result.data.data) {
      if (['und', 'zxx'].includes(row.attributes.drupal_internal__id)) {
        continue;
      }
      this.list.push(new Language(row));
    }
  }

  find(langcode: string): Language | null {
    for (const language of this.list) {
      if (language.langcode == langcode) {
        return language;
      }
    }
    if (langcode != 'en') return this.find('en');
  }

  getSecondaryLangcode(): string {
    for (const lang of this.list) {
      if (lang.langcode == 'en') continue;
      return lang.langcode;
    }
  }
}
