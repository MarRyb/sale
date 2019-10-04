export interface  CategoryInterface {
  id: number;
  name: string;
  children: Array<CategoryInterface>;
  custom_fields: Array<CustomFieldsInterface>;
  isShowSubCategory: boolean;
}

export interface  CustomFieldsInterface {
  id: number;
  name: string;
  type: string;
}