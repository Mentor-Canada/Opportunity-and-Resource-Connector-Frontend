import { JSONAPIDocument } from 'Models/JSONAPIDocument';
import WindowInterface from 'Interfaces/WindowInterface';
import SearchAttributes from 'Models/SearchAttributes';
import UserParams from '../UserParams';

declare const window: WindowInterface;

export default class Search {
  public attributes: SearchAttributes = new SearchAttributes();

  public id;

  private type: string = 'node--search';

  private url: string = 'a/app/search';

  async save(): Promise<any> {
    const doc = new JSONAPIDocument();
    doc.type = this.type;
    doc.attributes = this.attributes.serialize();
    doc.attributes.title = doc.attributes.field_email;
    const response = await window.api.request({
      method: 'POST',
      url: this.url,
      data: {
        data: doc,
      },
    });
    this.id = response.data.data.id;
    return response.data.data.id;
  }

  async update() {
    const doc = new JSONAPIDocument();
    doc.type = this.type;
    doc.id = this.id;
    doc.attributes = this.attributes.serialize();
    await window.api.request({
      method: 'PATCH',
      url: `${this.url}/${this.id}`,
      data: {
        data: doc,
      },
    });
  }

  async load(id: string): Promise<any> {
    this.id = id;
    const response = await window.api.request({
      url: `${this.url}/${id}`,
    });
    this.attributes.load(response.data);
  }
}
