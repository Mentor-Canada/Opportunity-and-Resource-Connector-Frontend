import OptionCollection from 'Models/OptionCollection';

export default function () {
  return new OptionCollection()
    .add('app-yes')
    .add('app-no')
    .options;
}
