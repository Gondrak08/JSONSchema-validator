import { useState } from "react";
import generateSchemaType from "./generateSchemaType";
import { IJSONSchema, 
  JSONPrimitive,
  JSONArray,
  JSONObject,
  JSONValue } from "./interfaces/JsonSchema.interface"

  
  export const generateSchemaInterface =(name:string, schema: IJSONSchema):string => {
    const type = generateSchemaType(schema);
    const interfaceStr = `interface ${name}  ${JSON.stringify(type, null, 2).replace(/"/g, '')};`;  
    return interfaceStr;
  };


export default generateSchemaInterface;