export type JSONPrimitive = string | number | boolean | null;
export type JSONObject = { [key: string]: JSONValue };
export type JSONValue = JSONPrimitive | JSONObject | JSONArray

export interface JSONArray extends IJSONSchema {
  type: 'array';
  items: IJSONSchema;
}

export interface IJSONSchema {
  $id?: string;
  $schema?: string;
  $ref?: string;
  $comment?: JSONValue | null;
  title?: string;
  description?: string;
  default?: JSONValue;
  multipleOf?: JSONValue;
  maximum?: JSONValue;
  exclusiveMaximum?: JSONValue;
  minimum?: JSONValue;
  exclusiveMinimum?: JSONValue;
  maxLength?: JSONValue;
  minLength?: JSONValue;
  pattern?: string;
  additionalProperties?: JSONValue | IJSONSchema;
  properties?: {
    [key: string]: IJSONSchema;
  };
  patternProperties?: {
    [key: string]: IJSONSchema;
  };
  dependencies?: {
    [key: string]: IJSONSchema | string[];
  };
  items?: IJSONSchema | IJSONSchema[];
  additionalItems?: JSONValue | IJSONSchema;
  maxItems?: JSONValue;
  minItems?: JSONValue;
  uniqueItems?: JSONValue;
  contains?: IJSONSchema;
  maxProperties?: JSONValue;
  minProperties?: JSONValue;
  required?: string[];
  enum?: JSONValue[];
  const?: JSONValue;
  type?: JSONPrimitive | JSONArray | JSONObject;
  format?: string;
  contentEncoding?: string;
  contentMediaType?: string;
  [key: string]: any;
}



  // export interface IJSONSchema {
  //   $id?: string;
  //   $schema?: string;
  //   $ref?: string;
  //   $comment?: JSONValue | null;
  //   title?: string;
  //   description?: string;
  //   default?: JSONValue;
  //   multipleOf?: JSONValue;
  //   maximum?: JSONValue;
  //   exclusiveMaximum?: JSONValue;
  //   minimum?: JSONValue;
  //   exclusiveMinimum?: JSONValue;
  //   maxLength?: JSONValue;
  //   minLength?: JSONValue;
  //   pattern?: string;
  //   additionalProperties?: JSONValue | IJSONSchema;
  //   properties?: {
  //     [key: string]: IJSONSchema;
  //   };
  //   patternProperties?: {
  //     [key: string]: IJSONSchema;
  //   };
  //   dependencies?: {
  //     [key: string]: IJSONSchema | string[];
  //   };
  //   items?: IJSONSchema | IJSONSchema[];
  //   additionalItems?: JSONValue | IJSONSchema;
  //   maxItems?: JSONValue;
  //   minItems?: JSONValue;
  //   uniqueItems?: JSONValue;
  //   contains?: IJSONSchema;
  //   maxProperties?: JSONValue;
  //   minProperties?: JSONValue;
  //   required?: string[];
  //   enum?: JSONValue[];
  //   const?: JSONValue;
  //   type?: JSONPrimitive | JSONArray | JSONObject;
  //   format?: string;
  //   contentEncoding?: string;
  //   contentMediaType?: string;
  // }
