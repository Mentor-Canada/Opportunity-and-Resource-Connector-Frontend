import AccountStats from 'Models/AccountStats';
import AccountListDelegate from './AccountListDelegate';
import globals from '../../../globals';
import TableMixin from '../../../components/Table/TableMixin';
import AccountFilter from './AccountFilter.vue';
import FilterProperties from '../../filter/FilterProperties';
import FilterListMixin from '../../filter/FilterListMixin';

export default {

  beforeRouteEnter(to, from, next) {
    if (!globals.app.ui.accounts()) {
      console.error('access denied');
      return;
    }
    next();
  },

  mixins: [TableMixin, FilterListMixin],

  components: {
    AccountFilter,
  },

  data() {
    const delegate = new AccountListDelegate();
    const filterProperties = new FilterProperties('account', delegate);
    filterProperties.filter = null;
    filterProperties.filters = null;
    return {
      delegate,
      filterProperties,
      stats: new AccountStats(),
    };
  },

  created() {
    document.body.setAttribute('data-page', 'account-list');
  },

  destroyed() {
    document.body.removeAttribute('data-page');
  },

  methods: {
    refresh() {
      this.$refs['table-component'].refresh();
    },

    rowClicked(data: any) {
      const { id } = data.data;
      this.$refs['table-component'].$refs['my-vuetable'].showDetailRow(id);
      this.router.push(this.link(`${this.delegate.baseUrl}/detail/${id}`));
    },

    loadSuccess(response) {
      for (const row of response.data.data) {
        if (row.attributes.globalAdministrator == '1'
          || row.attributes.affiliates.length
          || row.attributes.organizations.length
          || row.attributes.programs.length
        ) {
          this.$refs['table-component'].$refs['my-vuetable'].showDetailRow(row.id);
        }
      }
    },

    rowClass(dataItem, index) {
      if (this.$refs['table-component'].$refs['my-vuetable'].isVisibleDetailRow(dataItem.id)) {
        return 'has-details';
      }
    },

  },

};
