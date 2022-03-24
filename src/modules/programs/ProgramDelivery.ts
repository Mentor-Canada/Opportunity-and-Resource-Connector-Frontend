import GooglePlace from 'Models/GooglePlace';

export default class ProgramDelivery {
  community = false;

  siteBased = false;

  eMentoring = false;

  eMentoringServiceArea = '';

  communityLocations = [];

  siteBasedLocations = [];

  eMentoringLocations = [];

  serialize() {
    return {
      community: this.community,
      siteBased: this.siteBased,
      eMentoring: this.eMentoring,
      nationWideEMentoring: this.eMentoringServiceArea == 'app-nationwide',
      communityLocations: this.communityLocations.map((location) => location.serialize()),
      siteBasedLocations: this.siteBasedLocations.map((location) => location.serialize()),
      eMentoringLocations: this.eMentoringLocations.map((location) => location.serialize()),
    };
  }

  deserialize(attributes) {
    this.community = attributes.communityBased == '1';
    attributes.communityBasedLocations?.forEach((row) => {
      this.communityLocations.push(new GooglePlace(row));
    });
    this.siteBased = attributes.siteBased == '1';
    attributes.siteBasedLocations?.forEach((row) => {
      this.siteBasedLocations.push(new GooglePlace(row));
    });
    this.eMentoring = attributes.eMentoring == '1';
    attributes.eMentoringLocations?.forEach((row) => {
      this.eMentoringLocations.push(new GooglePlace(row));
    });
    this.eMentoringServiceArea = attributes.nationWideEMentoring == '1' ? 'app-nationwide' : 'app-specific-service-area';
  }
}
