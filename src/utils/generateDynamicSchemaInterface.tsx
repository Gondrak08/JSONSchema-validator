import { IJSONSchema, JSONPrimitive,JSONValue, JSONArray, JSONObject } from "./interfaces/JsonSchema.interface";

// export interface DynamicSchemaInterface {
//   type?: JSONPrimitive | JSONArray | JSONObject;
//   label?: string;
//   options?: { label: string; value: string }[];
//   properties?: {
//     [key: string]: DynamicSchemaInterface;
//   };
//   [key: string]: any;
// };


export interface DynamicSchemaInterface {
  type?: JSONPrimitive | JSONArray | JSONObject;
  label?: string;
  options?: { label: string; value: string }[];
  properties?: {
    [key: string]: DynamicSchemaInterface;
  };
  items?: DynamicSchemaInterface;
  additionalProperties?:JSONValue | IJSONSchema;
  patternProperties?: {
    [key: string]: DynamicSchemaInterface;
  };
  dependencies?: {
    [key: string]: DynamicSchemaInterface | string[];
  };
  contains?: DynamicSchemaInterface;
  required?: string[];
  enum?: JSONValue[];
  const?: JSONValue;
  multipleOf?: JSONValue;
  maximum?: JSONValue;
  exclusiveMaximum?: JSONValue;
  minimum?: JSONValue;
  exclusiveMinimum?: JSONValue;
  maxLength?: JSONValue;
  minLength?: JSONValue;
  pattern?: string;
  maxItems?: JSONValue;
  minItems?: JSONValue;
  uniqueItems?: JSONValue;
  maxProperties?: JSONValue;
  minProperties?: JSONValue;
  format?: string;
  contentEncoding?: string;
  contentMediaType?: string;
  [key: string]: any;
};



function generateDynamicSchemaInterface(schema: IJSONSchema): DynamicSchemaInterface {
  const dynamicSchemaInterface: DynamicSchemaInterface = {};

  Object.keys(schema).forEach((key) => {
    if (schema.hasOwnProperty(key)) {
      const property = schema[key];
      const propertyType = property.type;
      const propertyLabel = property.title || key;
      let propertyOptions;

      if (propertyType === 'string' && property.enum) {
        propertyOptions = property.enum.map((value: string) => ({
          label: value,
          value,
        }));
      }

      if (propertyType === 'object') {
        dynamicSchemaInterface[key] = {
          type: propertyType,
          label: propertyLabel,
          options: propertyOptions,
          properties: generateDynamicSchemaInterface(property.properties as IJSONSchema),
        };
      } else if (propertyType === 'array') {
        dynamicSchemaInterface[key] = {
          type: propertyType,
          label: propertyLabel,
          options: propertyOptions,
          items: generateDynamicSchemaInterface(property.items as IJSONSchema),
        };
      } else {
        dynamicSchemaInterface[key] = {
          type: propertyType,
          label: propertyLabel,
          options: propertyOptions,
        };
      }
    }
  });

  return dynamicSchemaInterface;
};

export default generateDynamicSchemaInterface;