<template>
  <div>
    <form class="standard-form-style" @submit.prevent="search">
      <app-input  v-model="location"
                  type="text"
                  :label="$t('search-location')"
                  required="true"
      />
      <button>
        {{ t("app-search") }}
      </button>
    </form>
    <div class="typography">
      <div class="visually-h3">or</div>

      <a @click.prevent="eMentoring">
        {{ $t('search-e-mentoring') }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';
import Search from 'Models/Search';

export default {
  mixins: [BaseMixin],

  data() {
    return {
      location: ''
    }
  },

  mounted() {
    this.ready();
  },

  methods: {
    search() {
      this.updateSearchMetrics(this.location);
      this.$router.push(this.link(`find-a-mentor/programs/${this.location}`));
    },

    eMentoring() {
      this.updateSearchMetrics('app-national');
      this.$router.push(this.link(`find-a-mentor/programs/e-mentoring`));
    },

    updateSearchMetrics(location) {
      this.search = new Search();
      this.search.attributes.role = 'mentee';
      this.search.attributes.zip = location;
      this.search.save();
    }
  }
}
</script>

<style scoped lang="scss">
.visually-h3 {
  margin: 20px 0;
  text-align: center;
}
</style>
