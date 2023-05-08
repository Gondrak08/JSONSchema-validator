// utils/getFormData.ts
import { FormData } from "./types/types";

export const getFormData = (form: HTMLFormElement): FormData => {
  const formData = new FormData(form);
  const data: FormData = {};

  formData.forEach((value, key) => {
    if (data.hasOwnProperty(key)) {
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]];
      }
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  return data;
};

export default getFormData;