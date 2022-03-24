<template>
  <div>
    <div class="form-row community-delivery-row">
      <app-checkbox
        :label="t('app-program-delivery-community-based')"
        @input="onInput($event, 'community')"
        :required="required"
        :description="t('app-program-delivery-community-based-description')"
      />
    </div>
    <div class="form-row site-delivery-row">
      <app-checkbox
        :label="t('app-program-delivery-site-based')"
        @input="onInput($event, 'siteBased')"
        :required="required"
        :description="t('app-program-delivery-site-based-description')"
      />
    </div>
    <div class="form-row e-mentoring-delivery-row">
      <app-checkbox
        :label="t('app-program-delivery-e-mentoring')"
        @input="onInput($event, 'eMentoring')"
        :required="required"
        :description="t('app-program-delivery-e-mentoring-description')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';
import SearchAttributes from 'Models/SearchAttributes';

export default {
  mixins: [BaseMixin],

  props: ['search'],

  data() {
    return {
      required: false,
    };
  },

  mounted() {
    this.value = this.search.attributes.delivery;
    this.$el.querySelector('.community-delivery-row input').checked = this.value.indexOf(SearchAttributes.COMMUNITY_BASED_DELIVERY) != -1;
    this.$el.querySelector('.site-delivery-row input').checked = this.value.indexOf(SearchAttributes.SITE_BASED_DELIVERY) != -1;
    this.$el.querySelector('.e-mentoring-delivery-row input').checked = this.value.indexOf(SearchAttributes.E_MENTORING_DELIVERY) != -1;
    this.required = !this.value.length;
  },

  methods: {
    onInput(checked, key) {
      const index = this.value.indexOf(key);
      if (!checked && index != -1) this.value.splice(index, 1);
      else if (checked && index == -1) this.value.push(key);
      this.required = !this.value.length;
    },
  },

};
</script>

<style lang="scss">
.program-delivery {
  .checked-content {
    padding-top: 10px;
    &:not(:last-child) {
      padding-bottom: 10px
    }
  }
}
</style>
