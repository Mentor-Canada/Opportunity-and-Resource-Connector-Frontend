import WindowInterface from 'Interfaces/WindowInterface';
import Search from 'Models/Search';
import BaseMixin from '../mixins/BaseMixin';
import HandlerAdapter from '../HandlerAdapter';

declare const window: WindowInterface;

const Handler: PageInterface = {
  routes(prefix: string): Array<any> {
    return [
      { path: '/index.html' },
      { path: `/${prefix}/handler` },
    ];
  },

  template: '<div></div>',

  mixins: [BaseMixin],

  async mounted() {
    const adapter = new HandlerAdapter();

    const search = new Search();
    search.attributes.zip = adapter.zipCode;
    search.attributes.distance = adapter.distance;
    search.attributes.partnerId = adapter.fwID2;

    if (adapter.email) search.attributes.email = adapter.email;
    if (adapter.firstName) search.attributes.firstName = adapter.firstName;
    if (adapter.lastName) search.attributes.lastName = adapter.lastName;
    if (adapter.delivery) search.attributes.delivery = adapter.delivery;
    if (adapter.age) search.attributes.age = adapter.age;
    if (adapter.type) search.attributes.typeOfMentoring = adapter.type;
    if (adapter.youth) search.attributes.youth = adapter.youth;
    await search.save();
    await this.router.replace(this.link(`become-a-mentor/programs/${adapter.zipCode}`));
  },
};

export default Handler;
