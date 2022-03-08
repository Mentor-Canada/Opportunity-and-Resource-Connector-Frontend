<template>
  <div data-page="regions-add" data-content-width="wide" v-if="isReady">

    <md-dialog :md-active.sync="showRemoveConfirmation">
      <md-dialog-title>{{ t("app-are-you-sure") }}</md-dialog-title>
      <md-dialog-content>{{ t("app-are-you-sure-you-want-to-delete") }} <i>{{ region.attributes.title }}</i>. <b>{{ t("app-cannot-be-undone") }}</b></md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showRemoveConfirmation = false">{{ t("app-cancel") }}</md-button>
        <md-button class="md-primary" @click="remove()">{{ t("app-delete") }}</md-button>
      </md-dialog-actions>
    </md-dialog>

    <div class="page-header with-breadcrumbs typography">
      <h1>{{ title }}</h1>
      <breadcrumbs :trail="trail"></breadcrumbs>
    </div>

    <form @submit.prevent="save" class="standard-form-style">

      <div class="tabs" v-if="$route.params.id">
        <button class="compact" type="button" @click="onServiceAreasClick">
          {{ t("app-service-areas") }}
        </button>
      </div>

      <div class="ui-form-row">
        <app-input name="title-input"
                   v-model="region.attributes.title"
                   required="required"
                   type="text"
                   label="Title"
        />
      </div>

      <div class="ui-form-row">
        <legend>{{ t("app-administrators") }}</legend>
        <a @click="onAddUser()">
          <button type="button" class="compact">{{ t('app-add-organization-new-administrator-button') }}</button>
        </a>
        <add-user ref="add-user"
                  :entityId="$route.params.id"
                  queue="true"
                  @change="onNewAdministrator"
        />
        <fieldset>
          <div class="md-style-scoped">
            <user-reference :value="region.accounts"></user-reference>
          </div>
        </fieldset>
      </div>

      <div class="actions">
        <button class="danger" type="button" v-if="$route.params.id" @click="showRemoveConfirmation = true">
          {{ t("app-delete") }}
        </button>
        <button type="submit">
          {{ t("app-submit") }}
        </button>
      </div>

    </form>

  </div>
</template>

<script src="./RegionDetailPage.ts" />

<style lang="scss">
[data-page='regions-add'] {
  .tabs {
    margin-bottom: 60px
  }
}
</style>