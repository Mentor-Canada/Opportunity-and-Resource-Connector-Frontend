import globals from '../globals';

declare const API_URL: string;

export default {

  computed: {
    apiUrl() {
      return API_URL;
    },
    app() {
      return globals.app;
    },
    api() {
      return globals.api;
    },
    router() {
      return this.$router;
    },
    lang() {
      return this.app.language;
    },
    countryCode() {
      return globals.app.bootstrap.country;
    },
  },

  data() {
    let otherLanguage = null;
    const currentLanguage = globals.app.language.langcode;
    const sortedLanguages = globals.app.languages.list;
    sortedLanguages.sort((a, b) => {
      if (a.langcode === currentLanguage) {
        return -1;
      }
      return 1;

      return 0;
    });

    sortedLanguages.every((lang) => {
      if (lang.langcode !== currentLanguage) {
        otherLanguage = lang;
        return false;
      }
      return true;
    });
    return {
      isReady: false,
      showRemoveConfirmation: false,
      languages: sortedLanguages,
      currentLanguage,
      otherLanguage,
      isAdminPage: window.location.pathname.match(/\/.*\/admin($|\/.*)/) !== null,
    };
  },

  methods: {
    link(path: string): string {
      return globals.app.link(path);
    },

    languageToggle(language: string): string {
      const components = this.$router.currentRoute.fullPath.split('/');
      components[1] = language;
      return components.join('/');
    },

    languageSelect(payload) {
      window.location.href = this.languageToggle(payload.target.value);
    },

    ready() {
      this.isReady = true;
      this.app.hideLoading();
    },

    log(value: any) {
      console.log(value);
    },

    t(source: string, params?: any): string {
      return globals.app.t(source, params);
    },
  },

};
