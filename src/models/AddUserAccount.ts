import WindowInterface from 'Interfaces/WindowInterface';

declare const window: WindowInterface;

export default class UserAccount {
  public mail: string;

  public organizationId: string;

  async save() {
    const data: any = {
      mail: this.mail,
      organizationId: this.organizationId,
    };
    const result = await window.api.post(
      '/a/organization/set-administrator',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
