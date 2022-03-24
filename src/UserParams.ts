export default class UserParams {
  firstName: string = '';

  lastName: string = '';

  email: string = '';

  zip: string = '';

  phone: string = '';

  call: boolean = false;

  sms: boolean = false;

  communityBased: boolean = false;

  siteBased: boolean = false;

  eMentoring: boolean = false;

  nationalEMentoring: boolean = false;

  private static instance: UserParams;

  private constructor() {}

  public static getInstance(): UserParams {
    if (!UserParams.instance) {
      UserParams.instance = new UserParams();
    }

    return UserParams.instance;
  }
}
