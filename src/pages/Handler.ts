import BaseMixin from "../mixins/BaseMixin"
import WindowInterface from "Interfaces/WindowInterface"
import Search from "Models/Search"
import HandlerAdapter from "../HandlerAdapter"

declare const window: WindowInterface

let Handler: PageInterface = {
  routes(prefix: string): Array<any> {
    return [
      { path: `/index.html` },
      { path: `/${prefix}/handler` }
    ]
  },
  
  template: "<div></div>",

  mixins: [BaseMixin],

  async mounted() {
    const adapter = new HandlerAdapter()

    let search = new Search()
    search.attributes.zip = adapter.zipCode
    search.attributes.distance = adapter.distance
    search.attributes.partnerId = adapter.fwID2

    if(adapter.email) search.attributes.email = adapter.email
    if(adapter.firstName) search.attributes.firstName = adapter.firstName
    if(adapter.lastName) search.attributes.lastName = adapter.lastName
    if(adapter.delivery) search.attributes.delivery = adapter.delivery
    if(adapter.age) search.attributes.age = adapter.age
    if(adapter.type) search.attributes.typeOfMentoring = adapter.type
    if(adapter.youth) search.attributes.youth = adapter.youth
    await search.save()
    await this.router.replace(this.link(`search/${search.id}`))
  }
}

export default Handler
