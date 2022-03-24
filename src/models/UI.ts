import globals from '../globals';

export default class UI {
  searches() {
    return globals.app.user.account?.data.attributes.field_global_administrator;
  }

  feedback() {
    return globals.app.user.account?.data.attributes.field_global_administrator;
  }

  accounts() {
    return globals.app.user.account?.data.attributes.field_global_administrator;
  }

  partners() {
    return globals.app.user.account?.data.attributes.field_global_administrator;
  }

  regions() {
    return globals.app.bootstrap.country == 'us'
      && globals.app.user.account?.data.attributes.field_global_administrator;
  }

  mentorcity() {
    return globals.app.bootstrap.country == 'ca';
  }
}
