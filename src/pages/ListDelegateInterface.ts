import CollectionRequestUrlBuilder from './CollectionRequestUrlBuilder';

export default interface ListDelegateInterface {

  urlBuilder(): CollectionRequestUrlBuilder
  transform(response: any)
  url: string
  csvUrl: string
  baseUrl: string

}
