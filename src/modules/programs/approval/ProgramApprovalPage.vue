<template>
  <div class="page-body content-inner" data-content-width="wide" v-if="isReady">

    <md-dialog :md-active.sync="showRemoveConfirmation">
      <md-dialog-title>{{ t("app-are-you-sure") }}</md-dialog-title>
      <md-dialog-content>{{ t("app-are-you-sure-you-want-to-delete") }} <i>{{ program.localizedAttributes["en"].field_display_title }}</i>. <b>{{ t("app-cannot-be-undone") }}</b></md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showRemoveConfirmation = false">{{ t("app-cancel") }}</md-button>
        <md-button class="md-primary" @click="remove()">{{ t("app-delete") }}</md-button>
      </md-dialog-actions>
    </md-dialog>

    <div class="page-header typography">
      <h1>{{ t("app-program-approval") }}</h1>
    </div>

    <form v-if="isReady" v-on:submit.prevent="save()" class="standard-form-style">

      <fieldset>
        <legend>{{ t("app-program-settings-approval", {programName: program.localizedAttributes["en"].field_display_title}) }}</legend>

        <fieldset>
          <legend>{{ t('app-current-status') }}: <span :class="approvalStatusColor">{{ t(`${approvalStatusValue}`) }}</span></legend>
          <div class="ui-form-row">
            <div class="description">{{ t("app-program-settings-description") }}</div>
          </div>
        </fieldset>

        <div class="ui-form-row">
          <vuetable ref="my-vuetable"
                    :api-url="url"
                    :http-fetch="getData"
                    :transform="transformData"
                    :fields="fields"
                    :sort-order="sortOrder"
                    :show-sort-icons="true"
                    :css="{ tableClass: 'ui-table' }"
                    :no-data-template="t('app-no-data-available')"
          />
        </div>
        <div class="ui-form-row col-2">
          <app-radios v-model="approval.attributes.status"
                      name="approval"
                      :label='t("app-approval-program")'
                      :options="optionsApproval"
          />
          <fieldset v-if="approval.attributes.status">
            <div class="ui-form-row">
              <legend>{{ t("app-approval-notes-legend") }}</legend>
              <div class="description">{{ t("app-approval-notes-description") }}</div>
            </div>
            <app-textarea
              v-model="approval.attributes.notes"
              :label="t('app-approval-notes')"
              :rows="2"
            />
          </fieldset>
        </div>

        <div class="ui-form-row">
          <button v-if="approval.attributes.status"
                  @click.prevent="clearApproval"
                  class="compact"
          >
            {{ t("app-clear-approval") }}
          </button>
        </div>
      </fieldset>

      <program-actions active="approval" :program="program" />

    </form>

  </div>
</template>

<script src="./ProgramApprovalPage.ts" />
