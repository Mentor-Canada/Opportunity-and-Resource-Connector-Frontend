import UserParams from '../UserParams';
import searchOptionsFocusArea from '../modules/search/searchOptionsFocusArea';
import searchOptionsAgesProgramServes from '../modules/search/searchOptionsAgesProgramServes';
import searchOptionsYouthProgramServes from '../modules/search/searchOptionsYouthProgramServes';
import searchOptionsTypeOfMentoring from '../modules/search/searchOptionsTypeOfMentoring';

export default class SearchAttributes {
  static readonly COMMUNITY_BASED_DELIVERY = 'community';

  static readonly SITE_BASED_DELIVERY = 'siteBased';

  static readonly E_MENTORING_DELIVERY = 'eMentoring';

  public zip: string;

  public role: string = 'mentor';

  public distance: string = '30';

  public typeOfMentoring: any[] = [];

  public age: any[] = [];

  public grade: string = 'all';

  public youth: any[] = [];

  public focus: any[] = [];

  public howDidYouHearAboutUs: string;

  public howDidYouHearAboutUsOther: string;

  public lat: string;

  public lng: string;

  public partnerId: string = '1';

  public national: boolean = false;

  public firstName: string = '';

  public lastName: string = '';

  public email: string = '';

  public id: string;

  public delivery = [];

  loadUserParams() {
    const params = UserParams.getInstance();
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.email = params.email;
    this.zip = params.zip;
    if (params.communityBased) this.delivery.push(SearchAttributes.COMMUNITY_BASED_DELIVERY);
    if (params.siteBased) this.delivery.push(SearchAttributes.SITE_BASED_DELIVERY);
    if (params.eMentoring) this.delivery.push(SearchAttributes.E_MENTORING_DELIVERY);
    this.national = params.nationalEMentoring;
  }

  updateUserParams() {
    const params = UserParams.getInstance();
    params.firstName = this.firstName;
    params.lastName = this.lastName;
    params.email = this.email;
    params.zip = this.zip;
    params.communityBased = this.delivery.indexOf(SearchAttributes.COMMUNITY_BASED_DELIVERY) != -1;
    params.siteBased = this.delivery.indexOf(SearchAttributes.SITE_BASED_DELIVERY) != -1;
    params.eMentoring = this.delivery.indexOf(SearchAttributes.E_MENTORING_DELIVERY) != -1;
    params.nationalEMentoring = this.national;
  }

  load(row: any) {
    const { attributes } = row.data;
    this.id = attributes.id;

    if(attributes.distance) {
      this.distance = attributes.distance;
    }

    if(attributes.typeOfMentoring) {
      this.typeOfMentoring = JSON.parse(attributes.typeOfMentoring)[0];
    }

    if(attributes.age) {
      this.age = JSON.parse(attributes.age)[0];
    }

    if(attributes.youth) {
      this.youth = JSON.parse(attributes.youth)[0];
    }

    if(attributes.focus) {
      this.focus = JSON.parse(attributes.focus)[0];
    }

    if(attributes.grade) {
      this.grade = JSON.parse(attributes.grade)[0];
    }

    this.national = attributes.nationWideEMentoring == '1';

    this.delivery = [];
    if (attributes.communityBasedDelivery == '1') {
      this.delivery.push(SearchAttributes.COMMUNITY_BASED_DELIVERY);
    }
    if (attributes.siteBasedDelivery == '1') {
      this.delivery.push(SearchAttributes.SITE_BASED_DELIVERY);
    }
    if (attributes.eMentoringDelivery == '1') {
      this.delivery.push(SearchAttributes.E_MENTORING_DELIVERY);
    }
  }

  getQueryString(): string {
    const params: any = {};
    if (this.distance != '30') {
      params.distance = this.distance;
    }
    if (this.delivery.length != 3) {
      if (this.delivery.indexOf(SearchAttributes.COMMUNITY_BASED_DELIVERY) !== -1) {
        params.communityBased = 1;
      }
      if (this.delivery.indexOf(SearchAttributes.SITE_BASED_DELIVERY) !== -1) {
        params.siteBasedDelivery = 1;
      }
      if (this.delivery.indexOf(SearchAttributes.E_MENTORING_DELIVERY) !== -1) {
        params.eMentoring = 1;
      }
    }
    const focusOptions = searchOptionsFocusArea('ca');
    if (Array.isArray(this.focus) && this.focus.length !== focusOptions.length - 1) {
      params.focus = [];
      this.focus.forEach((focusArea) => {
        params.focus.push(focusArea.replace('app-ca-program-focus-', ''));
      });
    }
    const ageOptions = searchOptionsAgesProgramServes('ca');
    if (Array.isArray(this.age) && this.age.length !== ageOptions.length - 1) {
      params.age = [];
      this.age.forEach((ageServed) => {
        params.age.push(ageServed.replace('app-ca-', ''));
      });
    }
    const youthOptions = searchOptionsYouthProgramServes('ca');
    if (Array.isArray(this.youth) && this.youth.length !== youthOptions.length - 1) {
      params.youth = [];
      this.youth.forEach((youthServed) => {
        params.youth.push(youthServed.replace('app-ca-', ''));
      });
    }
    const mentoringTypeOptions = searchOptionsTypeOfMentoring();
    if (Array.isArray(this.typeOfMentoring) && this.typeOfMentoring.length !== mentoringTypeOptions.length - 1) {
      params.typeOfMentoring = [];
      this.typeOfMentoring.forEach((mentoringType) => {
        params.typeOfMentoring.push(mentoringType.replace('app-type-of-mentoring-', ''));
      });
    }
    return new URLSearchParams(params).toString();
  }

  serialize() {
    if (this.national) {
      this.delivery = [SearchAttributes.E_MENTORING_DELIVERY];
    }
    return {
      field_first_name: this.firstName,
      field_last_name: this.lastName,
      field_email: this.email,
      field_zip: !this.national ? this.zip : 'app-national',
      field_distance: this.distance,
      field_type_of_mentoring: this.typeOfMentoring,
      field_youth_age: this.age,
      field_youth: this.youth,
      field_role: this.role,
      field_focus: this.focus,
      field_how_did_you_hear_about_us: this.howDidYouHearAboutUs,
      field_how_did_you_hear_other: this.howDidYouHearAboutUsOther,
      field_partner_id: this.partnerId,
      field_youth_grade: this.grade,
      delivery: this.delivery,
    };
  }
}
