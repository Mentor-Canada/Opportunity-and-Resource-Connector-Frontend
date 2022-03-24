import WindowInterface from 'Interfaces/WindowInterface';
import UserAccount from 'Models/UserAccount';
import GooglePlace from 'Models/GooglePlace';
import { MultiLingualEntity } from 'Models/MultiLingualEntity';
import globals from '../globals';

declare const window: WindowInterface;

class Attributes {
  public id: string = '';

  public title: string = '';

  public country: string = 'Canada';

  public hasLocation: string = '';

  public location: GooglePlace = new GooglePlace();

  public standing: string = '';

  public legalName: string = '';

  public type: string = '';

  public typeOther: string = '';

  public taxStatus: string = '';

  public taxStatusOther: string = '';

  public contactFirstName: string = '';

  public contactLastName: string = '';

  public contactPosition: string = '';

  public contactPositionOther: string = '';

  public contactPhone: string = '';

  public contactAlternatePhone: string = '';

  public contactEmail: string = '';

  public website: string = '';

  public feedback: string = '';

  public ready: string = '';

  public mtg_enabled: boolean = false;

  public field_mtg: any = {};

  public mentor_city_enabled: boolean = false;

  public bbbsc_enabled: boolean = false;

  serialize() {
    return {
      field_ready: this.ready,
    };
  }

  serializeAdditional() {
    return {
      location: this.location.serialize(),
      website: this.website,
      contactPhone: this.contactPhone,
      contactAlternatePhone: this.contactAlternatePhone,
      contactFirstName: this.contactFirstName,
      contactLastName: this.contactLastName,
      legalName: this.legalName,
      feedback: this.feedback,
      type: this.type,
      typeOther: this.typeOther,
      taxStatus: this.taxStatus,
      taxStatusOther: this.taxStatusOther,
      contactPosition: this.contactPosition,
      contactPositionOther: this.contactPositionOther,
      mentor_city_enabled: this.mentor_city_enabled,
      bbbsc_enabled: this.bbbsc_enabled,
      hasLocation: this.hasLocation,
      mtg_enabled: this.mtg_enabled,
      contactEmail: this.contactEmail,
    };
  }
}

class LocalizedAttributes {
  public field_display_title: string = '';

  public field_description: string = '';

  constructor(data?: any, langcode) {
    if (data) {
      if (data.title) this.field_display_title = data.title[langcode];
      if (data.description) this.field_description = data.description[langcode];
    }
  }
}

export default class Organization extends MultiLingualEntity implements EntityInterface, MultiLingualEntityInterface {
  private type: string = 'organization';

  protected url: string = '/a/app/organization';

  private createUrl: string = '/a/app/organization';

  public queryString: string = 'include=field_administrators,field_logo&fields[file--file]=uri,url';

  public attributes: Attributes = new Attributes();

  public localizedAttributes = new Map<string, LocalizedAttributes>();

  public accounts: UserAccount[] = [];

  public director: boolean = false;

  constructor(data?: JSONAPIDocumentInterface) {
    super();
    this.document.type = `node--${this.type}`;
    window.app.languages.list.forEach((language) => {
      this.localizedAttributes[language.langcode] = new LocalizedAttributes();
    });
    if (data) {
      this.setData(data);
    }
  }

  async load(): Promise<any> {
    await super.load();
    if (globals.app.user.id) {
      const response = await window.api.get(`/a/app/organization/${this.document.id}/me`);
      this.director = response.data.data.director;
    }
  }

  setData(data: any) {
    this.localizedAttributes[data.attributes.langcode].title = data.attributes.title;
    this.attributes.title = data.attributes.title;
    this.attributes.standing = data.attributes.field_standing;
    this.attributes.contactEmail = data.attributes.email;
    this.document.attributes = {};
    this.document.attributes.title = data.attributes.title;
    this.attributes.id = data.id;
    this.document.id = data.id;

    this.attributes.legalName = data.attributes.legal_name;
    this.attributes.type = data.attributes.type;
    this.attributes.typeOther = data.attributes.other_type;
    this.attributes.taxStatus = data.attributes.tax_status;
    this.attributes.taxStatusOther = data.attributes.other_tax_status;

    this.attributes.contactFirstName = data.attributes.first_name;
    this.attributes.contactLastName = data.attributes.last_name;
    this.attributes.contactPosition = data.attributes.position;
    this.attributes.contactPositionOther = data.attributes.other_position;
    this.attributes.contactPhone = data.attributes.phone;
    this.attributes.contactAlternatePhone = data.attributes.alt_phone;

    this.attributes.hasLocation = data.attributes.has_location == '1' ? 'yes' : 'no';

    this.attributes.website = data.attributes.website;
    this.attributes.feedback = data.attributes.feedback;

    this.attributes.ready = data.attributes.field_ready;
    this.attributes.field_mtg = data.attributes.field_mtg;
    this.attributes.mtg_enabled = data.attributes.mtg_enabled == '1';
    this.attributes.mentor_city_enabled = data.attributes.mentor_city_enabled == '1';
    this.attributes.bbbsc_enabled = data.attributes.bbbsc_enabled == '1';
    this.attributes.location = new GooglePlace(data.attributes.location);
  }

  setLocalizedAttributes(langcode: string, attributes: any) {
    this.localizedAttributes[langcode] = new LocalizedAttributes(attributes, langcode);
  }

  serializeRelationships(): any {
    const result: any = {};
    result.field_administrators = {
      data: this.accounts,
    };
    return result;
  }

  protected setIncluded(included: any) {
    this.accounts = [];
    included?.forEach((row) => {
      if (row.type == 'node--organization') return;
      if (row.type == 'file--file') return;
      this.accounts.push(new UserAccount(row));
    });
    const files = included?.filter((row) => row.type == 'file--file');
    if (files?.length) {
      this.managedFile.setData(files[0]);
    }
  }

  public getTitle(): string {
    const lang = globals.app.language.langcode;
    let title = this.localizedAttributes[lang].field_display_title || '';
    if (title == '' && lang != 'en') {
      title = this.localizedAttributes.en.field_display_title;
    }
    return title;
  }
}
