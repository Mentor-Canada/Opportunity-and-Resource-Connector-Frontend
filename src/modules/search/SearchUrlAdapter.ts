import searchOptionsTypeOfMentoring from "./searchOptionsTypeOfMentoring";
import searchOptionsYouthProgramServes from "./searchOptionsYouthProgramServes";
import searchOptionsDistance from "./searchOptionsDistance";
import searchOptionsAgesProgramServes from "./searchOptionsAgesProgramServes";
import searchOptionsFocusArea from "./searchOptionsFocusArea";

export default class SearchUrlAdapter {
  age: any[] = [];

  delivery: any[] = ['community', 'siteBased', 'eMentoring'];

  distance: string = '30';

  focus: any[] = [];

  grade: string = 'all';

  partnerId: string = 'all';

  role: string = 'mentor';

  typeOfMentoring: any[] = [];

  youth: any[] = [];

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

  getFocus(): any[] {
    const options = searchOptionsFocusArea('ca');
    const values = options.map((row) => row.value);
    const allOptionIndex = values.findIndex((value) => value === 'all');
    if (allOptionIndex !== -1) {
      values.splice(allOptionIndex, 1);
    }
    this.focus = values;

    const focus = [];
    const urlFocusParams = this.url.searchParams.get('focus');
    if (!urlFocusParams) return this.focus;
    const splitParams = urlFocusParams.split(',');
    splitParams.forEach((param) => {
      if (values.indexOf(`app-ca-program-focus-${param}`) !== -1) {
        focus.push(`app-ca-program-focus-${param}`);
      }
    });
    if (focus.length) {
      return focus;
    }
    return this.focus;
  }

  getAge(): any[] {
    const options = searchOptionsAgesProgramServes('ca');
    const values = options.map((row) => row.value);
    const allOptionIndex = values.findIndex((value) => value === 'all');
    if (allOptionIndex !== -1) {
      values.splice(allOptionIndex, 1);
    }
    this.age = values;

    const age = [];
    const urlAgeParams = this.url.searchParams.get('age');
    if (!urlAgeParams) return this.age;
    const splitParams = urlAgeParams.split(',');
    splitParams.forEach((param) => {
      if (values.indexOf(`app-ca-${param}`) !== -1) {
        age.push(`app-ca-${param}`);
      }
    });
    if (age.length) {
      return age;
    }
    return this.age;
  }

  getYouth(): any[] {
    const options = searchOptionsYouthProgramServes('ca');
    const values = options.map((row) => row.value);
    const allOptionIndex = values.findIndex((value) => value === 'all');
    if (allOptionIndex !== -1) {
      values.splice(allOptionIndex, 1);
    }
    this.youth = values;

    const youthTypes = [];
    const urlYouthServedParams = this.url.searchParams.get('youth');
    if (!urlYouthServedParams) return this.youth;
    const splitParams = urlYouthServedParams.split(',');
    splitParams.forEach((param) => {
      if (values.indexOf(`app-ca-${param}`) !== -1) {
        youthTypes.push(`app-ca-${param}`);
      }
    });
    if (youthTypes.length) {
      return youthTypes;
    }
    return this.youth;
  }

  getTypeOfMentoring(): any[] {
    const options = searchOptionsTypeOfMentoring();
    const values = options.map((row) => row.value);
    const allOptionIndex = values.findIndex((value) => value === 'all');
    if (allOptionIndex !== -1) {
      values.splice(allOptionIndex, 1);
    }
    this.typeOfMentoring = values;

    const mentoringTypes = [];
    const urlMentoringTypeParams = this.url.searchParams.get('typeOfMentoring');
    if (!urlMentoringTypeParams) return this.typeOfMentoring;
    const splitParams = urlMentoringTypeParams.split(',');
    splitParams.forEach((param) => {
      if (values.indexOf(`app-type-of-mentoring-${param}`) !== -1) {
        mentoringTypes.push(`app-type-of-mentoring-${param}`);
      }
    });
    if (mentoringTypes.length) {
      return mentoringTypes;
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
