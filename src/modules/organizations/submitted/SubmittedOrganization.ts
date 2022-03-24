import globals from '../../../globals';

export default class SubmittedOrganization {
  title;

  contactEmail;

  async load(uuid, langcode) {
    const result = await globals.api.get(`a/app/organization/${uuid}/submitted?uilang=${globals.app.language.langcode}`);
    this.title = result.data.data.title;
    this.contactEmail = result.data.data.email;
  }
}
