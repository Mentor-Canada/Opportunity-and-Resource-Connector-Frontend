import WindowInterface from 'Interfaces/WindowInterface';
import BaseMixin from 'BaseMixin';
import Url from 'url-parse';
import template from './SignIn.html';

declare const window: WindowInterface;

export default {

  template,

  mixins: [BaseMixin],

  beforeRouteEnter(to, from, next) {
    document.querySelector('body').classList.add('loading');
    if (window.app.user.id) {
      let dest = to.query.dest || window.app.link('admin/profile');
      dest = dest.replace(window.location.origin, '');
      next(dest);
    } else {
      next();
    }
  },

  mounted() {
    const url = new Url((window as any).location.href, true);
    this.checkemail = url.query.checkemail === 'confirm';
    this.app.hideLoading();
  },

  data() {
    return {
      email: '',
      password: '',
      checkemail: false,
    };
  },

  methods: {
    submit() {
      window.app.user.signIn(this.email, this.password)
        .then((result) => {
          (window as any).location.href = this.$route.query.dest || '/';
        })
        .catch((result) => {
          this.$refs.emailInput.setError();
          this.$refs.passwordInput.setError(this.t('app-invalid-username-or-password'));
        });
    },

    clearError() {
      this.$refs.emailInput.clearError();
      this.$refs.passwordInput.clearError();
    },

  },
};
