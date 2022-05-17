import BaseMixin from 'BaseMixin';
import Organization from 'Models/Organization';
import * as DetailViewInterface from 'Interfaces/DetailViewInterface';
import DateStringBuilder from 'Models/DateStringBuilder';
import template from './OrganizationDetail.html';
import EMentoringDialog from '../e-mentoring/EMentoringDialog';
import globals from '../../../globals';
import GroupMixinForm from '../../../mixins/GroupMixinForm';
import OrganizationOptions from '../OrganizationOptions';

export default {
  mixins: [BaseMixin, DetailViewInterface.mixin, GroupMixinForm],

  template,

  programMode: false,

  components: {
    'e-mentoring-dialog': EMentoringDialog,
  },

  data() {
    return {
      organization: new Organization(),
      programMode: false,
      title: '',
      parentUrl: this.link('organizations'),
      selected: '',
      showPlacePickerHint: false,
      options: new OrganizationOptions(),
    };
  },

  computed: {
    eMentoringInviteMessage() {
      if (this.organization.attributes.field_mtg?.invite_date_sent) {
        const inviteData = { ...this.organization.attributes.field_mtg };
        inviteData.dateString = new DateStringBuilder()
          .unixtimestamp(this.organization.attributes.field_mtg?.invite_date_sent)
          .format("EEEE, LLLL do, yyyy 'at' h:mm a", 'en')
          .format("EEEE do LLLL yyyy à HH'&nbsp;h&nbsp;'mm", 'fr')
          .build();
        return this.t('app-invitation-sent', inviteData);
      }
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.organization = new Organization();
      vm.options = new OrganizationOptions();
      vm.showPlacePickerHint = false;
      vm.title = '';
      vm.selected = '';
      vm.parentUrl = vm.link('organizations');
      vm.render(false);
    });
  },

  methods: {
    async render() {
      this.app.showLoading();

      if (this.app.view.isAdminPage) {
        this.parentUrl = this.link('admin/organizations');
      }

      if (this.isAdminPage) {
        this.title = this.t('app-add-organization');
      } else {
        this.title = this.t('app-submit-organization');
      }

      if (this.$route?.params.id) {
        this.app.showLoading();
        this.title = this.t('app-edit-organization');
        this.organization.document.id = this.$route.params.id;
        await this.organization.load();
      }
      this.ready();
      await this.$nextTick();
      this.onTitleInput();
      this.onDescriptionInput('description');
    },

    getRequiredTitle() {
      const en: HTMLInputElement = this.$el.querySelector('#title-input-en input');
      if (globals.app.languages.list.length == 1) {
        return en.value;
      }
      const secondaryLangcode = this.app.languages.getSecondaryLangcode();
      const fr: HTMLInputElement = this.$el.querySelector(`#title-input-${secondaryLangcode} input`);
      if (en.value == '' && fr.value != '') {
        return fr.value;
      }
      return en.value;
    },

    async save() {
      this.app.showLoading();
      const fileEl: HTMLInputElement = document.querySelector('#organization-logo-file');
      const file = fileEl?.files[0];
      if (file) {
        this.organization.file = file;
      }
      this.organization.localizedAttributes.en.field_display_title = this.getRequiredTitle();
      await this.organization.save();
      if (this.app.view.isAdminPage) {
        this.router.push(this.parentUrl);
      } else if (!this.programMode) {
        this.router.push(this.link(`organizations/submitted/${this.organization.document.id}`));
      } else {
        this.app.hideLoading();
        const { id } = this.organization.document;
        const url = `programs/add/step/1?organization=${id}&info=true`;
        this.organization = new Organization();
        this.app.view.router.push(this.link(url));
      }
    },

    remove() {
      this.app.showLoading();
      this.organization.remove()
        .then(() => {
          this.router.push(this.parentUrl);
        });
    },

    onApprovalClick() {
      this.router.push(this.link(`admin/organizations/approval/${this.organization.document.id}`));
    },

    onAdministratorsClick() {
      this.router.push(this.link(`admin/organizations/administrators/${this.organization.document.id}`));
    },

  },
};
