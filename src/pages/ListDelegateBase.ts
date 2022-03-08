import globals from "../globals"

export default abstract class ListDelegateBase {

  tableClasses: string[] = ['ui-table']

  startDate: string = ''
  endDate: string = ''
  dateMode: string = ''
  fields: any[] = []
  sort: any[] = []
  offset: number

  filter: any = {}

  loadSavedFilter(attributes) {
    if(attributes) {
      this.filter = attributes
    }
  }

  clearFilter() {
    for(const field in this.filter) {
      this.filter[field] = ""
    }
  }

  t(value: string) {
    return globals.app.t(value)
  }

}