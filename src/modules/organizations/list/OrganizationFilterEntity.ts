import ProgramAttributes from 'Models/program/ProgramAttributes';
import globals from '../../../globals';
// import ApplicationAttributes from "Models/ApplicationAttributes"
// import ProgramListDelegate from "./ProgramListDelegate"
import InquiryFilterEntityAttributes from '../../../modules/applications/list/InquiryFilterEntityAttributes';
import FilterEntity from './FilterEntity';

export default class OrganizationFilterEntity {
  attributes = new InquiryFilterEntityAttributes();

  programAttributes: ProgramAttributes;

  entity: any;

  private url: string = '/a/app/program/filter';

  private update(params) {
    console.log('UPDATE');
    console.log(params);
    // this.programAttributes = new ProgramAttributes()
    // // this.inquiryAttributes.call = undefined
    // // this.inquiryAttributes.sms = undefined
    // // this.inquiryAttributes.role = undefined
    // // this.inquiryAttributes.title = undefined
    //
    // this.attributes.date_mode = delegate.dateMode
    // if(delegate.dateMode == 'range') {
    //   this.attributes.start_time = delegate.startDate
    //   this.attributes.end_time = delegate.endDate
    // }
    // else {
    //   this.attributes.start_time = null
    //   this.attributes.end_time = null
    // }

    // if(delegate.programFilter) {
    //   this.inquiryAttributes.program = delegate.programFilter
    // }
    //
    // if(delegate.roleFilter) {
    //   this.inquiryAttributes.role = delegate.roleFilter
    // }
    //
    // if(delegate.statusFilter) {
    //   this.inquiryAttributes.status = delegate.statusFilter
    // }
    //
    // if(delegate.leadFilter) {
    //   this.inquiryAttributes.howDidYouHearAboutUs = delegate.leadFilter
    // }
    //
    // if(delegate.leadFilterOther) {
    //   this.inquiryAttributes.howDidYouHearAboutUsOther = delegate.leadFilterOther
    // }
    //
    // if(delegate.firstNameFilter) {
    //   this.inquiryAttributes.firstName = delegate.firstNameFilter
    // }
    //
    // if(delegate.lastNameFilter) {
    //   this.inquiryAttributes.lastName = delegate.lastNameFilter
    // }
    //
    // if(delegate.emailFilter) {
    //   this.inquiryAttributes.email = delegate.emailFilter
    // }
    //
    // if(delegate.phoneFilter) {
    //   this.inquiryAttributes.phone = delegate.phoneFilter
    // }
    //
    // if(delegate.voiceFilter) {
    //   this.inquiryAttributes.call = delegate.voiceFilter == 'app-yes'
    // }
    //
    // if(delegate.smsFilter) {
    //   this.inquiryAttributes.sms = delegate.smsFilter == 'app-yes'
    // }
  }

  async save() {
    const filter = new FilterEntity();
    filter.attributes.type = 'organization';
    filter.attributes.title = 'test';
    await filter.save();
    // console.log("SAVE")
    // // let data: any = {}
    // // data.attributes = this.attributes
    // // data.entity = this.programAttributes
    // await globals.api.post(this.url, data)
  }

  async delete() {
    console.log('DELETE');
    // await globals.api.post(`${this.url}/delete/${this.attributes.id}`)
  }
}
