import { IJSONSchema } from "./interfaces/JsonSchema.interface";
import { FormData } from "./types/types";


export const createFlattenObject = (name: any, state: any, form: FormData, schema: IJSONSchema, arrayPrefix = '', arrPrefix?: any, objectListIndex?: any): any => {
  const formData = { ...form }
  const nestedArray: any = arrayPrefix.split('.');

  if (schema.type === 'object' && schema.properties) {
    
    const parentObject = state[nestedArray.slice(0, -1)];
    const nestedObject = parentObject ? JSON.parse(JSON.stringify(parentObject)) : {};

    for (const [key, prop] of Object.entries(schema.properties)) {
      if (prop.type === 'object' && prop.properties) {
        nestedObject[key] = createFlattenObject(name, state, formData, prop, `${arrayPrefix}${key}.`);
      } else if (prop.type === 'array' && prop.items) {
        const arrObj: any = [...(state[arrayPrefix.slice(0, -1)]?.[key] || [])]
        const index = objectListIndex !== undefined ? objectListIndex : arrObj.length;
        const newObj = createFlattenObject(name, state, formData, prop.items, `${arrayPrefix}${key}.${index}`);
        if (Object.keys(newObj).length !== 0) {
          const existingObj = arrObj[index];
          const newObj = existingObj ? { ...existingObj } : {}; // clona o objeto existente, se houver
          newObj[name] = formData[name] || ''; // copia o novo valor introduzido pelo formulário
          arrObj[index] = newObj; // atualiza o array com o novo objeto
        }
        nestedObject[key] = arrObj;
      }
      else {
        
        if (name !== undefined && name == key) {
          nestedObject[key] = formData[key] || '';
        }

      }
    }

    return nestedObject
  }
 

  if (schema.type === 'array' && schema.items) {
    if (arrPrefix !== undefined) {
      const { title }: any = Object.assign({}, schema);
      const arr: any = [...(state[title] || [])];
      const index = arrPrefix !== undefined ? arrPrefix : arr.length;
      arr[index] = formData[arrayPrefix.slice(0, -1)];
      return arr;
    }

  }

  return formData[arrayPrefix.slice(0, -1)] || '';

};

export default createFlattenObject;

