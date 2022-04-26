import OptionCollection from 'Models/OptionCollection';
import CheckboxFieldAdapter from 'Models/CheckboxFieldAdapter';
import ProgramFields from '../../modules/programs/list/ProgramFields';
import ProgramDelivery from '../../modules/programs/ProgramDelivery';

export default class ProgramAttributes {
  public title: string = '';

  public standing: string = '';

  public organizationId: string = '';

  public languages: Array<string> = [];

  public facebook: string = '';

  public twitter: string = '';

  public website: string = '';

  public instagram: string = '';

  public typesOfMentoring = [];

  public typesOfMentoringOther: string = '';

  public focusArea: string = '';

  public focusAreaOther: string = '';

  public primaryMeetingLocation: string = '';

  public primaryMeetingLocationOther: string = '';

  public programOperatedThrough = [];

  public programOperatedThroughOther: string = '';

  public programAdministratorName: string = '';

  public programAdministratorRole: string = '';

  public programAdministratorContact: string = '';

  public programHowAreMeetingsScheduled = [];

  public programHowAreMeetingsScheduledOther: string = '';

  public programGendersProgramServes = [];

  public programGendersProgramServesOthers: string = '';

  public programAgesProgramServes = [];

  public programAgesProgramServesOthers: string = '';

  public field_program_grades_served: OptionCollection[] = [];

  public programFamilyStructuresProgramServes = [];

  public programFamilyStructuresProgramServesOther: string = '';

  public programYouthServedProgramServes = [];

  public programYouthServedProgramServesOther: string = '';

  public programEstimatedNumberOfYouthPerYear: string = '';

  public programEstimatedNumberOfMenteesOnWaitingList: string = '';

  public programTargetMentorPopulationGenders = [];

  public programTargetMentorPopulationGendersOther: string = '';

  public programTargetMentorPopulationAges = [];

  public programTargetMentorPopulationAgesOther: string = '';

  public programMentoringRelationshipCommitmentMonths: string = '';

  public programMentoringRelationshipCommitmentMonthsOther: string = '';

  public programMentoringRelationshipCommitmentFrequency: string = '';

  public programMentoringRelationshipCommitmentFrequencyOther: string = '';

  public programMentoringRelationshipCommitmentHoursPerWeek: string = '';

  public programMentoringRelationshipCommitmentHoursPerWeekOther: string = '';

  public programScreensMentors: string = '';

  public programScreensMentorsHow = [];

  public programScreensMentees: string = '';

  public programScreensMenteesHow = [];

  public programProvidesPreMatchTrainingToMentors: string = '';

  public programProvidesPreMatchTrainingToMentorsDeliveredHow = [];

  public programProvidesPreMatchTrainingToMentorsMandatory: string = '';

  public programProvidesPreMatchTrainingToMentees: string = '';

  public programProvidesPreMatchTrainingToMenteesDeliveredHow = [];

  public programProvidesPreMatchTrainingToMenteesMandatory: string = '';

  public programHowDoesYourProgramMatchMentorsToMentees = [];

  public programHowDoesYourProgramMatchMentorsToMenteesExplainHow: string = '';

  public programDoesYourProgramProvideOngoingMonitoringAndSupportToTheMentoringRelationship: string = '';

  public programIsThereAFormalBeginningAndEndToTheMentoringRelationship: string = '';

  public programDoesYourProgramHaveSpecificGoalsOrOutcomes: string = '';

  public programDoesYourProgramHaveSpecificGoalsOrOutcomesWhich = [];

  public programDoesYourProgramHaveSpecificGoalsOrOutcomesWhichOther: string = '';

  public programAccepting = [];

  public contactFirstName: string = '';

  public contactLastName: string = '';

  public contactPosition: string = '';

  public contactPhone: string = '';

  public contactAlternatePhone: string = '';

  public contactEmail: string = '';

  public organization = '';

  public feedback: string = '';

  public organizationTitle: string = '';

  public field_ns_bg_check: string = '';

  public field_ns_bg_check_types: any[] = [];

  public field_ns_bg_fingerprint_type: string = '';

  public field_ns_bg_name_type: string = '';

  public field_ns_bg_peer_type: string = '';

  public field_ns_bg_other_types: any[] = [];

  public field_ns_training: string = '';

  public id;

  public delivery: ProgramDelivery = new ProgramDelivery();

  public field_mentor_city: any = {};

  public allowMentorCityReactivation: boolean = false;

  public programSource: string = 'Mentor Connector';

  serializeAdditional() {
    const result: any = {};
    result[ProgramFields.firstName] = this.contactFirstName;
    result[ProgramFields.lastName] = this.contactLastName;
    result[ProgramFields.position] = this.contactPosition;
    result[ProgramFields.phone] = this.contactPhone;
    result[ProgramFields.altPhone] = this.contactAlternatePhone;
    result[ProgramFields.email] = this.contactEmail;
    result[ProgramFields.programSource] = this.programSource;
    result[ProgramFields.allowMentorCityReactivation] = this.allowMentorCityReactivation;
    result.delivery = this.delivery.serialize();
    return result;
  }

  serialize() {
    const result = {
      field_types_of_mentoring: this.typesOfMentoring.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_types_of_mentoring_other: this.typesOfMentoringOther,
      field_program_operated_through: this.programOperatedThrough.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_program_operated_other: this.programOperatedThroughOther,
      field_facebook: this.facebook,
      field_twitter: this.twitter,
      field_website: this.website,
      field_instagram: this.instagram,
      field_focus_area: this.focusArea,
      field_focus_area_other: this.focusAreaOther,
      field_primary_meeting_location: this.primaryMeetingLocation,
      field_primary_meeting_loc_other: this.primaryMeetingLocationOther,
      field_program_how_are_meetings_s: this.programHowAreMeetingsScheduled.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_program_how_other: this.programHowAreMeetingsScheduledOther,
      field_program_genders_served: this.programGendersProgramServes.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_program_genders_other: this.programGendersProgramServesOthers,
      field_program_ages_served: this.programAgesProgramServes.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_program_ages_other: this.programAgesProgramServesOthers,
      field_program_family_served: this.programFamilyStructuresProgramServes.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_program_family_other: this.programFamilyStructuresProgramServesOther,
      field_program_youth_served: this.programYouthServedProgramServes.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_program_youth_other: this.programYouthServedProgramServesOther,
      field_program_youth_per_year: this.programEstimatedNumberOfYouthPerYear,
      field_program_mentees_waiting_li: this.programEstimatedNumberOfMenteesOnWaitingList,
      field_program_gender_mentor_targ: this.programTargetMentorPopulationGenders.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_program_gender_mentor_oth: this.programTargetMentorPopulationGendersOther,
      field_program_ages_mentor_target: this.programTargetMentorPopulationAges.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_program_age_mentor_other: this.programTargetMentorPopulationAgesOther,
      field_program_mentor_month_commi: this.programMentoringRelationshipCommitmentMonths,
      field_program_mentor_month_other: this.programMentoringRelationshipCommitmentMonthsOther,
      field_program_mentor_freq_commit: this.programMentoringRelationshipCommitmentFrequency,
      field_program_mentor_freq_other: this.programMentoringRelationshipCommitmentFrequencyOther,
      field_program_mentor_hour_commit: this.programMentoringRelationshipCommitmentHoursPerWeek,
      field_program_mentor_hour_other: this.programMentoringRelationshipCommitmentHoursPerWeekOther,
      field_program_screens_mentors: this.programScreensMentors,
      field_program_screens_mentors_ho: this.programScreensMentorsHow.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_program_screens_mentees: this.programScreensMentees,
      field_program_screens_mentees_ho: this.programScreensMenteesHow.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_program_trains_mentors: this.programProvidesPreMatchTrainingToMentors,
      field_program_trains_mentors_how: this.programProvidesPreMatchTrainingToMentorsDeliveredHow.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_program_must_train_mentors: this.programProvidesPreMatchTrainingToMentorsMandatory,
      field_program_trains_mentees: this.programProvidesPreMatchTrainingToMentees,
      field_program_trains_mentees_how: this.programProvidesPreMatchTrainingToMenteesDeliveredHow.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_program_must_train_mentees: this.programProvidesPreMatchTrainingToMenteesMandatory,
      field_program_matches_how: this.programHowDoesYourProgramMatchMentorsToMentees.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_program_matches_explain: this.programHowDoesYourProgramMatchMentorsToMenteesExplainHow,
      field_program_ongoing_support: this.programDoesYourProgramProvideOngoingMonitoringAndSupportToTheMentoringRelationship,
      field_program_beginning_and_end: this.programIsThereAFormalBeginningAndEndToTheMentoringRelationship,
      field_program_has_specific_goals: this.programDoesYourProgramHaveSpecificGoalsOrOutcomes,
      field_program_which_goals: this.programDoesYourProgramHaveSpecificGoalsOrOutcomesWhich.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_program_which_goals_other: this.programDoesYourProgramHaveSpecificGoalsOrOutcomesWhichOther,

      field_feedback: this.feedback,

      field_program_accepting: this.programAccepting.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_ns_bg_check: this.field_ns_bg_check,
      field_ns_bg_check_types: this.field_ns_bg_check_types.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_ns_bg_fingerprint_type: this.field_ns_bg_fingerprint_type,
      field_ns_bg_name_type: this.field_ns_bg_name_type,
      field_ns_bg_peer_type: this.field_ns_bg_peer_type,
      field_ns_bg_other_types: this.field_ns_bg_other_types.map((row) => {
        if (row.value != '') {
          return row.value;
        }
      }),
      field_ns_training: this.field_ns_training,
      field_program_grades_served: CheckboxFieldAdapter.serialize(this.field_program_grades_served),
      // field_mentor_city: this.field_mentor_city,
    };
    return result;
  }

  serializeRelationships() {
    const result: any = {};
    if (this.organization != '' && this.organization) {
      result.field_organization_entity = {
        data: [
          {
            type: 'node--organization',
            id: this.organization,
          },
        ],
      };
    } else {
      result.field_organization_entity = {
        data: [],
      };
    }
    return result;
  }

  deserialize(data: any) {
    this.id = data.attributes.entity_id;
    this.standing = data.attributes.field_standing;

    if (data.relationships.field_organization_entity.data) {
      const organizationId = data.relationships.field_organization_entity.data.id;
      if (organizationId != 'missing') {
        this.organization = data.relationships.field_organization_entity.data.id;
      }
    }

    this.facebook = data.attributes.field_facebook;
    this.twitter = data.attributes.field_twitter;
    this.website = data.attributes.field_website;
    this.instagram = data.attributes.field_instagram;

    this.focusArea = data.attributes.field_focus_area;
    this.focusAreaOther = data.attributes.field_focus_area_other;
    this.primaryMeetingLocation = data.attributes.field_primary_meeting_location;
    this.primaryMeetingLocationOther = data.attributes.field_primary_meeting_loc_other;
    this.programEstimatedNumberOfYouthPerYear = data.attributes.field_program_youth_per_year;
    this.programEstimatedNumberOfMenteesOnWaitingList = data.attributes.field_program_mentees_waiting_li;

    for (const i in data.attributes.field_types_of_mentoring) {
      this.typesOfMentoring[i] = {
        value: data.attributes.field_types_of_mentoring[i],
      };
    }
    this.typesOfMentoringOther = data.attributes.field_types_of_mentoring_other;

    for (const i in data.attributes.field_program_operated_through) {
      this.programOperatedThrough[i] = {
        value: data.attributes.field_program_operated_through[i],
      };
    }
    this.programOperatedThroughOther = data.attributes.field_program_operated_other;

    for (const i in data.attributes.field_program_how_are_meetings_s) {
      this.programHowAreMeetingsScheduled[i] = {
        value: data.attributes.field_program_how_are_meetings_s[i],
      };
    }
    this.programHowAreMeetingsScheduledOther = data.attributes.field_program_how_other;

    for (const i in data.attributes.field_program_genders_served) {
      this.programGendersProgramServes[i] = {
        value: data.attributes.field_program_genders_served[i],
      };
    }
    this.programGendersProgramServesOthers = data.attributes.field_program_genders_other;

    data.attributes.field_program_ages_served.sort((a:any, b: any) => {
      let matches = a.match(/\d+/);
      if (!matches) return;
      const aa = parseInt(matches[0]);
      matches = b.match(/\d+/);
      if (!matches) return;
      const bb = parseInt(matches[0]);
      if (aa > bb) {
        return 1;
      }
      if (aa < bb) {
        return -1;
      }
      return 0;
    });
    for (const i in data.attributes.field_program_ages_served) {
      this.programAgesProgramServes[i] = {
        value: data.attributes.field_program_ages_served[i],
      };
    }
    this.programAgesProgramServesOthers = data.attributes.field_program_ages_other;

    for (const i in data.attributes.field_program_family_served) {
      this.programFamilyStructuresProgramServes[i] = {
        value: data.attributes.field_program_family_served[i],
      };
    }
    this.programFamilyStructuresProgramServesOther = data.attributes.field_program_family_other;

    for (const i in data.attributes.field_program_youth_served) {
      this.programYouthServedProgramServes[i] = {
        value: data.attributes.field_program_youth_served[i],
      };
    }
    this.programYouthServedProgramServesOther = data.attributes.field_program_youth_other;

    for (const i in data.attributes.field_program_gender_mentor_targ) {
      this.programTargetMentorPopulationGenders[i] = {
        value: data.attributes.field_program_gender_mentor_targ[i],
      };
    }
    this.programTargetMentorPopulationGendersOther = data.attributes.field_program_gender_mentor_oth;

    for (const i in data.attributes.field_program_ages_mentor_target) {
      this.programTargetMentorPopulationAges[i] = {
        value: data.attributes.field_program_ages_mentor_target[i],
      };
    }
    this.programTargetMentorPopulationAgesOther = data.attributes.field_program_age_mentor_other;

    this.programMentoringRelationshipCommitmentMonths = data.attributes.field_program_mentor_month_commi;
    this.programMentoringRelationshipCommitmentMonthsOther = data.attributes.field_program_mentor_month_other;
    this.programMentoringRelationshipCommitmentFrequency = data.attributes.field_program_mentor_freq_commit;
    this.programMentoringRelationshipCommitmentFrequencyOther = data.attributes.field_program_mentor_freq_other;
    this.programMentoringRelationshipCommitmentHoursPerWeek = data.attributes.field_program_mentor_hour_commit;
    this.programMentoringRelationshipCommitmentHoursPerWeekOther = data.attributes.field_program_mentor_hour_other;

    this.programScreensMentors = data.attributes.field_program_screens_mentors;
    for (const i in data.attributes.field_program_screens_mentors_ho) {
      this.programScreensMentorsHow[i] = {
        value: data.attributes.field_program_screens_mentors_ho[i],
      };
    }

    this.programScreensMentees = data.attributes.field_program_screens_mentees;
    for (const i in data.attributes.field_program_screens_mentees_ho) {
      this.programScreensMenteesHow[i] = {
        value: data.attributes.field_program_screens_mentees_ho[i],
      };
    }

    this.programProvidesPreMatchTrainingToMentors = data.attributes.field_program_trains_mentors;
    for (const i in data.attributes.field_program_trains_mentors_how) {
      this.programProvidesPreMatchTrainingToMentorsDeliveredHow[i] = {
        value: data.attributes.field_program_trains_mentors_how[i],
      };
    }
    this.programProvidesPreMatchTrainingToMentorsMandatory = data.attributes.field_program_must_train_mentors;

    this.programProvidesPreMatchTrainingToMentees = data.attributes.field_program_trains_mentees;
    for (const i in data.attributes.field_program_trains_mentees_how) {
      this.programProvidesPreMatchTrainingToMenteesDeliveredHow[i] = {
        value: data.attributes.field_program_trains_mentees_how[i],
      };
    }
    this.programProvidesPreMatchTrainingToMenteesMandatory = data.attributes.field_program_must_train_mentees;

    for (const i in data.attributes.field_program_matches_how) {
      this.programHowDoesYourProgramMatchMentorsToMentees[i] = {
        value: data.attributes.field_program_matches_how[i],
      };
    }
    this.programHowDoesYourProgramMatchMentorsToMenteesExplainHow = data.attributes.field_program_matches_explain;

    this.programDoesYourProgramProvideOngoingMonitoringAndSupportToTheMentoringRelationship = data.attributes.field_program_ongoing_support;
    this.programIsThereAFormalBeginningAndEndToTheMentoringRelationship = data.attributes.field_program_beginning_and_end;
    this.programDoesYourProgramHaveSpecificGoalsOrOutcomes = data.attributes.field_program_has_specific_goals;
    for (const i in data.attributes.field_program_which_goals) {
      this.programDoesYourProgramHaveSpecificGoalsOrOutcomesWhich[i] = {
        value: data.attributes.field_program_which_goals[i],
      };
    }
    this.programDoesYourProgramHaveSpecificGoalsOrOutcomesWhichOther = data.attributes.field_program_which_goals_other;

    this.contactFirstName = data.attributes[ProgramFields.firstName];
    this.contactLastName = data.attributes[ProgramFields.lastName];
    this.contactPosition = data.attributes[ProgramFields.position];
    this.contactEmail = data.attributes[ProgramFields.email];
    this.contactPhone = data.attributes[ProgramFields.phone];
    this.contactAlternatePhone = data.attributes[ProgramFields.altPhone];
    this.programSource = data.attributes[ProgramFields.programSource];

    this.feedback = data.attributes.field_feedback;

    for (const i in data.attributes.field_program_accepting) {
      this.programAccepting[i] = {
        value: data.attributes.field_program_accepting[i],
      };
    }

    this.field_ns_bg_check = data.attributes.field_ns_bg_check;
    const bgCheckTypes = new OptionCollection();
    for (const row of data.attributes.field_ns_bg_check_types) {
      bgCheckTypes.add(row);
    }
    this.field_ns_bg_check_types = bgCheckTypes.options;
    this.field_ns_bg_fingerprint_type = data.attributes.field_ns_bg_fingerprint_type;
    this.field_ns_bg_name_type = data.attributes.field_ns_bg_name_type;
    this.field_ns_bg_peer_type = data.attributes.field_ns_bg_peer_type;
    const bgOtherTypes = new OptionCollection();
    for (const row of data.attributes.field_ns_bg_other_types) {
      bgOtherTypes.add(row);
    }
    this.field_ns_bg_other_types = bgOtherTypes.options;
    this.field_ns_training = data.attributes.field_ns_training;
    this.field_program_grades_served = CheckboxFieldAdapter.deserialize(data.attributes.field_program_grades_served);
    this.field_e_mentoring_service_area = data.attributes.field_e_mentoring_service_area;
    this.field_mentor_city = data.attributes.field_mentor_city;

    this.delivery.deserialize(data.attributes);
    this.allowMentorCityReactivation = data.attributes.allowMentorCityReactivation === 1;
  }
}
