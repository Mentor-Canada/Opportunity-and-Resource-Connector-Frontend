interface PageInterface {
  routes(prefix: string): Array<any>,
  template: string,
  mixins: any[],
  [prop: string]: any
}
