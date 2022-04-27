<template>
  <div id="results-list">

    <div class="results-list-header">

      <h1 class="results-list-header-results-summary">{{ subheadline }}</h1>
      <h2 class="results-list-header-headline">{{ t("app-search-results") }}</h2>

      <div class="results-list-header-re-search">
        <button class="compact" @click="searchAgain">{{ t("app-search-again") }}</button>
      </div>

      <div class="delivery-criteria-container">
        <div class="program-delivery" v-if="!search.attributes.national">
          <button class="compact" :class="search.attributes.delivery.indexOf('community') === -1 ? 'inactive' : ''" @click="onDeliveryClick('community')">{{ t("app-program-delivery-community-based") }}</button>
          <button class="compact" :class="search.attributes.delivery.indexOf('siteBased') === -1 ? 'inactive' : ''" @click="onDeliveryClick('siteBased')">{{ t("app-program-delivery-site-based") }}</button>
          <button class="compact" :class="search.attributes.delivery.indexOf('eMentoring') === -1 ? 'inactive' : ''" @click="onDeliveryClick('eMentoring')">{{ t("app-program-delivery-e-mentoring") }}</button>
        </div>

        <div class="results-list-header-search-criteria">
          <div class="search-criteria-wrapper">
            <search-criteria-list v-model="search.attributes.focus"
                                  ref="search-criteria-list-focus"
                                  name="search-criteria-focus"
                                  :options="searchOptionsFocusArea"
                                  @input="$emit('update-search')"
            />
            <button class="search-criteria" :class="search.attributes.focus != 'all' ? 'active' : ''" type="button" v-on:click.prevent.stop="onCriteriaClick('search-criteria-list-focus')">
              <span class="search-criteria-label">{{ t("app-focus-area") }}</span>
            </button>
          </div>
          <div class="search-criteria-wrapper">
            <search-criteria-list v-model="search.attributes.age"
                                  ref="search-criteria-list-age"
                                  name="search-criteria-age"
                                  :options="searchOptionsAgesProgramServes"
                                  @input="$emit('update-search')"
            />
            <button class="search-criteria" :class="search.attributes.age != 'all' ? 'active' : ''" type="button" v-on:click.prevent.stop="onCriteriaClick('search-criteria-list-age')">
              <span class="search-criteria-label">{{ t("app-ages") }}</span>
            </button>
          </div>
          <div class="search-criteria-wrapper">
            <search-criteria-list v-model="search.attributes.youth"
                                  ref="search-criteria-list-youth"
                                  name="search-criteria-youth"
                                  :options="searchOptionsYouthProgramServes"
                                  @input="$emit('update-search')"
            />
            <button class="search-criteria" :class="search.attributes.youth != 'all' ? 'active' : ''" type="button" v-on:click.prevent.stop="onCriteriaClick('search-criteria-list-youth')">
              <span class="search-criteria-label">{{ t("app-youth-served") }}</span>
            </button>
          </div>
          <div class="search-criteria-wrapper">
            <search-criteria-list v-model="search.attributes.typeOfMentoring"
                                  ref="search-criteria-list-type"
                                  name="search-criteria-type"
                                  :options="searchOptionsTypeOfMentoring"
                                  @input="$emit('update-search')"
            />
            <button class="search-criteria" :class="search.attributes.typeOfMentoring != 'all' ? 'active' : ''" type="button" v-on:click.prevent.stop="onCriteriaClick('search-criteria-list-type')">
              <span class="search-criteria-label">{{ t("app-mentoring-type") }}</span>
            </button>
          </div>
          <div class="search-criteria-wrapper" v-if="!search.attributes.national">
            <search-criteria-list v-model="search.attributes.distance"
                                  ref="search-criteria-list-distance"
                                  name="search-criteria-distance"
                                  :options="searchOptionsDistance"
                                  @input="$emit('update-search')"
            />
            <button class="search-criteria active" type="button" v-on:click.prevent.stop="onCriteriaClick('search-criteria-list-distance')">
              <span class="search-criteria-label">{{ t('app-distance-label', {distance: search.attributes.distance}) }}</span>
            </button>

          </div>
        </div>
      </div>
    </div>

    <div v-if="rows.length">
      <table id="results-list-table" class="ui-table clickable-rows" v-on:click.prevent="">
        <tbody>
        <tr v-for="(program, i) in rows" v-on:click.prevent="handleClick($props.id, program.UUID)">
          <td class="result-row">
            <div class="hover-indicator">
              <div class="hover-indicator-frag"></div>
              <div class="hover-indicator-frag"></div>
              <div class="hover-indicator-frag"></div>
              <div class="hover-indicator-frag"></div>
            </div>

            <div class="delivery" v-if="program.siteBased || program.communityBased || program.eMentoring">
              <span class="delivery-tip" v-if="program.communityBased">{{ t("app-program-delivery-community-based") }}</span>
              <span class="delivery-tip" v-if="program.siteBased">{{ t("app-program-delivery-site-based") }}</span>
              <span class="delivery-tip" v-if="program.eMentoring">{{ t("app-type-of-mentoring-e-mentoring") }}</span>
            </div>

            <div class="title">{{ program.title }}</div>
            <div v-if="program.organization_title" class="organization-title">{{ program.organization_title }}</div>
            <a v-if="program.siteBased && program.googleMapUrl" class="map-link" target="_blank" :href="program.googleMapUrl" onclick="event.stopPropagation()">
              <svg version="1.1" class="map-link-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                <path fill="#33C2B2" d="M78.96,79.17c-1.29-1.16-2.59-2.3-3.9-3.45c-2.63-2.28-5.31-4.53-8.04-6.75C61.56,64.53,55.88,60.22,50,56.06c-5.88,4.17-11.56,8.48-17.02,12.92c-2.73,2.22-5.41,4.47-8.04,6.75c-1.31,1.14-2.61,2.29-3.9,3.45c-5.1,4.58-10,9.29-14.68,14.09c1.59,1.63,3.44,3.01,5.5,4.06c1.96,1,4.06,1.68,6.24,2.06c2.16,0.36,4.36,0.56,6.56,0.58c1,0.02,2.02,0.04,3.02,0.04h3.58h37.45h3.58c1.02,0,2.02-0.02,3.02-0.04c2.22-0.04,4.42-0.22,6.58-0.58c2.16-0.38,4.28-1.06,6.24-2.06c2.06-1.05,3.91-2.43,5.5-4.06C88.95,88.46,84.06,83.76,78.96,79.17z" />
                <path fill="#0D5E99" d="M21.04,79.17c1.29-1.16,2.59-2.3,3.9-3.45c2.63-2.28,5.31-4.53,8.04-6.75c5.46-4.44,11.14-8.75,17.02-12.92C34.71,45.19,17.99,35.31,0.01,26.66C0.01,27,0,27.35,0,27.69c0,1.2,0,2.38,0,3.58v37.46c0,1.2,0,2.38,0,3.58c0,1,0.02,2.02,0.04,3.02c0.02,2.2,0.22,4.38,0.58,6.56c0.38,2.16,1.06,4.28,2.06,6.24c0.97,1.9,2.22,3.62,3.68,5.12C11.05,88.46,15.94,83.76,21.04,79.17z"/>
                <path fill="#FFAD29" d="M67.02,68.97c2.73,2.22,5.41,4.47,8.04,6.75c1.31,1.14,2.61,2.29,3.9,3.45c5.1,4.58,10,9.29,14.68,14.09c1.47-1.5,2.71-3.22,3.68-5.12c1-1.96,1.68-4.06,2.06-6.24c0.36-2.16,0.54-4.36,0.58-6.56c0.02-1,0.04-2.02,0.04-3.02v-2.1v-41v-1.52c0-0.35-0.01-0.69-0.01-1.03C82.01,35.31,65.29,45.19,50,56.06C55.88,60.22,61.56,64.53,67.02,68.97z"/>
                <path fill="#D91C1C" d="M99.38,18.11c-0.38-2.16-1.06-4.28-2.06-6.24C95.3,7.9,92.1,4.7,88.14,2.68c-1.96-1-4.08-1.68-6.24-2.06c-2.18-0.36-4.38-0.54-6.58-0.58C74.31,0.02,73.29,0,72.29,0h-3.58H31.27h-3.58c-1,0-2.02,0.02-3.02,0.04c-2.2,0.04-4.4,0.22-6.56,0.58C15.94,1,13.82,1.68,11.86,2.68C7.9,4.7,4.7,7.9,2.68,11.86c-1,1.96-1.68,4.06-2.06,6.24c-0.36,2.16-0.56,4.36-0.58,6.56C0.03,25.33,0.02,26,0.01,26.66C17.99,35.31,34.71,45.19,50,56.06c15.29-10.86,32.01-20.74,49.99-29.4c-0.01-0.66-0.01-1.33-0.03-1.99C99.94,22.47,99.74,20.27,99.38,18.11z"/>
                <path fill="#FFFFFF" d="M50,14.99c-17.8,0-28.35,19.52-14.92,38.24C48.62,72.1,50,85.01,50,85.01s1.38-12.9,14.92-31.78C78.35,34.51,67.8,14.99,50,14.99z"/>
                <circle fill="#9EB8BF" cx="50" cy="36.44" r="9"/>
              </svg>
              <div class="map-link-text">{{ program.physicalTip }}, click to view in Maps</div>
            </a>
            <div class="logos" v-if="program.logoUrl || program.organizationLogoUrl">
              <div class="logo program-logo" v-if="program.logoUrl">
                <img :src="program.logoUrl">
              </div>
              <div class="logo organization-logo" v-if="program.organizationLogoUrl">
                <img :src="program.organizationLogoUrl">
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>

      <pagination ref="pagination" :initial="this.$props.response.data.meta.pagination" />
    </div>

  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';
import SearchCriteriaList from '../../../components/SearchCriteriaList.vue';
import searchOptionsFocusArea from '../../search/searchOptionsFocusArea';
import searchOptionsAgesProgramServes from '../../search/searchOptionsAgesProgramServes';
import searchOptionsGrade from '../../search/searchOptionsGrade';
import searchOptionsYouthProgramServes from '../../search/searchOptionsYouthProgramServes';
import searchOptionsTypeOfMentoring from '../../search/searchOptionsTypeOfMentoring';
import searchOptionsDistance from '../../search/searchOptionsDistance';
import Pagination from './Pagination.vue';
import Result from '../Result';
import ProgramSearchDelivery from '../../search/ProgramSearchDelivery.vue';
import FeatureFlags from '../../../FeatureFlags';
import Manager from '../../../core/Manager';

export default {
  mixins: [BaseMixin],

  props: ['id', 'search', 'response'],

  components: {
    'search-criteria-list': SearchCriteriaList,
    'program-search-delivery': ProgramSearchDelivery,
    pagination: Pagination,
  },

  data() {
    const countryCode = BaseMixin.computed.countryCode();
    return {
      rows: [],
      headline: '',
      subheadline: '',
      search: this.$props.search,
      searchOptionsFocusArea: searchOptionsFocusArea(countryCode),
      searchOptionsAgesProgramServes: searchOptionsAgesProgramServes(countryCode),
      searchOptionsGrade: searchOptionsGrade(),
      searchOptionsYouthProgramServes: searchOptionsYouthProgramServes(countryCode),
      searchOptionsTypeOfMentoring: searchOptionsTypeOfMentoring(),
      searchOptionsDistance: searchOptionsDistance(countryCode),
    };
  },

  async mounted() {
    this.onBodyClick = () => {
      for (const id in this.$refs) {
        const ref = this.$refs[id];
        if (ref) ref.isOpen = false;
      }
      if (this.$refs.pagination) {
        this.$refs.pagination.paginationResultsPerPageVisible = false;
      }
    };
    document.querySelector('body').addEventListener('click', this.onBodyClick);
    this.refresh(this.$props.response);
  },

  beforeDestroy() {
    document.querySelector('body').removeEventListener('click', this.onBodyClick);
  },

  methods: {
    searchAgain() {
      if (FeatureFlags.NEW_RESULTS) {
        const path = Manager.getInstance().searchRole === 'mentor' ? 'become-a-mentor' : 'find-a-mentor';
        this.router.push(this.link(path));
      } else {
        this.router.push(this.link(''));
      }
    },

    handleClick(routeParamsId, programId) {
      if (FeatureFlags.NEW_RESULTS) {
        const roleParam = `?type=${Manager.getInstance().searchRole === 'mentor' ? 'become-a-mentor' : 'find-a-mentor'}`;
        this.router.push(this.link(`program/${programId}${roleParam}`));
      } else {
        this.router.push(this.link(`search/${routeParamsId}/apply/${programId}`));
      }
    },

    async refresh(response) {
      this.rows = [];
      response.data.data.forEach((row) => {
        this.rows.push(new Result(row));
      });

      this.headline = this.t('app-results-headline', {
        firstName: this.search.attributes.firstName,
      });

      const { total } = response.data.meta.pagination;

      let source = total == 1 ? 'app-us-results-subheadline-singular' : 'app-us-results-subheadline';
      if (this.countryCode == 'ca') {
        source = total == 1 ? 'app-ca-results-subheadline-singular' : 'app-ca-results-subheadline';
      }
      if (this.search.attributes.zip == 'app-national') {
        source = total == 1 ? 'app-results-nationwide-subheadline-singular' : 'app-results-nationwide-subheadline';
      }
      this.subheadline = this.t(source, {
        count: total,
        distance: this.search.attributes.distance,
      });

      await this.$nextTick();

      if (this.rows.length) {
        this.$refs.pagination.update(response.data.meta.pagination);
      }
    },

    onCriteriaClick(criteriaToToggle) {
      for (const id in this.$refs) {
        if (id != criteriaToToggle) {
          const ref = this.$refs[id];
          if (ref) ref.isOpen = false;
        } else {
          this.$refs[criteriaToToggle].toggle();
        }
      }
    },

    onDeliveryClick(deliveryToggle) {
      const index = this.search.attributes.delivery.indexOf(deliveryToggle);
      if (index == -1) {
        this.search.attributes.delivery.push(deliveryToggle);
      } else {
        if (this.search.attributes.delivery.length == 1) {
          return;
        }
        this.search.attributes.delivery.splice(index, 1);
      }
      this.$emit('update-search');
    },

  },

};
</script>
