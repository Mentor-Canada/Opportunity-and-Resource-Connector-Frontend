interface EntityInterface {
  load: () => Promise<any>
  save: () => Promise<any>
  document: JSONAPIDocumentInterface
}
