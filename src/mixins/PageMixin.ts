import WindowInterface from 'Interfaces/WindowInterface';

declare const window: WindowInterface;

export default {
  async mounted() {
    (document as any).fonts.ready.then(() => {
      if (window.app.view.isAdminPage && window.app.adminNavWidth === 0) {
        window.app.adminNavWidth = window.app.getAdminNavWidth();
        window.app.adminResize();
      }
    });
    this.app.view.isAdminPage = this.isAdminPage;
  },

};
