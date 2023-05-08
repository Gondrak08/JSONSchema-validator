// utils/flattenFormData.ts
import { IJSONSchema } from "./interfaces/JsonSchema.interface";
import { FormData,FlattenedFormData } from "./types/types";

import createFlattenObject from "./createFlattenObject";

export default function flattenFormData(formData: FormData, schema?: IJSONSchema, arrPrefix?:any): FlattenedFormData {
  const flattenedObject: FlattenedFormData = {};
 
  if (schema) {
    for (const [key, value] of Object.entries(schema.properties || {})) {
      flattenedObject[key] = createFlattenObject(formData, value, `${key}.`, arrPrefix);
    }
  } else {
    for (const key in formData) {
      flattenedObject[key] = formData[key] || '';
      
    }
  }
  // console.log(flattenedObject);
  
  return flattenedObject;
}


