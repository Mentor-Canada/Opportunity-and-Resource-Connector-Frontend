<template>
  <table-component
      ref="table-component"
      data-page="search-list"
      :delegate="delegate"
      :title="t('app-feedback')"
  >
  </table-component>
</template>

<script lang="ts">
import TableMixin from '../../../components/Table/TableMixin';
import FeedbackListDelegate from './FeedbackListDelegate';

export default {
  mixins: [TableMixin],

  data() {
    return {
      delegate: new FeedbackListDelegate(),
    };
  },
};
</script>
