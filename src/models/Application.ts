import WindowInterface from 'Interfaces/WindowInterface';
import ApplicationAttributes from 'Models/ApplicationAttributes';

declare const window: WindowInterface;

export default class Application {
  attributes: ApplicationAttributes = new ApplicationAttributes(true);

  id: string;

  url: string = '/a/app/inquiry';

  searchId: string;

  async save(): Promise<any> {
    const data: any = {
      data: {
        type: 'node--application',
        attributes: this.attributes.serialize(),
      },
      uilang: window.app.language.langcode,
    };

    await window.api.post(this.url, data);
  }

  async load(): Promise<any> {
    const response = await window.api.request({
      url: `${this.url}/${this.id}`,
    });
    this.searchId = response.data.data.relationships.field_search.data.id;
  }
}
