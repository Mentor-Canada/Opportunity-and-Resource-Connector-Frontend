import WindowInterface from "Interfaces/WindowInterface"
import {JSONAPIDocument} from "Models/JSONAPIDocument"
import globals from "../globals"
import ManagedFile from "Models/ManagedFile"
import RequestBuilder from "Models/RequestBuilder"
import ProgramFields from "../modules/programs/list/ProgramFields"
import OrganizationFields from "../modules/organizations/list/OrganizationFields"

declare const window: WindowInterface

export abstract class MultiLingualEntity {

  protected abstract serializeRelationships(): any
  protected abstract setData(data: any)
  protected abstract setIncluded(included: any)
  protected abstract setLocalizedAttributes(langcode: string, attributes: any): void
  protected abstract url: any
  protected abstract queryString: string

  public abstract attributes: any
  public abstract localizedAttributes: any
  public file: File
  public managedFile: ManagedFile = new ManagedFile()

  public document: JSONAPIDocument = new JSONAPIDocument()

  async save(): Promise<any> {
    const relationships = this.serializeRelationships()

    let postBody: any = {}
    postBody.nodes = {}
    postBody.uilang = window.app.language.langcode

    let create = !this.document.id
    if (create) {
      let doc = Object.assign({}, this.document)
      doc.attributes = {...this.attributes.serialize()}
      doc.relationships = relationships
      postBody.nodes['en'] = doc
    }

    // update translations
    for (const language of window.app.languages.list) {
      let doc: any = {}
      doc.id = this.document.id
      if (create) {
        if (language.langcode == 'en') continue
        doc = Object.assign(doc, this.document)
        if(this.type == 'program') {
          doc.attributes = this.attributes.serialize()
        }
        else {
          doc.attributes = {...this.attributes.serialize()}
        }
        doc.relationships = relationships
      } else {
        doc.id = this.document.id
        if(this.type == 'program') {
          doc.attributes = this.attributes.serialize()
        }
        else {
          doc.attributes = {...this.attributes.serialize(), ...this.localizedAttributes[language.langcode]}
          doc.attributes.title = this.localizedAttributes['en'].field_display_title
        }
        doc.relationships = relationships
        doc.type = this.document.type
      }
      postBody.nodes[language.langcode] = doc
    }
    if(this.type == 'organization') {
      postBody.additional = this.attributes.serializeAdditional()
      postBody.additional[OrganizationFields.displayTitle] = {}
      postBody.additional[OrganizationFields.description] = {}
      for (const language of window.app.languages.list) {
        postBody.additional[OrganizationFields.displayTitle][language.langcode] = this.localizedAttributes[language.langcode].field_display_title
        postBody.additional[OrganizationFields.description][language.langcode] = this.localizedAttributes[language.langcode].field_description
      }
    }

    if(this.type == "program") {
      postBody.additional = this.attributes.serializeAdditional()
      postBody.additional[ProgramFields.displayTitle] = {}
      postBody.additional[ProgramFields.description] = {}
      postBody.additional[ProgramFields.mentorDescription] = {}
      postBody.additional[ProgramFields.nsTrainingDescription] = {}
      for (const language of window.app.languages.list) {
        postBody.additional[ProgramFields.displayTitle][language.langcode] = this.localizedAttributes[language.langcode].field_display_title
        postBody.additional[ProgramFields.description][language.langcode] = this.localizedAttributes[language.langcode].field_description
        postBody.additional[ProgramFields.mentorDescription][language.langcode] = this.localizedAttributes[language.langcode].field_mentor_role_description
        postBody.additional[ProgramFields.nsTrainingDescription][language.langcode] = this.localizedAttributes[language.langcode].field_ns_training_description
      }
    }

    const data = new FormData()
    data.append('entityData', JSON.stringify(postBody))
    if(this.file) {
      data.append('files[logo]', this.file)
    }
    if(this.managedFile.clear) {
      data.append('clear_logo', "1")
    }

    let requestConfig = { headers: { 'Content-Type': 'multipart/form-data' } }
    let url = create ? this.createUrl : `${this.createUrl}/${this.document.id}`
    let response = await globals.api.post(url, data, requestConfig)
    this.document.id = response.data.data.id
  }

  async load(): Promise<any> {
    for (const language of window.app.languages.list) {
      let url = new RequestBuilder()
        .langcode(language.langcode)
        .resource(`${this.url}/${this.document.id}?${this.queryString}`)
        .build()
      let result = await window.api.get(url)
      if (language.langcode == globals.app.language.langcode) {
        this.setData(result.data.data, result.data.included)
        this.setIncluded(result.data.included)
      }
      if(result.data.data.attributes.langcode != language.langcode) {
        result.data.data.attributes = { langcode: language.langcode }
      }
      this.setLocalizedAttributes(language.langcode, result.data.data.attributes)
    }
  }

  async remove(): Promise<any> {
    await window.api.delete(`/en${this.url}/${this.document.id}`)
  }

  getValue(attribute: string) {
    let langcode = window.app.language.langcode
    return this.localizedAttributes[langcode][attribute]
  }

}