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

      <router-link :to="link('become-a-mentor/programs/e-mentoring')">
        {{ $t('search-e-mentoring') }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';

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
      this.$router.push(this.link(`become-a-mentor/programs/${this.location}`))
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
