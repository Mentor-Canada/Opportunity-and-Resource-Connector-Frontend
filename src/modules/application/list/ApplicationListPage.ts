import ApplicationListDelegate from './ApplicationListDelegate';
import TableMixin from '../../../components/Table/TableMixin';
import FilterProperties from '../../filter/FilterProperties';
import InquiryFilter from './InquiryFilter.vue';
import FilterListMixin from '../../filter/FilterListMixin';

export default {
  mixins: [TableMixin, FilterListMixin],

  components: {
    InquiryFilter,
  },

  data() {
    const delegate = new ApplicationListDelegate();

    return {
      delegate,
      filterProperties: new FilterProperties('inquiry', delegate),
      isReady: false,
    };
  },

  methods: {
    rowClicked(data) {
      const id = data.data.attributes.uuid;
      this.router.push(this.link(`${this.delegate.baseUrl}/detail/${id}`));
    },
  },

};
