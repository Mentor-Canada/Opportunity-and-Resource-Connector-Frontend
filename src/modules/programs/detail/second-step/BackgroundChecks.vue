<template>
  <fieldset>
    <div class="ui-form-row">
      <app-radios v-model="program.attributes.field_ns_bg_check"
                  name="app-background-check"
                  :label='t("app-background-check")'
                  :options="backgroundCheckRootOptions"
                  required="true"
                  @input="onBackgroundCheckChanged"
      />
    </div>
    <div v-if="program.attributes.field_ns_bg_check === 'app-yes'">
      <div class="ui-form-row">
        <checkboxes v-model="program.attributes.field_ns_bg_check_types"
                    :label='t("app-program-background-check-type")'
                    :options="backgroundCheckType"
                    :cols="4"
                    :required="true"
                    @input="onBackgroundCheckTypeChanged"
        />
      </div>
      <div class="ui-form-row"
           v-if="app.bootstrap.country !== 'ca' && isChecked(0)">
        <app-radios v-model="program.attributes.field_ns_bg_fingerprint_type"
                    name="app-background-check-fingerprint-type"
                    :label='t("app-background-check-fingerprint-type")'
                    :options="backgroundCheckFingerprintType"
                    required="true"
        />
      </div>
      <div class="ui-form-row"
           v-if="app.bootstrap.country !== 'ca' && isChecked(1)">
        <app-radios v-model="program.attributes.field_ns_bg_name_type"
                    name="app-background-check-name-type"
                    :label='t("app-background-check-name-type")'
                    :options="backgroundCheckNameType"
                    required="true"
        />
      </div>
      <div class="ui-form-row"
           v-if="app.bootstrap.country !== 'ca' && isChecked(2)">
        <checkboxes v-model="program.attributes.field_ns_bg_other_types"
                    :label='t("app-background-check-other-type")'
                    :options="backgroundCheckOtherType"
                    :cols="2"
                    :required="true"
        />
      </div>
    </div>
    <div class="ui-form-row" v-if="program.attributes.field_ns_bg_check === 'app-background-check-type-peer'">
      <app-radios v-model="program.attributes.field_ns_bg_peer_type"
                  name="app-background-check-peer-type"
                  :label='t("app-background-check-peer-bg-check")'
                  :options="yesOrNo"
                  required="true"
      />
    </div>
  </fieldset>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';
import OptionCollection from 'Models/OptionCollection';
import YesOrNoOptions from './YesOrNoOptions';

export default {
  props: ['program'],
  mixins: [BaseMixin],

  data() {
    let backgroundCheckType = new OptionCollection()
      .add('app-background-check-type-fingerprint')
      .add('app-background-check-type-name')
      .add('app-background-check-type-other')
      .options;
    if (window.app.bootstrap.country == 'ca') {
      backgroundCheckType = new OptionCollection()
        .add('app-background-check-type-ca-child-and-family')
        .add('app-background-check-type-ca-vulnerable-sector-check')
        .options;
    }
    return {
      yesOrNoOptions: YesOrNoOptions(),
      backgroundCheckRootOptions: new OptionCollection()
        .add('app-yes')
        .add('app-no')
        .add('app-background-check-type-peer')
        .options,
      backgroundCheckType,
      backgroundCheckFingerprintType: new OptionCollection()
        .add('app-background-check-fingerprint-fbi')
        .add('app-background-check-fingerprint-state')
        .options,
      backgroundCheckNameType: new OptionCollection()
        .add('app-background-check-name-multi-state')
        .add('app-background-check-name-state')
        .add('app-background-check-name-local')
        .options,
      backgroundCheckOtherType: new OptionCollection()
        .add('app-background-check-other-abuse')
        .add('app-background-check-other-offender')
        .options,
      yesOrNo: new OptionCollection()
        .add('app-yes')
        .add('app-no')
        .options,
    };
  },

  methods: {
    onBackgroundCheckChanged() {
      if (this.program.attributes.programPerformsBackgroundCheck == 'app-no') {
        this.program.attributes.backgroundCheckType = [];
        this.program.attributes.backgroundCheckFingerprintType = '';
      }
    },

    onBackgroundCheckTypeChanged() {
      if (this.app.bootstrap.country == 'ca') {
        return;
      }
      if (!this.isChecked(0)) {
        this.program.attributes.backgroundCheckFingerprintType = '';
      }
      if (!this.isChecked(1)) {
        this.program.attributes.backgroundCheckNameType = '';
      }
      if (!this.isChecked(2)) {
        this.program.attributes.backgroundCheckOtherType = [];
      }
    },

    isChecked(index) {
      const values = this.program.attributes.field_ns_bg_check_types.map((row) => row.value);
      return values.includes(this.backgroundCheckType[index].value);
    },
  },
};
</script>
