type JsonSchemaDynamicInterface<T> = {
  [P in keyof T]: T[P] extends Array<infer U>
    ? Array<JsonSchemaDynamicInterface<U>> & { __properties: string[] }
    : T[P] extends object
    ? JsonSchemaDynamicInterface<T[P]> & { __properties: string[] }
    : T[P];
};

function generateDynamicInterface<T extends Record<string, any>>(
  schema: T
): JsonSchemaDynamicInterface<T> & T {
  const result: any = {};

  for (const [key, schemaValue] of Object.entries(schema)) {
    if (Array.isArray(schemaValue)) {
      if (schemaValue.length > 0) {
        const itemSchema = schemaValue[0];
        result[key] = [generateDynamicInterface(itemSchema)];
      } else {
        result[key] = [];
      }
    } else if (typeof schemaValue === "object") {
      result[key] = generateDynamicInterface(schemaValue);
    } else {
      result[key] = schemaValue;
    }
  }

  return result;
}



export default generateDynamicInterface