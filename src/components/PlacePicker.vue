<template>
  <div class="place-picker">
    <app-input name="place-picker"
               v-model=value.title
               :required=required
               type="text"
               :label=label
               @input="$emit('placePickerStarted')"
    />
  </div>
</template>

<script lang="ts">
import WindowInterface from 'Interfaces/WindowInterface';

declare const window: WindowInterface;

export default {
  props: ['value', 'mode', 'label', 'required'],
  computed: {
    title() {
      return this.value.title;
    },
  },
  mounted() {
    const input: HTMLInputElement = this.$el.querySelector('input');
    const searchBox = new window.google.maps.places.SearchBox(input);

    if (this.mode === 'country') this.required = true;

    input.addEventListener('keypress', (e) => {
      if (e.keyCode != 13) return;
      e.preventDefault();
      return false;
    });

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }

      this.value.update(places[0]);
      if (this.mode == 'country') {
        this.value.title = this.value.getCountry();
        this.value.data.name = this.value.getCountry();
      } else {
        this.$emit('input', this.value);
      }

      this.$el.querySelector('input[name=place-picker]').setCustomValidity('');
      this.$emit('placePickerEnded');
    });
  },

};
</script>
