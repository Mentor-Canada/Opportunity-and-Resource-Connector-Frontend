import WindowInterface from 'Interfaces/WindowInterface';
import BaseMixin from 'BaseMixin';
import template from './CompleteRegistration.html';

declare const window: WindowInterface;

export default {

  mixins: [BaseMixin],

  async beforeRouteEnter(to, from, next) {
    document.querySelector('body').classList.add('loading');
    if (window.app.user.id) {
      await window.app.user.signOut();
      window.location.reload();
    } else {
      next();
    }
  },

  template,

  async mounted() {
    this.app.showLoading();
    const url = `${API_URL}/${window.app.language.langcode}/a/complete-registration/${this.$route.query.email}`;
    const result = await window.api.get(url);
    if (result.data.redirect == true) {
      const urlParams = new URLSearchParams(window.location.search);
      const dest = urlParams.get('dest');
      this.router.push(this.link(`sign-in?dest=${dest}`));
    }
    this.firstName = result.data.firstName;
    this.lastName = result.data.lastName;
    this.ready();
  },

  data() {
    let name = this.$route.query.email;
    name = name.replace(' ', '+');
    return {
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      termsOfService: false,
      name,
      temp_pass: this.$route.query.otp,
    };
  },

  methods: {
    async submit() {
      if (this.password != this.confirmPassword) {
        this.$refs.passwordInput.setError();
        this.$refs.passwordConfirmInput.setError(this.t('app-password-must-match'));
        return;
      }

      const { dest } = this.$route.query;

      this.app.showLoading();
      const data = {
        name: this.name,
        temp_pass: this.temp_pass,
        new_pass: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      };

      window.api.post(
        '/a/complete-registration?_format=json',
        data,
        { headers: { 'content-type': 'application/json' } },
      )
        .then((result) => {
          window.location.href = this.$route.query.dest;
        })
        .catch((result) => {
          window.app.hideLoading();
          this.showRemoveConfirmation = true;
        });
    },
    async newLink() {
      await this.router.push(this.link(`forgot?email=${this.name}`));
    },

    clearError() {
      this.$refs.passwordInput.clearError();
      this.$refs.passwordConfirmInput.clearError();
    },

    termsOfServiceDisabled() {
      if (this.termsOfService) return 'false';
      return 'true';
    },

  },
};
