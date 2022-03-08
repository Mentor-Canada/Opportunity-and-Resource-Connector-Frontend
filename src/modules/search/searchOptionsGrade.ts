import globals from "../../globals"
import gradeOptions from "Models/program/GradeOptions"

export default function searchOptionsGrade() {
  let optionsGrades = gradeOptions()
  optionsGrades.unshift({value: 'all', name: globals.app.t('app-all')})
  return optionsGrades
}