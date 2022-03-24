import BaseMixin from 'BaseMixin';
import langcodes from 'iso-language-codes/js/index';
import template from './SettingsLanguagesPage.html';
import PageMixin from '../../../mixins/PageMixin';
import VuetableSwitch from '../../../components/VuetableSwitch.vue';
import SegmentedControl from '../../../contrib/vue-segmented-control';

export default {
  mixins: [BaseMixin, PageMixin],

  template,

  data() {
    return {
      list: [],
      fields: [
        { title: 'Name', name: 'label-slot' },
        { name: VuetableSwitch },
      ],
      search: '',
      active: true,
      options: [
        { label: 'Active', value: true },
        { label: 'All', value: false },
      ],
    };
  },

  components: {
    SegmentedControl,
  },

  async mounted() {
    this.app.showLoading();

    const languages = [];
    for (const language of this.app.languages.list) {
      languages.push(language.langcode);
    }

    this.list = langcodes;
    this.list.forEach((row) => {
      if (row.nativeName == 'français, langue française') {
        row.nativeName = 'français';
      }
      row.title = row.nativeName;
      row.checked = languages.includes(row.iso639_1);
    });
    this.list = this.list.sort((a, b) => a.title.localeCompare(b.title));
    this.ready();
  },

  methods: {
    dataManager() {
      let filtered = [];
      filtered = this.list;
      if (this.active) {
        filtered = filtered.filter((row) => row.checked);
      }
      if (this.search != '') {
        filtered = filtered.filter((row) => {
          if (row.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1) {
            return true;
          }
          if (row.nativeName.toLowerCase().indexOf(this.search.toLowerCase()) != -1) {
            return true;
          }
          return false;
        });
      }
      return filtered;
    },

    onSelect(optionsSelected) {
      this.active = optionsSelected[0].value;
      this.$refs['my-vuetable']?.refresh();
    },

    refresh() {
      this.$refs['my-vuetable'].refresh();
    },

    async save() {
      this.app.showLoading();
      const languages = this.list.filter((row) => row.checked);
      await this.api.post('/a/app/settings/languages', languages);
      window.location.reload();
    },

  },

};
