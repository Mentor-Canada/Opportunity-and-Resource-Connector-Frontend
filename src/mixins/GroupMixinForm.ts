import globals from "../globals"

export default {

  methods: {
    onTitleInput() {
      if(globals.app.languages.list.length == 1) {
        return
      }
      let secondaryLangcode = this.app.languages.getSecondaryLangcode()
      let inputCurrentLang: HTMLInputElement = this.$el.querySelector("#title-input-en input")
      let inputOtherLang: HTMLInputElement = this.$el.querySelector(`#title-input-${secondaryLangcode} input`)
      if(this.currentLanguage == secondaryLangcode) {
        inputCurrentLang = this.$el.querySelector(`#title-input-${secondaryLangcode} input`)
        inputOtherLang = this.$el.querySelector("#title-input-en input")
      }

      if(inputCurrentLang.value == '' && inputOtherLang.value != '') {
        inputCurrentLang.removeAttribute('required')
        inputOtherLang.setAttribute('required', 'required')
      } else {
        inputCurrentLang.setAttribute('required', 'required')
        inputOtherLang.removeAttribute('required')
      }
    },

    onDescriptionInput(label: string) {
      if(globals.app.languages.list.length == 1) {
        return
      }

      let secondaryLangcode = this.app.languages.getSecondaryLangcode()
      let inputCurrentLang: HTMLTextAreaElement = this.$el.querySelector(`#${label}-input-en textarea`)
      let inputOtherLang: HTMLTextAreaElement = this.$el.querySelector(`#${label}-input-${secondaryLangcode} textarea`)
      if(this.currentLanguage == secondaryLangcode) {
        inputCurrentLang = this.$el.querySelector(`#${label}-input-${secondaryLangcode} textarea`)
        inputOtherLang = this.$el.querySelector(`#${label}-input-en textarea`)
      }

      if(inputCurrentLang.value == '' && inputOtherLang.value != '') {
        inputCurrentLang.removeAttribute('required')
        inputOtherLang.setAttribute('required', 'required')
      } else {
        inputCurrentLang.setAttribute('required', 'required')
        inputOtherLang.removeAttribute('required')
      }
    },

  },

}