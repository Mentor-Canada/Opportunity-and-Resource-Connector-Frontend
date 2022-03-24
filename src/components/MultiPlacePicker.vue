<template>
  <div :id="`view-uid-${id}`">
    <place-picker
        :value="location"
        :label=label
        @input="handleInput"
        @placePickerStarted="$emit('placePickerStarted')"
        @placePickerEnded="$emit('placePickerEnded')"
        :required="required"
    />
    <ul class="locations multi-picker md-style-scoped">
      <li v-for="(location, i) in value">
        <md-chip class="md-primary" v-on:md-delete="remove(i)" md-deletable>{{ location.title }}</md-chip>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import GooglePlace from 'Models/GooglePlace';

export default {
  props: ['value', 'label', 'required'],
  data() {
    return {
      id: this._uid,
      location: new GooglePlace(),
      input: null,
    };
  },
  async mounted() {
    const el = document.body.querySelector(`#view-uid-${this.id}`);
    this.input = el.querySelector('input');
    this.updateRequiredAttribute();
  },
  methods: {
    handleInput(place: any) {
      const aPlace = new GooglePlace(place.data);
      this.value.push(aPlace);
      this.location = new GooglePlace();
      this.$emit('input', this.value);
      this.$emit('add', aPlace);
      this.updateRequiredAttribute();
    },
    remove(pos: number) {
      this.$emit('remove', pos);
      this.updateRequiredAttribute();
    },
    updateRequiredAttribute() {
      if (this.required) {
        if (this.value.length) {
          this.input.removeAttribute('required');
        } else {
          this.input.setAttribute('required', 'required');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  margin: 5px -5px 0 -5px;
  li {
    display: inline-block;
    margin: 5px;
  }
  &:empty {
    margin: 0
  }
}
</style>
