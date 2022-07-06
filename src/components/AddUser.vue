<template>
  <md-dialog :md-active.sync="show" :id="`view-uid-${viewId}`" class="add-user-dialog">

    <md-dialog-title v-if="title">{{ t("app-add-new-administrator", {title: title}) }}</md-dialog-title>
    <md-dialog-title v-else>{{ t("app-add-new-administrator-no-title") }}</md-dialog-title>

    <form v-on:submit.prevent="save()" class="standard-form-style">

      <div class="ui-form-row">
        <div class="description description-small">{{ t("app-email-reference-tip") }}</div>
      </div>
      <div class="input-loading">
        <app-input v-model=mail
                   type="text"
                   required="true"
                   :label="t('app-email')"
        />
        <svg :data-loading="loading" version="1.1" class="loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20" height="20" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
          <path d="M10,20C4.49,20,0,15.51,0,10S4.49,0,10,0s10,4.49,10,10c0,2.67-1.04,5.18-2.93,7.07l-1.42-1.41C17.17,14.15,18,12.14,18,10c0-4.41-3.59-8-8-8s-8,3.59-8,8s3.59,8,8,8V20z"/>
        </svg>
      </div>
      <ul class="user-list">
          <li v-for="account in accounts.list" :key="account.id">
            <a @click="save(account.data.attributes.mail, account)">
              <div class="user-name" v-if="account.firstName">{{ account.firstName }} {{ account.lastName }}</div>
              <div class="user-name" v-else>{{ account.data.attributes.mail }}</div>
              <div class="user-email" v-if="account.firstName">{{ account.data.attributes.mail }}</div>
            </a>
          </li>
          <li v-show="newUser">
            <a @click="save(mail)">
              <div class="user-name">
                <span class="user-new-tip">{{ t("app-add-user-add") }}</span> {{ mail }} <span class="user-new-tip">{{ t("app-add-user-as-an-administrator") }}</span>
              </div>
            </a>
          </li>
          <li v-show="noResults">
            <div class="user-no-results">
              <span>{{ t("app-add-user-no-matches") }}</span>
            </div>
          </li>
      </ul>

    </form>

    <div class="actions">
      <button class="compact neutral" @click="show = false">{{ t("app-cancel") }}</button>
    </div>

  </md-dialog>
</template>

<script lang="ts">
import UserAccounts from 'Models/UserAccounts';
import BaseMixin from '../mixins/BaseMixin';

export default {
  mixins: [BaseMixin],

  props: ['entity', 'title', 'queue'],

  data() {
    return {
      id: this._uid,
      accounts: new UserAccounts(),
      show: false,
      viewId: this._uid,
      mail: '',
      newUser: false,
      noResults: false,
      input: null,
      loading: false,
      refreshNeeded: false,
    };
  },

  watch: {
    mail(newValue, oldValue) {
      if (this.loading) {
        this.refreshNeeded = true;
        return;
      }

      const search = async () => {
        if (this.mail == '') {
          this.accounts.list = [];
          this.newUser = false;
          this.noResults = false;
          this.loading = false;
          this.refreshNeeded = false;
          return;
        }
        this.loading = true;
        await this.accounts.get(this.mail);
        this.newUser = false;
        this.noResults = false;
        if (!this.accounts.list.length) {
          if (this.mail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && !this.queue) {
            this.newUser = true;
          } else {
            this.noResults = true;
          }
        }
        if (this.refreshNeeded) {
          this.refreshNeeded = false;
          await search();
        } else {
          this.loading = false;
        }
      };

      search();
    },

    async show(newValue, oldValue) {
      if (newValue) {
        await this.nextTick();
        const el = document.body.querySelector(`#view-uid-${this.id}`);
        this.input = el.querySelector('input');
      } else {
        this.mail = '';
      }
    },
  },

  methods: {
    async save(mail?, account?) {
      if (!mail) mail = this.mail;
      if (!this.queue) {
        this.loading = true;
        const data = {
          uilang: this.app.language.langcode,
        };
        await this.api.post(`a/app/${this.entity.type}/${this.entity.document.id}/administrator/${mail}`, data)
          .then(() => {
            this.$emit('change');
          })
          .catch(() => {});
        this.loading = false;
        this.show = false;
        this.mail = '';
      } else {
        this.show = false;
        this.$emit('change', account);
      }
    },
  },

};
</script>

<style lang="scss">
.input-loading {
  position: relative;
  margin-bottom: 0;
  input {
    padding-right: 40px !important;
  }
}
</style>

<style scoped lang="scss">

form {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow: hidden;
  padding: 12px 24px 0 24px;
}
ul.user-list {
  height: 100%;
  max-height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 1.75em;
  li:first-child {
    margin-top: calc(1.75em - 10px);
  }
  li a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 60px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    &:hover {
      text-decoration: none;
      background: darken(#f6f9fc, 3%);
    }
    .user-name {
      font-size: 13px;
      font-weight: 700;
      color: #000;
    }
    .user-email {
      font-size: 11px;
      color: #444;
      margin-top: 0.25em;
    }
    .user-new-tip {
      font-weight: 400;
    }
  }
  li .user-no-results {
    margin-top: calc(1.75em - 10px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 60px;
    padding: 10px 0;
    border-bottom: 1px solid transparent;
    span {
      font-size: 13px;
      font-weight: 700;
      color: #aaa;
    }
  }
}

.loading {
  position: absolute;
  top: 50%;
  right: 10px;
  margin-top: -7.5px;
  width: 20px;
  height: 20px;
  z-index: 1;
  fill: #0095ff;
  opacity: 0;
  transition: opacity 200ms;
  pointer-events: none;
  @keyframes load-rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  animation: load-rotating 300ms linear infinite;
  &[data-loading="true"] {
    opacity: 1;
  }
}
.actions {
  padding: 0 24px 24px 24px;
  text-align: right;
}

</style>
