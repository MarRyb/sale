export interface  ICategory {
  id: number;
  name: string;
  children: Array<ICategory>;
  customFields: Array<ICustomFields>;
}
export interface  ICustomFields {
  id: number;
  name: string;
  type: string;
}
