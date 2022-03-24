import WindowInterface from 'Interfaces/WindowInterface';

declare const window: WindowInterface;

class Attributes {
  public entityId = '';

  public userId = '';

  public status = '';

  public type = 'organization';

  public notes = '';

  serialize() {
    return {
      field_status: this.status,
      field_notes: this.notes,
    };
  }

  serializeRelationships(): any {
    const relationships: any = {
      field_approval_entity: {
        data: [{
          type: `node--${this.type}`,
          id: this.entityId,
        }],
      },
    };
    return relationships;
  }
}

export default class Approval {
  public attributes = new Attributes();

  public id: string;

  load() {
    return new Promise(async (resolve, reject) => {
      const params = new URLSearchParams();
      params.set('filter[field_approval_entity.id]', this.attributes.entityId);
      params.set('filter[field_user_entity.id]', this.attributes.userId);
      const response = await window.api.get(`/a/node/approval?${params.toString()}`);
      if (response.data.data.length > 0) {
        const row = response.data.data[0];
        this.id = row.id;
        this.attributes.entityId = row.relationships.field_approval_entity.data.id;
        this.attributes.userId = row.relationships.field_user_entity.data.id;
        this.attributes.status = row.attributes.field_status;
        this.attributes.notes = row.attributes.field_notes;
      }
      resolve();
    });
  }

  async save() {
    let response: any;

    if (this.attributes.status != '') {
      const data: any = {
        data: {
          type: 'node--approval',
          attributes: this.attributes.serialize(),
          relationships: this.attributes.serializeRelationships(),
        },
        uilang: window.app.language.langcode,
      };
      let url = '/a/app/approval';
      if (!this.id) {
        response = await window.api.post(url, data);
      } else {
        url = `${url}/${this.id}`;
        data.data.id = this.id;
        response = await window.api.patch(url, data);
      }
      this.id = response.data.data.id;
    } else if (this.id) {
      await window.api.delete(`/a/app/approval/${this.id}`);
    }
  }
}
