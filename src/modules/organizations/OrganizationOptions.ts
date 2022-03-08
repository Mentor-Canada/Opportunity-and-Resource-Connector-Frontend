import Options from "Models/Options"
import OptionCollection from "Models/OptionCollection"

export default class OrganizationOptions extends Options {

  type = new OptionCollection()
    .add('')
    .add('app-organization-type-government')
    .add('app-organization-type-business')
    .add('app-organization-type-community')
    .add('app-organization-type-faith-based')
    .add('app-organization-type-school-board')
    .add('app-organization-type-school-academic-institution')
    .add('other', 'app-other')
    .options

  taxStatus = new OptionCollection()
    .add('app-organization-tax-status-for-profit')
    .add('app-organization-tax-status-not-for-profit')
    .add('app-organization-tax-status-registered-charity')
    .add('app-organization-tax-status-n-a')
    .add('other', 'app-other')
    .options

  position = new OptionCollection()
    .add('app-organization-position-founder')
    .add('app-organization-position-president-ceo')
    .add('app-organization-position-executive-director')
    .add('app-organization-position-vice-president')
    .add('app-organization-position-director')
    .add('app-organization-position-chair')
    .add('other', 'app-other')
    .options

  yesOrNo = new OptionCollection()
    .add('yes', 'app-yes')
    .add('no', 'app-no')
    .options

  yesOrNoAsBool = new OptionCollection()
    .add('1', 'app-yes')
    .add('0', 'app-no')
    .options

}