export type FormData = Record<string, any>;

export type FlattenedFormData = {
  // [key: string]: string;
  [key: string]: string | string[] | FlattenedFormData;
};