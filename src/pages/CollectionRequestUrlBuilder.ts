import globals from "../globals"

export default class CollectionRequestUrlBuilder {

  private _path: string
  public params: any = {}

  path(path: string) {
    this._path = path
    return this
  }

  sort(values: any[]) {
    this.params['sort'] = values.map(function (sort) {
      let field = sort.field.replace(/attributes\./, '')
      field = (sort.direction === 'desc' ? '-' : '') + field
      return field
    }).join(',')
    return this
  }

  include(value: string) {
    this.params['include'] = value
    return this
  }

  filter(key: string, value: string) {
    if(value) {
      this.params[`filter[${key}]`] = value
    }
    return this
  }

  limit(value: string) {
    this.params['page[limit]'] = value
    return this
  }

  offset(value: number) {
    this.params['page[offset]'] = value > 0 ? value : 0
    return this
  }

  start(value: string, timestamp = true) {
    if(value && value != '') {
      let time = this.getTime(value)
      this.params['filter[start-date-filter][condition][path]'] = 'created'
      this.params['filter[start-date-filter][condition][value]'] = time
      this.params['filter[start-date-filter][condition][operator]'] = '>='
    }
    return this
  }

  end(value: string, timestamp = true) {
    if(value && value != '') {
      let time = this.getTime(value) + (24 * 60 * 60)
      this.params['filter[end-date-filter][condition][path]'] = 'created'
      this.params['filter[end-date-filter][condition][value]'] =  time
      this.params['filter[end-date-filter][condition][operator]'] = '<='
    }
    return this
  }

  build(): string {
    let query = new URLSearchParams(this.params)
    let queryString = query.toString()
    if(queryString != "") queryString = `?${queryString}`
    let components = []
    components.push(API_URL)
    if(globals.app.languages.list.length > 1) {
      components.push(globals.app.language.langcode)
    }
    components.push(`a/${this._path}${queryString}`)
    let urlString = components.join('/')
    return urlString
  }

  private getTime(value: any): number {
    if(value.split) {
      let components = value.split('-')
      let utcDate = new Date(Date.UTC(Number(components[0]), Number(components[1]) - 1, Number(components[2])))
      return utcDate.getTime() / 1000
    }
    return value
  }

  addFilter(field: string, value: string): CollectionRequestUrlBuilder {
    if(value == 'app-all') value = ''
    if(value == 'app-pending') value = 'IS NULL'
    if(value) {
      this.params[`filter[${field}]`] = JSON.stringify(value)
    }
    return this
  }

}
