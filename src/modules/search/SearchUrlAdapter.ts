import searchOptionsTypeOfMentoring from "./searchOptionsTypeOfMentoring";
import searchOptionsYouthProgramServes from "./searchOptionsYouthProgramServes";
import searchOptionsDistance from "./searchOptionsDistance";
import searchOptionsAgesProgramServes from "./searchOptionsAgesProgramServes";
import searchOptionsFocusArea from "./searchOptionsFocusArea";

export default class SearchUrlAdapter {
  age: string = 'all';

  delivery: any[] = ['community', 'siteBased', 'eMentoring'];

  distance: string = '30';

  focus: string = 'all';

  grade: string = 'all';

  partnerId: string = 'all';

  role: string = 'mentor';

  typeOfMentoring: string = 'all';

  youth: string = 'all';

  private url: URL;

  constructor() {
    this.url = new URL(window.location.href);
    this.role = this.getRole();
    this.delivery = this.getDelivery();
    this.focus = this.getFocus();
    this.age = this.getAge();
    this.youth = this.getYouth();
    this.typeOfMentoring = this.getTypeOfMentoring();
    this.distance = this.getDistance();
  }

  getRole(): string {
    if (this.url.pathname.search('become-a-mentor') === -1) {
      return 'mentee';
    }
    return this.role;
  }

  getDelivery(): any[] {
    const delivery = [];
    if (this.url.searchParams.get('community') === "1") {
      delivery.push('community');
    }
    if (this.url.searchParams.get('siteBased') === "1") {
      delivery.push('siteBased');
    }
    if (this.url.searchParams.get('eMentoring') === "1") {
      delivery.push('eMentoring');
    }
    if (delivery.length) {
      return delivery;
    }
    return this.delivery;
  }

  getFocus(): string {
    const options = searchOptionsFocusArea('ca');
    const values = options.map((row) => row.value);
    const param = this.url.searchParams.get('focus');
    const value = `app-ca-program-focus-${param}`;
    if (values.indexOf(value) !== -1) {
      return value;
    }
    return this.focus;
  }

  getAge(): string {
    const options = searchOptionsAgesProgramServes('ca');
    const values = options.map((row) => row.value);
    const param = this.url.searchParams.get('age');
    const value = `app-ca-${param}`;
    if (values.indexOf(value) !== -1) {
      return value;
    }
    return this.age;
  }

  getYouth(): string {
    const options = searchOptionsYouthProgramServes('ca');
    const values = options.map((row) => row.value);
    const param = this.url.searchParams.get('youth');
    const value = `app-ca-${param}`;
    if (values.indexOf(value) !== -1) {
      return value;
    }
    return this.youth;
  }

  getTypeOfMentoring(): string {
    const options = searchOptionsTypeOfMentoring();
    const values = options.map((row) => row.value);
    const typeOfMentoring = this.url.searchParams.get('type');
    const value = `app-type-of-mentoring-${typeOfMentoring}`;
    if (values.indexOf(value) !== -1) {
      return value;
    }
    return this.typeOfMentoring;
  }

  getDistance(): string {
    const distance = this.url.searchParams.get('distance');
    const distanceOptions = searchOptionsDistance('ca');
    const distanceOptionValues = distanceOptions.map((row) => row.value);
    if (distanceOptionValues.indexOf(distance) !== -1) {
      return distance;
    }
    return this.distance;
  }
}
