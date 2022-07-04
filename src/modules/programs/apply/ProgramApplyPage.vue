<template>
  <div :data-page="pageType" v-show="isReady">

    <div class="page-header">
      <div class="typography" data-content-width="wide">

        <div class="delivery" v-if="program.attributes.delivery.siteBased || program.attributes.delivery.community || program.attributes.delivery.eMentoring">
          <span class="delivery-tip" v-if="program.attributes.delivery.community">{{ t("app-program-delivery-community-based") }}</span>
          <span class="delivery-tip" v-if="program.attributes.delivery.siteBased">{{ t("app-program-delivery-site-based") }}</span>
          <span class="delivery-tip" v-if="program.attributes.delivery.eMentoring">{{ t("app-type-of-mentoring-e-mentoring") }}</span>
        </div>

        <h1 class="visually-h2">{{ pageHeader }}</h1>
        <div v-if="program.attributes.organizationTitle" class="subtitle">{{ program.attributes.organizationTitle }}</div>

        <a v-if="program.attributes.delivery.siteBased && googleMapUrl" class="map-link" target="_blank" :href="googleMapUrl" onclick="event.stopPropagation()">
          <svg version="1.1" class="map-link-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
            <path fill="#33C2B2" d="M78.96,79.17c-1.29-1.16-2.59-2.3-3.9-3.45c-2.63-2.28-5.31-4.53-8.04-6.75C61.56,64.53,55.88,60.22,50,56.06c-5.88,4.17-11.56,8.48-17.02,12.92c-2.73,2.22-5.41,4.47-8.04,6.75c-1.31,1.14-2.61,2.29-3.9,3.45c-5.1,4.58-10,9.29-14.68,14.09c1.59,1.63,3.44,3.01,5.5,4.06c1.96,1,4.06,1.68,6.24,2.06c2.16,0.36,4.36,0.56,6.56,0.58c1,0.02,2.02,0.04,3.02,0.04h3.58h37.45h3.58c1.02,0,2.02-0.02,3.02-0.04c2.22-0.04,4.42-0.22,6.58-0.58c2.16-0.38,4.28-1.06,6.24-2.06c2.06-1.05,3.91-2.43,5.5-4.06C88.95,88.46,84.06,83.76,78.96,79.17z" />
            <path fill="#0D5E99" d="M21.04,79.17c1.29-1.16,2.59-2.3,3.9-3.45c2.63-2.28,5.31-4.53,8.04-6.75c5.46-4.44,11.14-8.75,17.02-12.92C34.71,45.19,17.99,35.31,0.01,26.66C0.01,27,0,27.35,0,27.69c0,1.2,0,2.38,0,3.58v37.46c0,1.2,0,2.38,0,3.58c0,1,0.02,2.02,0.04,3.02c0.02,2.2,0.22,4.38,0.58,6.56c0.38,2.16,1.06,4.28,2.06,6.24c0.97,1.9,2.22,3.62,3.68,5.12C11.05,88.46,15.94,83.76,21.04,79.17z"/>
            <path fill="#FFAD29" d="M67.02,68.97c2.73,2.22,5.41,4.47,8.04,6.75c1.31,1.14,2.61,2.29,3.9,3.45c5.1,4.58,10,9.29,14.68,14.09c1.47-1.5,2.71-3.22,3.68-5.12c1-1.96,1.68-4.06,2.06-6.24c0.36-2.16,0.54-4.36,0.58-6.56c0.02-1,0.04-2.02,0.04-3.02v-2.1v-41v-1.52c0-0.35-0.01-0.69-0.01-1.03C82.01,35.31,65.29,45.19,50,56.06C55.88,60.22,61.56,64.53,67.02,68.97z"/>
            <path fill="#D91C1C" d="M99.38,18.11c-0.38-2.16-1.06-4.28-2.06-6.24C95.3,7.9,92.1,4.7,88.14,2.68c-1.96-1-4.08-1.68-6.24-2.06c-2.18-0.36-4.38-0.54-6.58-0.58C74.31,0.02,73.29,0,72.29,0h-3.58H31.27h-3.58c-1,0-2.02,0.02-3.02,0.04c-2.2,0.04-4.4,0.22-6.56,0.58C15.94,1,13.82,1.68,11.86,2.68C7.9,4.7,4.7,7.9,2.68,11.86c-1,1.96-1.68,4.06-2.06,6.24c-0.36,2.16-0.56,4.36-0.58,6.56C0.03,25.33,0.02,26,0.01,26.66C17.99,35.31,34.71,45.19,50,56.06c15.29-10.86,32.01-20.74,49.99-29.4c-0.01-0.66-0.01-1.33-0.03-1.99C99.94,22.47,99.74,20.27,99.38,18.11z"/>
            <path fill="#FFFFFF" d="M50,14.99c-17.8,0-28.35,19.52-14.92,38.24C48.62,72.1,50,85.01,50,85.01s1.38-12.9,14.92-31.78C78.35,34.51,67.8,14.99,50,14.99z"/>
            <circle fill="#9EB8BF" cx="50" cy="36.44" r="9"/>
              </svg>
          <div class="map-link-text">{{ physicalTip }}, click to view in Maps</div>
        </a>

        <div class="logos" v-if="logoUrl || organizationLogoUrl">
          <div class="logo program-logo" v-if="logoUrl">
            <img :src="logoUrl">
          </div>
          <div class="logo organization-logo" v-if="organizationLogoUrl">
            <img :src="organizationLogoUrl">
          </div>
        </div>

        <div class="search-actions" v-if="this.isSearchUrl">
          <button class="compact" @click="backToResults" v-if="manager.searchUrl">{{ t("app-back-to-search-results") }}</button>
          <button class="compact" @click="searchAgain">{{ t("app-search-again") }}</button>
        </div>
      </div>
    </div>

    <div class="program-apply-wrapper">
      <div id="program-apply-split" data-content-width="wide">

        <div class="details-pane">

          <div class="info-groups">

            <div class="info-group-label">{{ t("app-program-details") }}</div>

            <div class="info-group info-group-age">
              <div class="icon-wrapper">
                <div class="icon">
                  <div class="material-icons-outlined">supervisor_account</div>
                </div>
                <div class="icon-description">
                  <div class="age-range">
                    <template v-for="(range, i) in ages">
                      <div v-for="(age, j) in range" class="age-marker-wrapper"
                           :data-valid-age="isAgeRangeValid(range)"
                      >
                        <div class="age-marker">{{ age }}</div>
                      </div>
                    </template>
                  </div>
                  <div class="icon-description-label">{{ t("app-ages-served") }}</div>
                  <div class="icon-description-info info">
                    <span v-for="item in program.attributes.programAgesProgramServes" class="comma-span">{{ t(item.value) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="info-group" v-if="program.attributes.field_program_grades_served.length">
              <div class="icon-wrapper">
                <div class="icon">
                  <div class="material-icons-outlined">school</div>
                </div>
                <div class="icon-description">
                  <div class="icon-description-label">{{ t("app-grades-served") }}</div>
                  <div class="icon-description-info info">
                    <span v-for="grade in program.attributes.field_program_grades_served" class="comma-span">{{ grade.name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="info-group" v-if="program.attributes.primaryMeetingLocation">
              <div class="icon-wrapper">
                <div class="icon">
                  <div class="material-icons-outlined">place</div>
                </div>
                <div class="icon-description">
                  <div class="icon-description-label">{{ t("app-meeting-area") }}</div>
                  <div class="icon-description-info info">{{ t(program.attributes.primaryMeetingLocation) }}</div>
                </div>
              </div>
            </div>

            <div class="info-group">
              <div class="icon-wrapper">
                <div class="icon">
                  <div class="material-icons-outlined">{{ focusIcon }}</div>
                </div>
                <div class="icon-description">
                  <div class="icon-description-label">{{ t("app-program-focus") }}</div>
                  <div class="icon-description-info info">{{ t(program.attributes.focusArea) }}</div>
                </div>
              </div>
            </div>

          </div>

          <div class="info-groups">

            <div class="info-group-label">{{ t("app-types-of-mentoring") }}</div>

            <div :class="program.attributes.typesOfMentoring.length > 2 ? 'col-2-wrapper' : ''">
              <div class="info-group reduced-margin" v-for="type in program.attributes.typesOfMentoring">
                <div class="icon-wrapper center">
                  <div class="icon">
                    <div class="material-icons-outlined">{{ typeIcon(type.value) }}</div>
                  </div>
                  <div class="icon-description">
                    <div class="icon-description-label">{{ t(type.value) }}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="info-groups">
            <div class="info-group-label">{{ t("Description") }}</div>
            <div class="description info">{{ program.localizedAttributes[currentLanguage].field_description }}</div>
          </div>

          <div class="info-groups" v-if="this.application.attributes.role === 'mentor'">
            <div class="info-group-label">{{ t("app-mentor-role-description") }}</div>
            <div class="description info">{{ program.localizedAttributes[currentLanguage].field_mentor_role_description }}</div>
          </div>

          <div class="info-groups" v-if="true">
            <div class="info-group-label">{{ t("app-locations") }}</div>
            <div class="location-list" v-if="program.attributes.delivery.community">
              <div class="icon-description-label">{{ t("app-program-delivery-community-based") }}</div>
              <div v-for="(item) in program.attributes.delivery.communityLocations" class="info-item info">{{ t(item.data.formatted_address) }}</div>
            </div>
            <div class="location-list" v-if="program.attributes.delivery.siteBased">
              <div class="icon-description-label">{{ t("app-program-delivery-site-based") }}</div>
              <div v-for="(item) in program.attributes.delivery.siteBasedLocations" class="info-item info">{{ t(item.data.formatted_address) }}</div>
            </div>
            <div class="location-list" v-if="program.attributes.delivery.eMentoring">
              <div class="icon-description-label">{{ t("app-program-delivery-e-mentoring") }}</div>
                <div v-if="program.attributes.delivery.eMentoringServiceArea == 'app-nationwide'" class="info-item info">{{ t('app-country-name') }}</div>
              <div v-for="(item) in program.attributes.delivery.eMentoringLocations" class="info-item info">{{ t(item.data.formatted_address) }}</div>
            </div>
          </div>

          <div class="info-groups">
            <div class="info-group-label">{{ t("app-field-program-genders-served") }}</div>
            <div :class="program.attributes.programGendersProgramServes.length > 2 ? 'col-2-wrapper' : ''">
              <div v-for="(item) in program.attributes.programGendersProgramServes" class="info-item info">{{ t(item.value) }}</div>
            </div>
          </div>

          <div class="info-groups">
            <div class="info-group-label">{{ t("app-youth-served") }}</div>
            <div :class="program.attributes.programYouthServedProgramServes.length > 2 ? 'col-2-wrapper' : ''">
              <div v-for="(item) in program.attributes.programYouthServedProgramServes" class="info-item info">{{ t(item.value) }}</div>
            </div>
          </div>

          <div class="info-groups">
            <div class="info-group-label">{{ t("app-family-structures-served") }}</div>
            <div :class="program.attributes.programFamilyStructuresProgramServes.length > 2 ? 'col-2-wrapper' : ''">
              <div v-for="(item) in program.attributes.programFamilyStructuresProgramServes" class="info-item info">{{ t(item.value) }}</div>
            </div>
          </div>

        </div>

        <div class="apply-pane">
          <div class="apply-pane-deco">
            <div class="apply-pane-deco-item"></div>
            <div class="apply-pane-deco-item"></div>
            <div class="apply-pane-deco-item"></div>
            <div class="apply-pane-deco-item"></div>
          </div>
          <form v-on:submit.prevent="submit" class="standard-form-style">
            <fieldset>
              <legend class="fieldset-legend">
                <div class="legend-tip">{{ t("app-apply-to-program") }}</div>
                <div class="legend-title">{{ pageHeader }}</div>
              </legend>
              <div class="apply-pane-inputs">
                <app-input name="firstName"
                           v-model=application.attributes.firstName
                           required="required"
                           type="text"
                           :label='t("app-first-name")'
                />
                <app-input name="lastName"
                           v-model=application.attributes.lastName
                           required="required"
                           type="text"
                           :label='t("app-last-name")'
                />
                <app-input name="email"
                           v-model=application.attributes.email
                           required="required"
                           type="email"
                           :label='t("app-email")'
                />
                <div>
                  <app-input name="phone"
                             v-model=application.attributes.phone
                             :label='t("app-contact-phone")'
                             pattern="\d{10}"
                  />
                  <div>
                    <div class="phone-checkboxes">
                      <app-checkbox
                        :value="application.attributes.call"
                        :label="t('app-voice')"
                        @input="application.attributes.call = $event"
                      />
                      <app-checkbox
                        :value="application.attributes.sms"
                        :label="t('app-sms')"
                        @input="application.attributes.sms = $event"
                      />
                    </div>
                  </div>
                </div>
                <app-select v-model="application.attributes.howDidYouHearAboutUs"
                            name="program-apply-how-did-you-hear-about-us"
                            :label='t("app-how-did-you-hear-about-us")'
                            :options="optionsHowDidYouHearAboutUs"
                />
                <app-input v-if="application.attributes.howDidYouHearAboutUs === 'other'"
                           v-model="application.attributes.howDidYouHearAboutUsOther"
                           type="text"
                           :label="t('app-how-did-you-hear-about-us-other')"
                />
                <app-radios v-model="application.attributes.role"
                            name="program-apply-role"
                            required="true"
                            :label='t("app-search-role-in-mentoring")'
                            :options="optionsRoleInMentoring"
                            @input="setAccepting"
                />
              </div>
              <button class="apply-button" :type="accepting ? 'submit' : 'button'" :data-disabled="accepting ? 'false' : 'true'">
                {{ t("app-apply-to-program") }}
              </button>
              <div v-if="!accepting" class="no-apply-tip">
                <div v-if="application.attributes.role == 'mentor'">{{ t('app-not-accepting-mentors') }}</div>
                <div v-else>{{ t('app-not-accepting-mentees') }}</div>
              </div>
            </fieldset>
          </form>
        </div>

      </div>
    </div>

    <div id="more-results" v-if="this.showMoreResults">
      <div class="more-results-carousel">

        <div class="carousel-header">

          <div class="carousel-headline-range">
            <div class="carousel-headline">{{ t('app-more-results-from-your-search') }}</div>
            <div class="carousel-range">{{ moreResultsRange }}</div>
          </div>

          <div class="carousel-controls">
            <button id="carousel-button-prev" type="button" :aria-label="t('app-prev')">
              <span class="material-icons" aria-hidden="true">chevron_left</span>
            </button>
            <button id="carousel-button-next" type="button" :aria-label="t('app-next')">
              <span class="material-icons" aria-hidden="true">chevron_right</span>
            </button>
          </div>
        </div>

        <div v-for="program in moreResults" class="carousel-item">
          <button type="button" class="carousel-button" v-on:click.prevent="handleClick(program.UUID)">

            <div class="delivery" v-if="program.siteBased || program.communityBased || program.eMentoring">
              <span class="delivery-tip" v-if="program.communityBased">{{ t("app-program-delivery-community-based") }}</span>
              <span class="delivery-tip" v-if="program.siteBased">{{ t("app-program-delivery-site-based") }}</span>
              <span class="delivery-tip" v-if="program.eMentoring">{{ t("app-type-of-mentoring-e-mentoring") }}</span>
            </div>

            <div class="title">{{ program.title }}</div>
            <div v-if="program.organization" class="organization-title">{{ program.organization }}</div>

            <a v-if="program.siteBased" class="map-link" target="_blank" :href="program.googleMapUrl" onclick="event.stopPropagation()">
              <svg version="1.1" class="map-link-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                <path fill="#33C2B2" d="M78.96,79.17c-1.29-1.16-2.59-2.3-3.9-3.45c-2.63-2.28-5.31-4.53-8.04-6.75C61.56,64.53,55.88,60.22,50,56.06c-5.88,4.17-11.56,8.48-17.02,12.92c-2.73,2.22-5.41,4.47-8.04,6.75c-1.31,1.14-2.61,2.29-3.9,3.45c-5.1,4.58-10,9.29-14.68,14.09c1.59,1.63,3.44,3.01,5.5,4.06c1.96,1,4.06,1.68,6.24,2.06c2.16,0.36,4.36,0.56,6.56,0.58c1,0.02,2.02,0.04,3.02,0.04h3.58h37.45h3.58c1.02,0,2.02-0.02,3.02-0.04c2.22-0.04,4.42-0.22,6.58-0.58c2.16-0.38,4.28-1.06,6.24-2.06c2.06-1.05,3.91-2.43,5.5-4.06C88.95,88.46,84.06,83.76,78.96,79.17z" />
                <path fill="#0D5E99" d="M21.04,79.17c1.29-1.16,2.59-2.3,3.9-3.45c2.63-2.28,5.31-4.53,8.04-6.75c5.46-4.44,11.14-8.75,17.02-12.92C34.71,45.19,17.99,35.31,0.01,26.66C0.01,27,0,27.35,0,27.69c0,1.2,0,2.38,0,3.58v37.46c0,1.2,0,2.38,0,3.58c0,1,0.02,2.02,0.04,3.02c0.02,2.2,0.22,4.38,0.58,6.56c0.38,2.16,1.06,4.28,2.06,6.24c0.97,1.9,2.22,3.62,3.68,5.12C11.05,88.46,15.94,83.76,21.04,79.17z"/>
                <path fill="#FFAD29" d="M67.02,68.97c2.73,2.22,5.41,4.47,8.04,6.75c1.31,1.14,2.61,2.29,3.9,3.45c5.1,4.58,10,9.29,14.68,14.09c1.47-1.5,2.71-3.22,3.68-5.12c1-1.96,1.68-4.06,2.06-6.24c0.36-2.16,0.54-4.36,0.58-6.56c0.02-1,0.04-2.02,0.04-3.02v-2.1v-41v-1.52c0-0.35-0.01-0.69-0.01-1.03C82.01,35.31,65.29,45.19,50,56.06C55.88,60.22,61.56,64.53,67.02,68.97z"/>
                <path fill="#D91C1C" d="M99.38,18.11c-0.38-2.16-1.06-4.28-2.06-6.24C95.3,7.9,92.1,4.7,88.14,2.68c-1.96-1-4.08-1.68-6.24-2.06c-2.18-0.36-4.38-0.54-6.58-0.58C74.31,0.02,73.29,0,72.29,0h-3.58H31.27h-3.58c-1,0-2.02,0.02-3.02,0.04c-2.2,0.04-4.4,0.22-6.56,0.58C15.94,1,13.82,1.68,11.86,2.68C7.9,4.7,4.7,7.9,2.68,11.86c-1,1.96-1.68,4.06-2.06,6.24c-0.36,2.16-0.56,4.36-0.58,6.56C0.03,25.33,0.02,26,0.01,26.66C17.99,35.31,34.71,45.19,50,56.06c15.29-10.86,32.01-20.74,49.99-29.4c-0.01-0.66-0.01-1.33-0.03-1.99C99.94,22.47,99.74,20.27,99.38,18.11z"/>
                <path fill="#FFFFFF" d="M50,14.99c-17.8,0-28.35,19.52-14.92,38.24C48.62,72.1,50,85.01,50,85.01s1.38-12.9,14.92-31.78C78.35,34.51,67.8,14.99,50,14.99z"/>
                <circle fill="#9EB8BF" cx="50" cy="36.44" r="9"/>
              </svg>
              <div class="map-link-text">{{ program.physicalTip }}, click to view in Maps</div>
            </a>

            <div class="logos" v-if="program.logoUrl || program.organizationLogoUrl">
              <div class="logo program-logo" v-if="program.logoUrl">
                <img :src="program.logoUrl">
              </div>
              <div class="logo organization-logo" v-if="program.organizationLogoUrl">
                <img :src="program.organizationLogoUrl">
              </div>
            </div>
          </button>
        </div>

      </div>

      <div class="more-results-actions">
        <button type="button" @click="backToResults">
          <span class="material-icons">list</span>
          <span class="button-text">{{ t("app-back-to-search-results") }}</span>
        </button>
        <button type="button" @click="searchAgain">
          <span class="material-icons">youtube_searched_for</span>
          <span class="button-text">{{ t("app-search-again") }}</span>
        </button>
      </div>

    </div>

  </div>
</template>

<script src="./ProgramApplyPage.ts" />
