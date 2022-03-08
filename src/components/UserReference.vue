<template>
  <div>
    <ul class="users">
      <li v-for="(account, i) in value">
        <md-chip class="md-primary" v-on:md-delete="removeAccount(i)" md-deletable>{{ account.mail }}</md-chip>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Accounts from "Models/UserAccounts";
  import UserAccount from "Models/UserAccount";
  import Vue from "../../node_modules/vue/dist/vue"
  import BaseMixin from "../mixins/BaseMixin";

  export default {
    props: ['value'],

    mixins: [BaseMixin],

    data() {
      return {
        accounts: [],
        userSearchValue: "",
        users: [],
      }
    },

    mounted() {
      this.getUsers()
    },

    methods: {
      async getUsers() {
        const accounts = new Accounts()
        let list = []
        await accounts.get(this.userSearchValue)
        accounts.list.forEach((item) => {
          let skip = false
          this.value.forEach((val) => {
            if (val.mail == item.mail) {
              skip = true
            }
          })
          if (!skip) list.push(item.mail)
        })
        this.users = list
      },

      async selectUser(mail) {
        Vue.nextTick(() => {
          this.userSearchValue = ""
        })
        const selectedAccount = new UserAccount()
        await selectedAccount.loadByMail(mail)
        this.value.push(selectedAccount)
      },

      removeAccount(i) {
        this.value.splice(i, 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-field:after,
  .med-field:before {
    display: none;
  }
  .md-search-field {
    margin: 0 !important;
    padding-top: 0 !important;
  }
  .md-autocomplete {
    margin: 0 !important;
    padding-top: 0 !important;
  }
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

<style lang="scss">

.md-field.md-autocomplete {
  box-shadow: none !important;
  border-radius: 0 !important;
  background: none !important;
  label {
    margin-top: 0 !important;
    letter-spacing: -0.0156371823em !important;
  }
  input {
    font-family: "Gotham SSm A", "Gotham SSm B", "Helvetica Neue", "Helvetica", sans-serif !important;
    font-weight: 400 !important;
    font-size: 16px !important;
    letter-spacing: -0.0156371823em !important;
    text-decoration: inherit !important;
    text-transform: inherit !important;
    display: flex !important;
    align-self: flex-end !important;
    width: 100% !important;
    height: 56px !important;
    padding: 12px 16px !important;
    color: rgba(#000, 0.87) !important;
    border-radius: 4px !important;
    background: #fff !important;
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    appearance: none !important;
    outline: none !important;
    caret-color: #0084ff !important;
    border: 1px solid rgba(0, 0, 0, 0.38) !important;
    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.76) !important;
    }
    &:focus {
      border: 2px solid #0084ff !important;
    }
  }
}

.md-autocomplete-box-content {
  margin: 5px 0;
  padding: 4px 0;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 0 1px rgba(#000, 0.2), 0 1px 1px rgba(#000, 0.075), 0 5px 5px rgba(#000, 0.0375), 0 10px 10px rgba(#000, 0.0375);
  .md-list-item-button.md-list-item-container.md-button-clean {
    display: block;
    width: 100%;
    border-radius: 0;
    padding: 10px 20px;
    color: #222;
    background: transparent;
    font-size: 13px;
    letter-spacing: -0.0052090466em;
    text-align: left;
    &:hover {
      background-color: rgba(#000, 0.03) !important;
    }
  }
}


</style>