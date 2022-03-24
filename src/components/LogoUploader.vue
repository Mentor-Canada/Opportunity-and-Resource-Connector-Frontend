<template>
  <div class="md-style-scoped" v-if="!value.url">
    <md-field>
      <label :for="$props.id">{{ t("app-logo") }}</label>
      <md-file :id="$props.id" accept=".png, .jpeg, .jpg" @change="changed" />
    </md-field>
  </div>
  <div class="logo-row" v-else>
    <img :src="value.url.href" />
    <div v-on:click="remove">
      <md-icon class="remove-button">close</md-icon>
    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from 'BaseMixin';

export default {
  mixins: [BaseMixin],

  props: ['value', 'id'],

  methods: {
    remove() {
      this.value.remove();
    },

    changed() {
      this.value.clear = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.logo-row {
  display: flex;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 200px;
    margin-right: 10px;
  }
  .remove-button {
    cursor: pointer;
  }
}
</style>
