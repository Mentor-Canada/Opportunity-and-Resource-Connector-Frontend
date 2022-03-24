import globals from '../../globals';

export default class ProgramSettings {
  id: number;

  bbbsc: boolean = false;

  bbbscInquiryProgramOfInterest: string = '';

  bbbscProgramType: string = '';

  bbbscSystemUser: string = '';

  async save() {
    const response = await globals.api.post(`/a/app/program/${this.id}/settings`, {
      bbbsc: this.bbbsc,
      bbbscInquiryProgramOfInterest: this.bbbscInquiryProgramOfInterest,
      bbbscProgramType: this.bbbscProgramType,
      bbbscSystemUser: this.bbbscSystemUser,
    });
  }

  load(data) {
    this.bbbsc = data.attributes.bbbsc == 1;
    this.bbbscInquiryProgramOfInterest = data.attributes.bbbscInquiryProgramOfInterest;
    this.bbbscProgramType = data.attributes.bbbscProgramType;
    this.bbbscSystemUser = data.attributes.bbbscSystemUser;
  }
}
