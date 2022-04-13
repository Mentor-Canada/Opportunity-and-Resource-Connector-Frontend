import globals from "../../../globals";

export default class Invitation {

  status: string;
  programName: string;
  deactivationDate: string;
  deactivationReason: string;
  deactivationReasonOther: string;
  invitationId: string

  public static createFromData(data): Invitation {
    const invitation = new Invitation();
    invitation.setData(data);
    return invitation;
  }

  public async save() {
    await globals.api.post(`a/app/mentorcity/deactivate/${this.invitationId}`, {
      date: this.deactivationDate,
      reason: this.deactivationReason,
      reasonOther: this.deactivationReasonOther
    });
  }

  private setData(data) {
    this.programName = data.title;
    this.invitationId = data.invitation_id;
    this.status = data.status;
  }

}
