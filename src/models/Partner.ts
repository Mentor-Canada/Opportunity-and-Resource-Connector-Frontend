import WindowInterface from 'Interfaces/WindowInterface';

declare const window: WindowInterface;

class Attributes {
  public title;

  public partnerId;

  public serialize() {
    return {
      field_display_title: this.title,
      field_id: this.partnerId,
    };
  }
}

export default class Partner {
  public static url: string = '/a/node/partner';

  public id;

  public attributes = new Attributes();

  public type = 'node--partner';

  public async load() {
    const response = await window.api.get(`${Partner.url}/${this.id}`);
    this.attributes.title = response.data.data.attributes.field_display_title;
    this.attributes.partnerId = response.data.data.attributes.field_id;
  }

  public async remove() {
    const response = await window.api.delete(`${Partner.url}/${this.id}`);
  }

  public async save() {
    const doc: any = {};
    doc.type = this.type;
    doc.attributes = this.attributes.serialize();
    if (this.id) doc.id = this.id;
    const response = await window.api.request({
      method: this.id ? 'PATCH' : 'POST',
      url: this.id ? `${Partner.url}/${this.id}` : Partner.url,
      data: {
        data: doc,
      },
    });
    return response.data.data.id;
  }
}
