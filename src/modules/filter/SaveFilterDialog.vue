<template>
  <md-dialog :md-active.sync="show">
    <md-dialog-title>{{ t("app-save-filter") }}</md-dialog-title>
    <md-dialog-content class="standard-form-style">
      <div class="ui-form-row">
        <app-input v-model=filter.attributes.title
                   type="text"
                   :label="t('app-title')"
                   required="true"
        />
      </div>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="show = false">{{ t("app-cancel") }}</md-button>
      <md-button class="md-primary" @click="show = false; $emit('save')">{{ t("app-save") }}</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';

export default {
  mixins: [BaseMixin],

  props: ['value'],

  data() {
    return {
      show: false,
      filter: this.$props.value,
    };
  },

  watch: {
    show() {
      if (this.show) {
        this.filter.attributes.title = '';
        this.filter.attributes.id = null;
      }
    },
  },
};
</script>
