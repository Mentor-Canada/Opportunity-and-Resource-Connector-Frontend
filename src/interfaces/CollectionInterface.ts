import Organization from 'Models/Organization';

export interface CollectionInterface {
  list: EntityInterface[]
  load(search: string): Promise<any>
}
