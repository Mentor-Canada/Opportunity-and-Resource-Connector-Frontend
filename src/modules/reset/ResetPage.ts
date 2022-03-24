import WindowInterface from 'Interfaces/WindowInterface';
import BaseMixin from 'BaseMixin';
import template from './Reset.html';

declare const window: WindowInterface;

export default {

  mixins: [BaseMixin],

  beforeRouteEnter(to, from, next) {
    document.querySelector('body').classList.add('loading');
    if (window.app.user.id) {
      window.app.user.signOut();
      next();
    } else {
      next();
    }
  },

  template,

  mounted() {
    this.app.hideLoading();
  },

  data() {
    return {
      password: '',
      confirmPassword: '',
      name: this.$route.query.email,
      temp_pass: this.$route.query.otp,
      showSuccessDialog: false,
    };
  },

  methods: {
    async submit() {
      if (this.password != this.confirmPassword) {
        this.$refs.passwordInput.setError();
        this.$refs.passwordConfirmInput.setError(this.t('app-password-must-match'));
        return;
      }

      this.app.showLoading();
      const data = {
        name: this.name,
        temp_pass: this.temp_pass,
        new_pass: this.password,
      };

      window.api.post(
        '/user/lost-password-reset?_format=json',
        data,
        { headers: { 'content-type': 'application/json' } },
      )
        .then((result) => {
          window.app.hideLoading();
          this.showSuccessDialog = true;
        })
        .catch((result) => {
          window.app.hideLoading();
          this.showRemoveConfirmation = true;
        });
    },

    successOkay() {
      const dest = this.$route.query.dest || window.app.link('admin/profile');
      this.router.push(this.link(`sign-in?dest=${dest}`));
    },

    async newLink() {
      await this.router.push(this.link(`forgot?email=${this.name}`));
    },

    clearError() {
      this.$refs.passwordInput.clearError();
      this.$refs.passwordConfirmInput.clearError();
    },

  },
};
