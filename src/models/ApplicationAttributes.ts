import UserParams from '../UserParams';

export default class ApplicationAttributes {
  role: string = 'mentor';

  howDidYouHearAboutUs: string;

  howDidYouHearAboutUsOther: string;

  program: string;

  search: string;

  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  call: boolean = false;

  sms: boolean = false;

  status: string;

  created;

  createdDisplay;

  relayEmail;

  programTitle;

  searchId;

  programId;

  constructor(newApplication = false) {
    if (newApplication) {
      const params = UserParams.getInstance();
      this.firstName = params.firstName;
      this.lastName = params.lastName;
      this.phone = params.phone;
      this.email = params.email;
      this.call = params.call;
      this.sms = params.sms;
    }
  }

  serialize(): any {
    const params = UserParams.getInstance();
    params.firstName = this.firstName;
    params.lastName = this.lastName;
    params.email = this.email;
    params.phone = this.phone;
    params.call = this.call;
    params.sms = this.sms;
    return {
      role: this.role,
      how: this.howDidYouHearAboutUs,
      howOther: this.howDidYouHearAboutUsOther,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      call: this.call,
      sms: this.sms,
      searchId: this.searchId,
      programId: this.programId,
    };
  }
}
