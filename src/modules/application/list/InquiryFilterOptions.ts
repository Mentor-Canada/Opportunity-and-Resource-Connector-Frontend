import OptionCollection from 'Models/OptionCollection';

export default class InquiryFilterOptions {
  roles = new OptionCollection()
    .add('')
    .add('mentor', 'Mentor')
    .add('mentee', window.app.t('app-mentee'))
    .options;

  status = new OptionCollection()
    .add('')
    .add('app-contacted')
    .add('app-un-contacted')
    .options;

  yesOrNo = new OptionCollection()
    .add('')
    .add('app-yes')
    .add('app-no')
    .options;
}
