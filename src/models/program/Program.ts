import WindowInterface from 'Interfaces/WindowInterface';
import UserAccount from 'Models/UserAccount';
import { MultiLingualEntity } from 'Models/MultiLingualEntity';
import ProgramAttributes from 'Models/program/ProgramAttributes';
import LocalizedAttributes from 'Models/program/LocalizedAttributes';
import ProgramSettings from 'Models/program/ProgramSettings';
import ManagedFile from 'Models/ManagedFile';
import globals from '../../globals';

declare const window: WindowInterface;

export default class Program extends MultiLingualEntity {
  private type: string = 'program';

  public attributes: ProgramAttributes = new ProgramAttributes();

  private createUrl: string = '/a/app/program';

  public localizedAttributes = new Map<string, LocalizedAttributes>();

  public accounts: UserAccount[] = [];

  public id: string;

  public title: string;

  public displayTitle: string = '';

  public regionTitle: string = '';

  public organizationId: string;

  public organizationTitle: string;

  public director: boolean = false;

  public queryString: string = 'include=field_administrators,field_organization_entity,field_logo&fields[file--file]=uri,url';

  settings = new ProgramSettings();

  public mentorCityLogo = new ManagedFile();

  protected url = '/a/app/program';

  constructor(data?: any) {
    super();
    this.document.type = 'programs';
    window.app.languages.list.forEach((language) => {
      this.localizedAttributes[language.langcode] = new LocalizedAttributes();
    });
    if (data) {
      this.setData(data);
    }
  }

  getTitle(): string {
    const lang = globals.app.language.langcode;
    let title = this.localizedAttributes[lang].field_display_title;
    if (title == '' && lang != 'en') {
      title = this.localizedAttributes.en.field_display_title;
    }
    return title;
  }

  async load(): Promise<any> {
    await super.load();
    if (globals.app.user.id) {
      const response = await window.api.get(`/a/app/program/${this.document.id}/me`);
      this.director = response.data.data.director;
    }
  }

  setData(data: any, included: [] = []) {
    this.accounts = [];
    included.forEach((entity: any) => {
      if (entity.type == 'user--user') {
        this.accounts.push(new UserAccount(entity));
      }
      if (entity.type == 'node--organization') {
        this.attributes.organizationTitle = entity.attributes.field_display_title;
      }
    });

    this.displayTitle = data.attributes.field_display_title;
    this.title = data.attributes.field_display_title;
    this.document.id = data.id;

    this.attributes.deserialize(data);
    this.settings.load(data);
  }

  setIncluded(included: any) {
    const files = included?.filter((row) => row.type == 'file--file');
    if (files?.length) {
      this.managedFile.setData(files[0]);
      this.mentorCityLogo.setData(files[0]);
    }
  }

  setLocalizedAttributes(langcode: string, attributes: any) {
    this.localizedAttributes[langcode] = new LocalizedAttributes(attributes, langcode);
  }

  serializeRelationships(): any {
    const relationships: any = {
      field_administrators: {
        data: this.accounts,
      },
    };

    if (this.attributes.organizationId != '') {
      relationships.field_organization = {
        data: [{
          id: this.attributes.organizationId,
          type: 'node--organization',
        }],
      };
    }

    return { ...relationships, ...this.attributes.serializeRelationships() };
  }
}
