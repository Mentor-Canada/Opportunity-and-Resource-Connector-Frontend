export default {

  async mounted() {
    await this.filterProperties.filters?.load();
  },

  methods: {
    async saveFilter() {
      this.app.showLoading();
      this.filterProperties.filter.attributes.data = JSON.stringify(this.delegate.filter);
      await this.filterProperties.filter.save();
      await this.filterProperties.filters.load();
      this.app.hideLoading();
    },

    async deleteFilter(filter) {
      this.app.showLoading();
      await filter.delete();
      const index = this.filterProperties.filters.collection.indexOf(filter);
      this.filterProperties.filters.collection.splice(index, 1);
      this.app.hideLoading();
    },

    showSaveFilterDialog() {
      this.$refs['filter-panel'].$refs['filter-component'].$refs['save-filter-dialog'].show = true;
    },

    showDeleteFilterDialog(filter) {
      this.$refs['filter-panel'].$refs['filter-component'].$refs['delete-filter-confirm-dialog'].show(filter);
    },
  },
};
