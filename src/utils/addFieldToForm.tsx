import { IJSONSchema, JSONArray } from "./interfaces/JsonSchema.interface";
import { FormData } from "./types/types";

export const addFieldToForm= (schema:IJSONSchema, formData:FormData, path:any[]):any => {
    const items:IJSONSchema = Object.assign({}, schema.items);
    if(schema.type==='array' && Array.isArray(schema.items) && items.type ==='string'  ){
        const index = parseInt(path[path.length - 1]);
        const newArray = [...(schema.items as any[])];
        newArray[index] = { ...newArray[index], ...{ title: `${newArray[index].title} ${index + 1}` } };
        const newSchema = { ...schema, items: { ...items, title: `${items.title} ${index + 1}` } };
        return {
          ...newSchema,
          items: newArray,
        };
    } else if(schema.type==='array' && schema.items && items.type === 'array' ){
        const newPath = [...path,'0'];
        const newSchema = {...schema};
        const newArray = [] as any[];
        newArray.push(addFieldToForm(items, {}, newPath));
        newSchema.items = newArray;
        return newSchema;
    } else if(schema.type==='array' && schema.items && items.type === 'object' ){
        const newPath = [...path,'0'];
        const newSchema = {...schema};
        const newFormData = {...formData};
        newSchema.items = addFieldToForm(items, {}, newPath);
        return newSchema;
    }
    return schema;
}

export default addFieldToForm;