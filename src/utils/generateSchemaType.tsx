import { IJSONSchema, JSONArray, JSONObject, JSONValue, JSONPrimitive } from "./interfaces/JsonSchema.interface";

interface GeneratedType {
  [key: string]: GeneratedType | string | number | boolean | any[] | undefined;
  $ref?: string;
  title?: string;
  description?: string;
  enum?: JSONValue[];
  items?: GeneratedType[] | GeneratedType;
  required?: string[];
  uniqueItems?: boolean | undefined;
}

export const generateSchemaType = (schema: IJSONSchema): GeneratedType => {
  const type: GeneratedType = {};

  switch (schema.type) {
    case 'array':
      const arraySchema = schema as JSONArray;
      type.type = 'array';
      type.items = [];
      if (arraySchema.items) {
        if (Array.isArray(arraySchema.items)) {
          type.items.push(generateSchemaType(arraySchema.items[0]));
        } else {
          type.items.push(generateSchemaType(arraySchema.items));
        }
      }
      if (typeof arraySchema.maxItems === 'number') {
        type.maxItems = arraySchema.maxItems;
      }
      if (arraySchema.uniqueItems !== undefined) {
        type.uniqueItems = !!arraySchema.uniqueItems;
      }
      if (arraySchema.title) {
        type.title = arraySchema.title;
      }
      if (arraySchema.description) {
        type.description = arraySchema.description;
      }
      break;
      case 'object':
        const objectSchema = schema as JSONObject;
        type.type = 'object';
        type.required = [];
        if (objectSchema.properties) {
          for (const [key, value] of Object.entries(objectSchema.properties)) {
            type[key] = generateSchemaType(value);
            if (objectSchema.required   && Array.isArray(objectSchema.required)  && objectSchema.required.includes(key)) {
              type.required.push(key);
            }
          }
        }
        if (objectSchema.title) {
          type.title = String(objectSchema.title);
        }
        if (objectSchema.description) {
          type.description = String(objectSchema.description);
        }
        // if (Array.isArray(objectSchema.additionalProperties)) {
        //   type.additionalProperties = objectSchema.additionalProperties;
        // } else if (typeof objectSchema.additionalProperties === "object") {
        //   type.additionalProperties = objectSchema.additionalProperties;
        // } else if (objectSchema.additionalProperties !== undefined) {
        //   type.additionalProperties = objectSchema.additionalProperties !== null 
        //     ? objectSchema.additionalProperties 
        //     : false;
        // }        
        break;
    default:
      if (schema?.type) {
        type.type = String(schema.type);
      }
      if (schema.title) {
        type.title = schema.title;
      }
      if (schema.description) {
        type.description = schema.description;
      }
      if (schema.enum) {
        type.enum = schema.enum;
      }
      break;
  }

  return type;
};

export default generateSchemaType;
