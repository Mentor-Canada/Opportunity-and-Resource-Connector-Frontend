<template>
  <div class="map-pane">

    <div class="map-header control">

      <div class="search-using-map" v-show="!this.loading">
        <div class="ui-option-field-wrapper">

          <input type="checkbox"
                 id="search-using-map-toggle"
                 value="true"
                 v-model="updateSearch"
          />

          <div class="ui-checkbox-state-indicator ui-option-state-indicator">
            <svg viewBox="0 0 14 14"><path class="ui-checkbox-checkmark-path" fill="none" d="M1.01,7.53l3.72,3.72l8.57-8.5"/></svg>
          </div>
          <div class="ui-checkbox-secondary-indicator ui-option-secondary-indicator"></div>

        </div>

        <div class="ui-option-label">
          <label for="search-using-map-toggle">{{ t("app-search-as-i-move-the-map") }}</label>
        </div>
      </div>

      <div class="search-using-map-loading" :class="this.loading ? 'active' : ''">
        <div class="loading-animation">
          <div class="loading-animation-dot"></div>
          <div class="loading-animation-dot"></div>
          <div class="loading-animation-dot"></div>
          <div class="loading-animation-dot"></div>
        </div>
      </div>

    </div>

    <div class="zoom-controls control">
      <button type="button" class="zoom-controls-button">
        <span class="material-icons-outlined" @click="zoomIn">add</span>
      </button>
      <button type="button" class="zoom-controls-button">
        <span class="material-icons-outlined" @click="zoomOut">remove</span>
      </button>
    </div>

    <div id="map"></div>

  </div>
</template>

<script lang="ts">
import globals from "../../../globals"
import BaseMixin from "BaseMixin"
import ResultMap from "./ResultMap"
import ResultMapRequestBuilder from "./ResultMapRequestBuilder"
import RequestQueue from "../../../pages/RequestQueue"
import Result from "../Result"

export default {
  mixins: [BaseMixin],

  props: ['id', 'lat', 'lng'],

  data() {
    return {
      updateSearch: true,
      loading: true
    }
  },

  watch: {
    updateSearch() {
      if(this.updateSearch) {
        this.request.begin()
        this.$emit('center-changed', this.resultMap.getCenter().toJSON())
      }
    },
    loading() {
      this.$emit('loading-changed', this.loading)
    }
  },

  async mounted() {
    if(!this.$props.lat) {
      this.loading = false
      return
    }

    this.request = new RequestQueue()
    this.request.callback = async () => {
      await this.getMapResults()
      if(!this.request.queue) {
        this.loading = false
      }
      this.request.end()
    }

    this.resultMap = new ResultMap()
      .el(this.$el.querySelector('#map'))
      .searchId(this.$props.id)
      .lat(this.$props.lat)
      .lng(this.$props.lng)
      .onChange(() => {
        if(this.updateSearch) {
          this.request.begin()
        }
      })
      .onCenterChange(() => {
        if(this.updateSearch) {
          this.$emit('center-changed', this.resultMap.getCenter().toJSON())
        }
      })
      .render()
  },

  methods: {
    async getMapResults() {
      let latlng = this.resultMap.getCenter().toJSON()
      this.loading = true
      let lang = this.app.language.langcode
      let bounds = this.resultMap.getBounds()
      let builder = new ResultMapRequestBuilder()
          .lat(latlng.lat)
          .lng(latlng.lng)
          .langcode(lang)
        .id(this.$props.id)
        .bounds(bounds.toUrlValue())
      let response = await globals.api.get(builder.build())
      let results = Result.collection(response.data.data)
      this.resultMap.renderPrograms(results)
    },

    zoomIn() {
      let zoom = this.resultMap.map.getZoom()
      this.resultMap.map.setZoom(zoom + 1)
    },

    zoomOut() {
      let zoom = this.resultMap.map.getZoom()
      this.resultMap.map.setZoom(zoom - 1)
    },
  }

}
</script>

<style lang="scss" scoped>

@import "../../../variables";
@import "../../../common/fonts";

.map-header {
  $map-controls-breakpoint: 1200px;
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 44px;
  top: 25px;
  left: calc(50% - 150px);
  @media (max-width: $map-controls-breakpoint) {
    left: 25px;
  }
}

.control {
  user-select: none;
  overflow: hidden;
  background: rgba(#fff, 0.9);
  @supports (-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px)) {
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    background: rgba(#fff, 0.5);
  }
  border: 1px solid #fff;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(#000, 0.05), 0 3px 10px rgba(#000, 0.05);
}

.zoom-controls {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  top: 25px;
  right: 25px;
  .zoom-controls-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    background: transparent;
    border-radius: 0;
    color: #222;
    &:hover {
      background: rgba(#fff, 0.9);
      @supports (-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px)) {
        background: rgba(#fff, 0.375);
      }
    }
  }
  .material-icons-outlined {
    font-weight: normal;
    font-size: 24px;
  }
}

.search-using-map-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  &.active {
    opacity: 1;
  }
  .loading-animation {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  $loading-animation-range: 5px;
  $loading-animation-delay: 100ms;
  @keyframes loading-animation {
    0% {
      transform: translateY(-$loading-animation-range) scaleY(1.15);
    }
    50% {
      transform: translateY($loading-animation-range) scaleY(1);
    }
    100% {
      transform: translateY(-$loading-animation-range) scaleY(1.15);
    }
  }
  .loading-animation-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 0 5px;
    animation: loading-animation 625ms ease-in-out infinite;
    &:nth-child(1) {
      background: $mentor-red;
      animation-delay: ($loading-animation-delay * 0);
    }
    &:nth-child(2) {
      background: $mentor-yellow;
      animation-delay: ($loading-animation-delay * 1);
    }
    &:nth-child(3) {
      background: $mentor-green;
      animation-delay: ($loading-animation-delay * 2);
    }
    &:nth-child(4) {
      background: $mentor-soft-blue;
      animation-delay: ($loading-animation-delay * 3);
    }
  }
}

.search-using-map {
  display: flex;
  align-items: stretch;
  justify-content: center;

  .ui-option-label {
    display: flex;
    align-items: center;
    vertical-align: middle;
    label {
      cursor: pointer;
      padding: 0 0 0 2px;
      color: #000;
      line-height: normal;
      font-weight: 700;
      @include font-tracking(12);
    }
  }
  .ui-option-field-wrapper {
    position: relative;
    flex: 0 0 auto;
    box-sizing: content-box;
    width: 20px;
    height: 20px;
    padding: 10px;
    margin-left: -10px;
    margin-right: -5px;
    input {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      outline: none;
      cursor: pointer;
    }
    .ui-option-state-indicator {
      position: absolute;
      z-index: 1;
    }
    .ui-option-secondary-indicator {
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      &:before,
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        opacity: 0;
      }
      &:before {
        background-color: $ui-neutral;
        transition: opacity 90ms linear;
      }
      &:after {
        background-color: $ui-focus;
        transform: scale(0);
        transition: opacity 90ms linear, transform 270ms cubic-bezier(0.4, 0, 0.6, 1);
      }
    }
    input:hover ~ .ui-option-secondary-indicator:before {
      opacity: 0.1;
    }
    input:focus ~ .ui-option-secondary-indicator:after {
      opacity: 0.125;
      transform: scale(1);
    }
    input:checked:focus {
      & ~ .ui-option-secondary-indicator:before {
        opacity: 0;
      }
      & ~ .ui-option-secondary-indicator:after {
        opacity: 0.125;
        transform: scale(1);
      }
    }
  }
  .ui-checkbox-state-indicator {
    top: 11px;
    left: 11px;
    width: 18px;
    height: 18px;
    border-radius: 2px;
    border: 2px solid $ui-neutral-dark;
    background-color: transparent;
    transition: border-color 90ms, background-color 90ms;
    svg {
      display: block;
      transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
      stroke: #fff;
      stroke-width: 1.82px;
      stroke-dashoffset: 17.331287384033203;
      stroke-dasharray: 17.331287384033203;
    }
  }
  input:checked + .ui-checkbox-state-indicator {
    border-color: $ui-focus;
    background-color: $ui-focus;
    svg {
      stroke-dashoffset: 0;
    }
  }
}

</style>