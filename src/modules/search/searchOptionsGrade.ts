import gradeOptions from 'Models/program/GradeOptions';
import globals from '../../globals';

export default function searchOptionsGrade() {
  const optionsGrades = gradeOptions();
  optionsGrades.unshift({ value: 'all', name: globals.app.t('app-all') });
  return optionsGrades;
}
