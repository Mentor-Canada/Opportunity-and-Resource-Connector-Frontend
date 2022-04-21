import SearchAttributes from "Models/SearchAttributes";

export default class SearchQueryParams {

  communityBased: boolean = true;

  siteBased: boolean = true;

  eMentoring: boolean = true;

  distance: number = 100;

  age: string = 'all';

  grade: string = 'all';

  focus: string = 'all';

  youth: string = 'all';

  type: string = 'all';

  static createFromAttributes(attributes: SearchAttributes): SearchQueryParams {
    const params = new SearchQueryParams();
    params.distance = parseInt(attributes.distance);
    params.communityBased = attributes.delivery.indexOf(SearchAttributes.COMMUNITY_BASED_DELIVERY) !== -1;
    params.siteBased = attributes.delivery.indexOf(SearchAttributes.SITE_BASED_DELIVERY) !== -1;
    params.eMentoring = attributes.delivery.indexOf(SearchAttributes.E_MENTORING_DELIVERY) !== -1;
    params.age = attributes.age;
    params.grade = attributes.grade;
    params.focus = attributes.focus;
    params.youth = attributes.youth;
    params.type = attributes.typeOfMentoring;
    return params;
  }
}
