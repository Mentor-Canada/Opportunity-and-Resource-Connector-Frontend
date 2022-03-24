import WindowInterface from 'Interfaces/WindowInterface';

import LocalizedString from 'Models/LocalizedString';
import RequestBuilder from 'Models/RequestBuilder';

declare const window: WindowInterface;

export default class Language {
  public langcode;

  public label;

  public strings;

  constructor(jsonApiDocument: any) {
    this.langcode = jsonApiDocument.attributes.drupal_internal__id;
    this.label = jsonApiDocument.attributes.label;
  }

  async load() {
    if (!this.strings) {
      this.strings = [];
      const result = await window.api.get(new RequestBuilder()
        .langcode(this.langcode)
        .resource('a/utils/strings')
        .build());
      for (const row of result.data.data) {
        this.strings.push(new LocalizedString(row));
      }
    }
  }
}
