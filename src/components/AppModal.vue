<template>
  <div class="app-modal-overlay" v-show="visible">
    <div class="app-modal">
      <div class="app-modal-deco">
        <div class="app-modal-deco-element"></div>
        <div class="app-modal-deco-element"></div>
        <div class="app-modal-deco-element"></div>
        <div class="app-modal-deco-element"></div>
      </div>
      <div class="app-modal-headline">{{ headline }}</div>
      <div class="app-modal-message">{{ message }}</div>
      <div class="app-modal-actions">
        <button>OK</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseMixin from "../mixins/BaseMixin"
import globals from "../globals"

export default {
  mixins: [BaseMixin],

  props: ["headline", "message"],

  data() {
    return {
      visible: true
    }
  },

  watch: {
    visible: () => {
      console.log("HERE")
    }
  },

  mounted() {
    this.$nextTick(() => {
      console.log("HELLO?")
    })
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "../variables";
@import "../common/fonts";
.app-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($mentor-off-white, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;

  .app-modal {
    position: relative;
    width: 90vw;
    max-width: 400px;
    max-height: 90vh;
    overflow: hidden;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgba(#000, 0.05), 0 9px 45px rgba(#000, 0.05), 0 27px 90px rgba(#000, 0.05);

    .app-modal-deco {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 6px;
      .app-modal-deco-element {
        flex: 1 0 auto;
        height: 100%;
        &:nth-child(1) {
          background: $mentor-red;
        }
        &:nth-child(2) {
          background: $mentor-yellow;
        }
        &:nth-child(3) {
          background: $mentor-green;
        }
        &:nth-child(4) {
          background: $mentor-soft-blue;
        }
      }
    }



  }

}
</style>