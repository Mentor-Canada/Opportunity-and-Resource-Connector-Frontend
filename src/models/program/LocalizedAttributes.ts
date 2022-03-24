export default class LocalizedAttributes {
  public field_display_title: string = '';

  public field_description: string = '';

  public field_mentor_role_description: string = '';

  public field_ns_training_description: string = '';

  constructor(data?: any, langcode) {
    if (data) {
      if (data.title) this.field_display_title = data.title[langcode];
      if (data.programDescription) this.field_description = data.programDescription[langcode];
      if (data.mentorDescription) this.field_mentor_role_description = data.mentorDescription[langcode];
      if (data.trainingDescription) this.field_ns_training_description = data.trainingDescription[langcode];
    }
  }
}
