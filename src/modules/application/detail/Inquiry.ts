import ApplicationAttributes from 'Models/ApplicationAttributes';
import { format } from 'date-fns';
import globals from '../../../globals';

export default class Inquiry {
  id;

  attributes: ApplicationAttributes = new ApplicationAttributes(false);

  async load() {
    const response = await globals.api.get(`/a/app/inquiry/${this.id}?uilang=${globals.app.language.langcode}`);
    this.attributes.firstName = response.data.data.firstName;
    this.attributes.lastName = response.data.data.lastName;
    this.attributes.email = response.data.data.email;
    this.attributes.phone = response.data.data.phone;
    this.attributes.call = response.data.data.voice;
    this.attributes.sms = response.data.data.sms;
    this.attributes.howDidYouHearAboutUs = response.data.data.how;
    this.attributes.howDidYouHearAboutUsOther = response.data.data.howOther;
    this.attributes.status = response.data.data.status;
    this.attributes.role = response.data.data.role;
    this.attributes.relayEmail = response.data.data.relayEmail;
    this.attributes.programTitle = response.data.data.programTitle;
    this.attributes.created = response.data.data.created;
    const date = new Date(this.attributes.created * 1000);
    this.attributes.createdDisplay = format(date, "yyyy-MM-dd HH'h'mm");
  }
}
