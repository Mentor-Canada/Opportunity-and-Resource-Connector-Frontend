import BaseMixin from "BaseMixin"
import WindowInterface from "Interfaces/WindowInterface"
import Search from "Models/Search"
import PageMixin from "../../mixins/PageMixin"
import template from "./Search.html"
import PostalCode from "./PostalCode.vue"
import searchOptionsTypeOfMentoring from "./searchOptionsTypeOfMentoring"
import searchOptionsFocusArea from "./searchOptionsFocusArea"
import searchOptionsAgesProgramServes from "./searchOptionsAgesProgramServes"
import searchOptionsYouthProgramServes from "./searchOptionsYouthProgramServes"
import searchOptionsGrade from "./searchOptionsGrade"
import searchOptionsDistance from "./searchOptionsDistance"
import SearchOptions from "./SearchOptions"
import OptionCollection from "Models/OptionCollection"
import ProgramSearchDelivery from "./ProgramSearchDelivery.vue"

declare const window: WindowInterface

export default {

  template: template,

  mixins: [BaseMixin, PageMixin],

  components: {
    'postal-code': PostalCode,
    'program-search-delivery': ProgramSearchDelivery
  },

  data() {
    let search = new Search()
    search.attributes.loadUserParams()
    return {
      search: search,
      optionsRoleInMentoring: [
        {value: "mentor", name: this.t("app-become-a-mentor")},
        {value: "mentee", name: this.t("app-become-a-mentee")},
      ],
      deliveryOptions: (new OptionCollection())
        .add("community", "app-delivery-community")
        .add("site", "app-delivery-site")
        .add("eMentoring", "app-delivery-eMentoring")
        .options,
      optionsTypeOfMentoring: searchOptionsTypeOfMentoring(),
      optionsGrades: searchOptionsGrade(),
      optionsHowDidYouHearAboutUs: [],
      options: new SearchOptions(),
      animate: false
    }
  },

  computed: {
    optionsDistanceToMentoring() {
      return searchOptionsDistance(this.countryCode)
    },
    optionsFocusArea() {
      return searchOptionsFocusArea(this.countryCode)
    },
    optionsAgesProgramServes() {
      return searchOptionsAgesProgramServes(this.countryCode)
    },
    optionsYouthProgramServes() {
      return searchOptionsYouthProgramServes(this.countryCode)
    },
  },

  mounted() {
    document.querySelector("body").classList.add("page-search")
    if(this.countryCode == 'us') {
      this.search.attributes.distance = "25"
    }
    this.animate = true
    this.ready()
  },

  methods: {
    submit() {
      this.app.showLoading()
      this.search.attributes.updateUserParams()
      this.search.save()
        .then(id => {
          this.router.push(this.link(`search/${id}`))
        })
    }
  }
}

