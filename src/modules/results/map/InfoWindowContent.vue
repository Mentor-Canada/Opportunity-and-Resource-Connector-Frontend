<template>
  <div>
    <div class="result-map-info-window">
    <a :href="link(url)">
      <div class="tip" :class="result.programType">
        <span v-if="result.programType === 'virtual'" class="material-icons">stream</span>
        <span v-else class="material-icons">place</span>
        <span class="tip-text">{{ resultTip }}</span>
      </div>
      <div class="title">{{ result.title }}</div>
      <div v-if="result.organization_title" class="organization-title">{{ result.organization_title }}</div>
      <div class="logos" v-if="result.logoUrl || result.organizationLogoUrl">
        <div class="logo program-logo" v-if="result.logoUrl">
          <img :src="result.logoUrl">
        </div>
        <div class="logo organization-logo" v-if="result.organizationLogoUrl">
          <img :src="result.organizationLogoUrl">
        </div>
      </div>
    </a>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../../variables";
@import "../../../common/fonts";
$typography-color: #222;
.gm-style-iw button {display: none !important;}
.result-map-info-window {
  font-family: "Gotham SSm A", "Gotham SSm B", "Helvetica Neue", "Helvetica", sans-serif;
  width: 250px;
  padding: 15px 10px;
  .tip {
    display: flex;
    align-items: center;
    .material-icons {
      margin-right: 4px;
      margin-left: -4px;
    }
    &.virtual {
      .material-icons,
      .tip-text {
        color: $ui-primary;
      }
    }
    &.physical {
      .material-icons {
        color: $mentor-soft-blue;
      }
      .tip-text {
        color: rgba($typography-color, 0.75);
      }
    }
    .tip-text {
      line-height: normal;
      font-weight: 700;
      @include font-tracking(11);
    }
  }
  .title {
    margin-top: 4px;
    font-weight: 700;
    @include font-tracking(18);
    color: $typography-color;
  }
  .organization-title {
    margin-top: 2px;
    font-weight: 700;
    @include font-tracking(12);
    color: rgba($typography-color, 0.5);
  }
  .logos {
    display: flex;
    border-top: 1px solid rgba($mentor-white-blue-shade, 0.125);
    padding-top: 10px;
    margin-top: 10px;
    width: 100%;
    height: ($program-logos-max-height + 10px);
    .logo {
      display: flex;
      align-items: center;
      max-width: min(#{($program-logos-max-width / 2)}, 50%);
      height: $program-logos-max-height;
      padding-right: 20px;
      img {
        display: block;
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
    }
  }
}
</style>

<script>
import BaseMixin from "BaseMixin"

export default {
  mixins: [BaseMixin],

  data() {
    return {
      result: '',
      resultTip: '',
      url: ''
    }
  }

}
</script>
