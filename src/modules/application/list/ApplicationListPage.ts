import ApplicationListDelegate from './ApplicationListDelegate';
import TableMixin from '../../../components/Table/TableMixin';
import FilterProperties from '../../filter/FilterProperties';
import InquiryFilter from './InquiryFilter.vue';
import FilterListMixin from '../../filter/FilterListMixin';
import slotTemplate from './ApplicationListSlots.html';

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
      vueTableSlots: slotTemplate,
      isReady: false,
    };
  },

  methods: {
    rowClicked(data) {
      const id = data.data.attributes.uuid;
      this.router.push(this.link(`${this.delegate.baseUrl}/detail/${id}`));
    },

    redirectToProgram(programUuid) {
      this.router.push(`/${window.app.languages.list[0].langcode}/admin/programs/detail/${programUuid}`);
    },

    redirectToOrganization(organizationUuid) {
      this.router.push(`/${window.app.languages.list[0].langcode}/admin/organizations/detail/${organizationUuid}`);
    },
  },

};
