<template>
  <div>
    <app-select :label='label'
                :options="options"
                @input="handleInput"
                mode="object"
    />
    <div class="md-style-scoped">
      <ul class="locations multi-picker">
        <li v-for="(option, i) in value">
          <md-chip class="md-primary" v-on:md-delete="remove(i)" md-deletable>{{ option.attributes ? option.attributes.title : option.name }}</md-chip>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import GooglePlace from "Models/GooglePlace";
  import BaseMixin from "../mixins/BaseMixin";

  export default {
    mixins: [BaseMixin],
    props: ['value', 'list', 'label'],
    data() {
      return {
        location: new GooglePlace(),
        options: []
      }
    },
    mounted() {
      this.options.push({name: "", value: ""})
      for(const row of this.list) {
        this.options.push({
          value: row.id,
          name: row.attributes.title
        })
      }
    },
    methods: {
      handleInput(selected: any) {
        this.$el.querySelector("select").selectedIndex = 0
        if(selected.value == '') {
          return
        }
        for(const option of this.value) {
          if(option.value == selected.value) {
            return
          }
          if(option.id == selected.value) {
            return
          }
        }
        this.value.push(selected)
      },
      remove(pos: number) {
        this.value.splice(pos, 1)
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