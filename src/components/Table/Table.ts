import Url from 'url-parse';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import frLocale from 'date-fns/locale/fr-CA';
import distanceInWordsToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';
import template from './Table.html';
import BaseMixin from '../../mixins/BaseMixin';
import globals from '../../globals';
import RequestQueue from '../../pages/RequestQueue';

export default {
  mixins: [BaseMixin],

  props: [
    'title',
    'trail',
    'url',
    'baseUrl',
    'delegate',
    'vuetable-slots',
    'export',
    'hasFilter',
    'add-label',
    'detailRowComponent',
    'loadSuccess',
    'rowClass',
    'filterNeedsToLoad',
  ],

  data() {
    return {
      total: null,
      isReady: false,
      request: new RequestQueue(),
      nextOffset: null,
      prevOffset: null,
      empty: true,
      csvUrl: null,
    };
  },

  created() {
    this.$options.template = template.replace('{% vuetable-slots %}', this.vuetableSlots);
  },

  mounted() {
    this.request.callback = () => {
      this.$refs['my-vuetable'].refresh();
    };
  },

  methods: {
    setTotal(value) {
      this.total = value;
    },

    refresh() {
      if (this.delegate.offset != 0) {
        const dest = globals.app.link(`${this.$props.delegate.baseUrl}/offset/0`);
        globals.app.view.router.replace(dest);
      }
      this.request.begin();
    },

    getData(apiUrl, httpOptions) {
      this.app.showLoading();

      const builder = this.delegate.urlBuilder()
        .start(this.delegate.startDate)
        .end(this.delegate.endDate)
        .sort(this.delegate.sort);

      if (this.delegate.csvUrl) {
        this.csvUrl = builder
          .path(this.delegate.csvUrl)
          .build();
      }

      const url = builder
        .path(this.delegate.url)
        .limit(this.app.pageCount)
        .offset(this.delegate.offset)
        .build();

      return globals.api.get(url);
    },

    transformData(response) {
      if (response.total != null || response.meta?.total != null) {
        this.total = response.total || response.meta?.total;
      }
      this.empty = response.data.length == 0;
      for (const row of response.data) {
        if (row.attributes.created) {
          this.formatCreated(row);
        }
      }
      if (response.links?.next) {
        const nextUrl = new Url(response.links.next.href, true);
        this.nextOffset = nextUrl.query['page[offset]'];
      } else {
        this.nextOffset = null;
      }
      if (response.links?.prev) {
        const prevUrl = new Url(response.links.prev.href, true);
        this.prevOffset = prevUrl.query['page[offset]'];
      } else {
        this.prevOffset = null;
      }
      this.delegate.transform(response);
      this.vueTableReady = true;
      this.ready();
      return response;
    },

    ready() {
      this.request.end();
      if (!this.request.loading) {
        this.isReady = true;
        this.$emit('ready');
        if (this.$props.filterNeedsToLoad) {
          return;
        }
        this.app.hideLoading();
        BaseMixin.methods.ready.call(this);
      }
    },

    getTimestamp(dateString) {
      if (dateString) {
        const components = dateString.split('-');
        const utcDate = new Date(Date.UTC(components[0], components[1] - 1, components[2]));
        return utcDate.getTime() / 1000;
      }
      return null;
    },

    formatCreated(row) {
      const date = new Date(row.attributes.created);
      const today = new Date();
      const distance = differenceInCalendarDays(today, date);

      if (distance <= 31) {
        const dateOptions: any = {};
        if (globals.app.language.langcode == 'fr') {
          dateOptions.locale = frLocale;
        }
        const createAgo = this.t('app-created-ago', { date: distanceInWordsToNow(date, dateOptions) });
        row.attributes.created = createAgo;
        row.attributes.created = row.attributes.created.charAt(0).toUpperCase() + row.attributes.created.slice(1);
      } else {
        row.attributes.created = format(date, 'yyyy-MM-dd');
      }
    },

    downloadCsv() {
      if (this.csvUrl) {
        location.href = this.csvUrl;
      } else {
        throw 'Not Implemented';
      }
    },

    handleError(error) {
      this.app.hideLoading();
      this.app.view.snackBarText = this.app.t('app-network-error');
      this.app.view.showSnackbar = true;
      throw error;
    },

  },

};
