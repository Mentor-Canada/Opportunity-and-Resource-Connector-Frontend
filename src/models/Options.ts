import OptionCollection from 'Models/OptionCollection';

export default class Options {
  standing = new OptionCollection()
    .add('app-all', '')
    .add('app-allowed')
    .add('app-pending')
    .add('app-suspended')
    .options;
}
