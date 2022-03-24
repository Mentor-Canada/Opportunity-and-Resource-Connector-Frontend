import WindowInterface from 'Interfaces/WindowInterface';
import BaseMixin from 'BaseMixin';
import template from './page-not-found.html';
import PageMixin from '../../mixins/PageMixin';

declare const window: WindowInterface;

export default {

  mixins: [BaseMixin, PageMixin],

  template,

  mounted() {
    window.app.hideLoading();
  },
};
