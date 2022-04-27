<template>
  <div class="table-filter-wrapper" v-show="isReady">
    <md-dialog class="mentorcity-deactivate-dialog standard-dialog-style" :md-active.sync="showDialog">
      <md-dialog-title>{{ $t("deactivate-dialog-title", [invitation.programName]) }}</md-dialog-title>
      <md-dialog-content>
        <label>Date</label>
        <input v-model="invitation.deactivationDate" type="date" />
        <label>Reason</label>
        <select v-model="invitation.deactivationReason">
          <option value="inactive">Inactive</option>
          <option value="unresponsive">Unresponsive</option>
          <option value="offboarding-requested">Offboarding requested</option>
          <option value="other">Other</option>
        </select>
        <textarea v-model="invitation.deactivationReasonOther" v-if="invitation.deactivationReason === 'other'"></textarea>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button type="submit" @click="showDialog = false">{{ t("app-cancel") }}</md-button>
        <md-button class="md-primary" type="submit" @click="deactivateClicked">{{ $t("deactivate") }}</md-button>
      </md-dialog-actions>
    </md-dialog>
    <filter-dialog ref="filter-dialog"
                   @show-save-dialog="showSaveFilterDialog"
                   @show-delete-dialog="showDeleteFilterDialog"
    >
      <mentor-city-filter
          :properties="filterProperties"
          :is-dialog="true"
          @input="refresh"
      />
    </filter-dialog>
    <table-component
        ref="table-component"
        add-label="app-admin-add-program"
        data-page="mentorcity-list"
        :delegate="delegate"
        title="MentorCity"
        :vuetable-slots="vueTableSlots"
        @menu-clicked="menuClicked"
        @email-clicked="emailClicked"
        @deactivate-clicked="openDeactivateDialog"
        @redirect-to-program="redirectToProgram"
        :has-filter="true"
        @ready="tableReady"
        export="true"
        @show-filter="$refs['filter-dialog'].show = true"
    >
      <div class="ui-form-row">
        <app-input name="mentor-city-search-bar"
                   v-model="delegate.filter['title']"
                   type="search"
                   :label="$t('search')"
                   @input="refresh"
        />
      </div>
    </table-component>
    <mentor-city-filter
        ref="filter-panel"
        :properties="filterProperties"
        @save="saveFilter"
        @delete="deleteFilter($event)"
        @input="refresh"
    />
  </div>
</template>

<style lang="scss" scoped src="./../../../pages/filterlist.scss" />

<style lang="scss">
[data-page=mentorcity-list] {
  table {
    table-layout: fixed;
  }
  td:last-child {
    text-align: right;
  }

  td:nth-child(2n + 1) {
    background-color: #eef4f9;
  }

  .mentorcity-deactivate-button {
    display: block;
    margin-top: 6px;
  }
}
.mentorcity-deactivate-dialog {
  .md-dialog-content {
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 3px;
    }
    input {
      margin-bottom: 6px;
    }
    select {
      margin-bottom: 6px;
    }
    textarea {
      margin-top: 6px;
      padding: 6px;
      height: 100px;
    }
    padding-bottom: 0;
  }
}
.mentorcity-status {
  &.inactive {
    color: #ff002a;
  }
}

.mentorcity-allow-reactivate,
.mentorcity-deactivation-other {
  color: rgba(0, 0, 0, 0.57);
  font-style: italic;
  margin-top: 6px;
}
</style>

<script lang="ts">
import TableMixin from '../../../components/Table/TableMixin';
import MentorCityListDelegate from './MentorCityListDelegate';
import globals from '../../../globals';
import slotTemplate from './MentorCityListSlots.html';
import GroupMixin from '../../../components/Table/GroupMixin';
import FilterListMixin from '../../filter/FilterListMixin';
import FilterProperties from '../../filter/FilterProperties';
import MentorCityFilter from './MentorCityFilter.vue';
import Invitation from "./Invitation";

export default {
  mixins: [TableMixin, GroupMixin, FilterListMixin],

  components: {
    MentorCityFilter,
  },

  data() {
    const delegate = new MentorCityListDelegate();
    return {
      delegate,
      filterProperties: new FilterProperties('program', delegate),
      vueTableSlots: slotTemplate,
      tableIsReady: false,
      showDialog: false,
      invitation: new Invitation()
    };
  },

  created() {
    document.body.setAttribute('data-page', 'program-list');
  },

  destroyed() {
    document.body.removeAttribute('data-page');
    document.removeEventListener('keydown', this.focusMentorCitySearchBar);
  },

  async mounted() {
    this.app.showLoading();
    if (this.tableIsReady) {
      this.ready();
    }
    document.addEventListener('keydown', this.focusMentorCitySearchBar);
  },

  methods: {
    emailClicked(attributes) {
      const name = encodeURIComponent(`${attributes.field_mentor_city_first_name} ${attributes.field_mentor_city_last_name}`);
      window.location.href = `mailto:${name}<${attributes.field_mentor_city_email}>`;
    },

    openDeactivateDialog(rowData) {
      this.invitation = Invitation.createFromData(rowData);
      if(this.invitation.status === 'active') {
        this.showDialog = true;
      }
      else {
      }
      this.showDialog = true
    },

    async deactivateClicked() {
      this.showDialog = false;
      this.app.showLoading();
      await this.invitation.save();
      if(this.$route.params.offset != 0) {
        this.router.push(`/${globals.app.language.langcode}/admin/mentorcity`);
      }
      else {
        this.$refs['table-component'].refresh();
        window.scrollTo(0, 0);
      }
    },

    redirectToProgram(rowData) {
      this.router.push(`/${globals.app.language.langcode}/admin/programs/detail/${rowData.id}`);
    },

    tableReady() {
      this.tableIsReady = true;
      this.ready();
    },

    focusMentorCitySearchBar(event) {
      if (event.key.toLowerCase() === 'q' && event.altKey) {
        document.getElementById('mentor-city-search-bar')
          .focus();
      }
    },
  },
};
</script>
