<template>
  <md-dialog
    :md-active.sync="show"
    class="filter-dialog"
    @hide-dialog="show = false"
    @show-save-dialog="showSaveDialog"
    @show-delete-dialog="showDeleteDialog($event)"
  >
    <slot />
  </md-dialog>
</template>

<script lang="ts">
export default {
  data() {
    return {
      show: false,
    }
  },

  methods: {
    hide() {
      this.show = false
    },

    showSaveDialog(event) {
      this.show = false
      this.$emit('show-save-dialog')
    },

    showDeleteDialog(filter) {
      this.show = false
      this.$emit('show-delete-dialog', filter)
    }
  }
}
</script>

<style lang="scss">
@import "../../variables";
.filter-dialog {
  .md-dialog-container {
    background-color: darken($mentor-off-white, 2%) !important;
  }
}
</style>