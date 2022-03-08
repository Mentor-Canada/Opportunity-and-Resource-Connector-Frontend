<template>
  <div>
    <place-picker
        :value="location"
        :label=label
        @input="handleInput"
    />
    <ul class="locations multi-picker md-style-scoped">
      <li v-for="(location, i) in value">
        <md-chip class="md-primary" v-on:md-delete="remove(i)" md-deletable>{{ location.title }}</md-chip>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import GooglePlace from "Models/GooglePlace";

  export default {
    props: ['value', 'label'],
    data() {
      return {
        location: new GooglePlace(),
      }
    },
    methods: {
      handleInput(place: any) {
        this.$emit('add', place)
      },

      remove(pos: number) {
        this.value.splice(pos, 1)
        this.$emit('remove', pos)
      },

      add(place) {
        let aPlace = new GooglePlace(place.data)
        this.value.push(aPlace)
        this.location = new GooglePlace()
      }
    }
  }
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
