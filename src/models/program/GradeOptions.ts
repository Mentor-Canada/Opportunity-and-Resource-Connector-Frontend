import OptionCollection from 'Models/OptionCollection';

export default function gradeOptions() {
  return new OptionCollection()
    .add('app-grade-k-5')
    .add('app-grade-6-8')
    .add('app-grade-9-12')
    .add('app-grade-college')
    .options;
}
