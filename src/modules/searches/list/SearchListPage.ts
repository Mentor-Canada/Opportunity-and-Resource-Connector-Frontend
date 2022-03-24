import SearchStats from 'Models/SearchStats';
import template from './SearchList.html';
import RouteBuilder from '../../../pages/RouteBuilder';
import SearchListDelegate from './SearchListDelegate';
import TableMixin from '../../../components/Table/TableMixin';

export default {

  mixins: [TableMixin],

  template,

  data() {
    return {
      delegate: new SearchListDelegate(),
      stats: new SearchStats(),
    };
  },

  methods: {
    refresh() {
      this.$refs['table-component'].refresh();
    },

    updateSelectedPartner(row) {
      this.delegate.partnerEntityId = row.id;
      this.delegate.partnerFieldId = row.value;
    },

  },

};
