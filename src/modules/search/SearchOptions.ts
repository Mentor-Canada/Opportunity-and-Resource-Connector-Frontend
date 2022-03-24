import OptionCollection from 'Models/OptionCollection';
import globals from '../../globals';

export default class SearchOptions {
  howDidYouHearAboutUs: any[] = [];

  constructor() {
    this.howDidYouHearAboutUs = this.getHowDidYouHearAboutUs();
  }

  private getHowDidYouHearAboutUs() {
    return globals.app.bootstrap.country == 'ca' ? new OptionCollection()
      .add('')
      .add('app-ca-hear-about-us-mentoring-canada-website')
      .add('app-ca-hear-about-us-alberta-mentoring-partnership')
      .add('app-ca-hear-about-us-ontario-mentoring-coalition')
      .add('app-ca-hear-about-us-linkedin')
      .add('app-ca-hear-about-us-mentoring-partnership-in-my-province-region')
      .add('app-ca-hear-about-us-national-mentoring-month-materials')
      .add('other', 'app-other')
      .options
      : new OptionCollection()
        .add('')
        .add('app-us-hear-about-us-mentor-web-site')
        .add('app-us-hear-about-us-my-brothers-keeper-initiative')
        .add('app-us-hear-about-us-linkedin')
        .add('app-us-hear-about-us-nba-cares-mentoring-campaign')
        .add('app-us-hear-about-us-mentoring-partnership-in-my-state')
        .add('app-us-hear-about-us-coachers-mentoring-challenge')
        .add('app-us-hear-about-us-national-mentoring-month-materials-website')
        .add('app-us-hear-about-us-the-in-real-life-campaign')
        .add('app-us-hear-about-us-mentoring-flipped')
        .add('app-us-hear-about-us-mentor-gov')
        .add('app-us-hear-about-us-american-graduate')
        .add('app-us-hear-about-us-generation-to-generation')
        .add('app-us-hear-about-us-equality')
        .add('app-us-hear-about-us-yes-project')
        .add('other', 'app-other')
        .options;
  }
}
